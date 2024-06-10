import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  Alert,
  FlatList,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Searchbar, Text, Card } from "react-native-paper";
import { db, storage } from "../Database/Config";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  where,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AntDesign } from "@expo/vector-icons";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [remaining, setRemaining] = useState("");
  const [image, setImage] = useState(null);

  const [orders, setOrders] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  const todoRef = collection(db, "products");

  useEffect(() => {
    const unsubscribe = onSnapshot(todoRef, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        products.push({
          id: doc.id,
          ...productData,
        });
      });
      setProducts(products);
    });

    return () => unsubscribe();
  }, []);

  const fetchOrders = async (startAfterDoc = null) => {
    setLoading(true);
    let q = query(collection(db, "orders"), limit(20));
    if (startAfterDoc) {
      q = query(collection(db, "orders"), startAfter(startAfterDoc), limit(20));
    }

    const querySnapshot = await getDocs(q);
    const newOrders = [];
    let lastVisible = null;

    querySnapshot.forEach((doc) => {
      const orderData = doc.data();
      newOrders.push({
        id: doc.id,
        ...orderData,
      });
      lastVisible = doc;
    });

    const fetchCartData = async (order) => {
      const cartCollection = collection(db, "cart");
      const cartQuery = query(
        cartCollection,
        where("userEmail", "==", order.email)
      );
      const cartSnapshot = await getDocs(cartQuery);
      const cartData = cartSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return cartData;
    };

    for (let order of newOrders) {
      order.cart = await fetchCartData(order);
    }

    setOrders((prevOrders) => {
      const orderMap = {};
      [...prevOrders, ...newOrders].forEach((order) => {
        orderMap[order.id] = order;
      });
      return Object.values(orderMap);
    });
    setLastDoc(lastVisible);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const imageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(imageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const addProduct = async () => {
    if (cost && description && name && remaining && image) {
      try {
        const imageUrl = await uploadImage(image);

        await addDoc(todoRef, {
          cost: parseFloat(cost),
          description,
          name,
          quantity: 1,
          remaining: parseInt(remaining),
          image: imageUrl,
        });

        setCost("");
        setDescription("");
        setName("");
        setRemaining("");
        setImage(null);
        setModalVisible(false);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    } else {
      Alert.alert("Error", "Please fill all the fields");
    }
  };

  const renderProduct = useCallback(
    ({ item }) => (
      <Pressable style={styles.card} onLongPress={() => editProduct(item)}>
        <Text style={{ color: "#007bff", fontSize: 16 }}>{item.name}</Text>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 100 }}
          />
        )}
        <Text style={styles.text}>Cost: {item.cost}</Text>
        <Text style={styles.text}>Description: {item.description}</Text>
        <Text style={styles.text}>Quantity: {item.quantity}</Text>
        <Text style={styles.text}>Remaining: {item.remaining}</Text>
        <Button title="Delete" onPress={() => deleteProduct(item.id)} />
      </Pressable>
    ),
    []
  );

  const editProduct = (product) => {
    setCost(product.cost.toString());
    setDescription(product.description);
    setName(product.name);
    setRemaining(product.remaining.toString());
    setImage(product.image);
    setModalVisible(true);
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(todoRef, id));
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await deleteDoc(doc(collection(db, "orders"), id));
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ backgroundColor: "#f8f8f8", flex: 1 }}>
      <Searchbar style={styles.search} placeholder="Search" />
      <Button title="Add Product" onPress={() => setModalVisible(true)} />
      <View style={styles.scrollContainer}>
        <Text style={styles.sectionHeader}>Products Details</Text>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionHeader}>Order Details</Text>
        {loading && <ActivityIndicator size="large" color="#007bff" />}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {orders.map((order) => (
            <Card key={order.id} style={styles.orderCard}>
              <Card.Content>
                <Text style={styles.cardText}>
                  Order No:{" "}
                  <Text style={{ fontWeight: "bold" }}>{order.orderNo}</Text>
                </Text>
                <Text style={styles.cardText}>
                  Grand Total:{" "}
                  <Text style={styles.cardTextGreen}>${order.grandTotal}</Text>
                </Text>
                <Text style={styles.cardText}>
                  Address:{" "}
                  <Text style={{ fontWeight: "bold" }}>{order.address}</Text>
                </Text>
                <Text style={styles.cardText}>
                  Name: <Text style={{ fontWeight: "bold" }}>{order.name}</Text>
                </Text>
                <Text style={styles.cardText}>
                  Status:{" "}
                  <Text style={{ fontWeight: "bold" }}>{order.status}</Text>
                </Text>
                <FlatList
                  data={order.cart}
                  renderItem={({ item }) => (
                    <View>
                      <Text style={styles.cardText}>
                        Product Name: {item.name}
                      </Text>
                      <Text style={styles.cardText}>
                        Product Quantity: {item.quantity}
                      </Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                />
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => deleteOrder(order.id)}
                >
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          <Button title="Previous" onPress={() => fetchOrders()} />
          <Button
            title="Next"
            onPress={() => fetchOrders(lastDoc)}
            disabled={!lastDoc}
          />
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Product</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Cost"
              keyboardType="numeric"
              value={cost}
              onChangeText={setCost}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Remaining"
              keyboardType="numeric"
              value={remaining}
              onChangeText={setRemaining}
            />
            <Button title="Pick an image from gallery" onPress={pickImage} />
            {image && (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            )}
            <View style={styles.buttonRow}>
              <Button title="Submit" onPress={addProduct} />
              <View style={styles.spacer} />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdminPage;

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    margin: 10,
    elevation: 5,
    shadowColor: "#00000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 50,
    padding: 10,
  },
  sectionHeader: {
    marginBottom: 5,
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#007bff",
  },
  card: {
    fontSize: 24,
    margin: 10,
    gap: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 10,
    backgroundColor: "#f8f8f8",
  },
  orderDetailsContainer: {
    backgroundColor: "#ADD8E6",
    flex: 1,
    padding: 10,
  },
  orderCard: {
    marginRight: 10,
    width: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardTextGreen: {
    color: "green",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 8,
    width: 200,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  spacer: {
    width: 10,
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});
