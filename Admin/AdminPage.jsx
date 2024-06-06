import React, { useState, useEffect } from "react";
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
} from "react-native";
import { Appbar, Searchbar, Text } from "react-native-paper";
import { db } from "../Database/Config"; // Import Firestore instance
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Import Firestore functions from v9 modular SDK
import ImagePicker from "react-native-image-picker";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [remaining, setRemaining] = useState("");
  const [image, setImage] = useState(null); // New state for image

  const todoRef = collection(db, "products"); // Reference to the "products" collection

  useEffect(() => {
    const unsubscribe = onSnapshot(todoRef, (querySnapshot) => {
      // Listen for changes in the "products" collection
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

  const addProduct = async () => {
    if (cost && description && name && remaining) {
      try {
        await addDoc(todoRef, {
          // Add document to the "products" collection
          cost: parseFloat(cost),
          description,
          name,
          quantity: 1,
          remaining: parseInt(remaining),
          image: image, // Add image to the product data
        });
        setCost("");
        setDescription("");
        setName("");
        setRemaining("");
        setImage(null); // Reset image state
        setModalVisible(false);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    } else {
      Alert.alert("Error", "Please fill all the fields");
    }
  };

  // Function to handle image selection
  const selectImage = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      maxWidth: 2000,
      maxHeight: 2000,
      quality: 0.8,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setImage(response.uri);
      }
    });
  };

  const renderProduct = ({ item }) => (
    <Pressable style={styles.card} onLongPress={() => editProduct(item)}>
      <Text style={{ color: "#007bff", fontSize: 16 }}>{item.name}</Text>
      {/* Display image if available */}
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
  );

  const editProduct = (product) => {
    setCost(product.cost.toString());
    setDescription(product.description);
    setName(product.name);
    setRemaining(product.remaining.toString());
    setModalVisible(true);
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(todoRef, id)); // Delete document from the "products" collection
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ backgroundColor: "#f8f8f8", flex: 1 }}>
      <Searchbar style={styles.search} placeholder="Search" />
      <Button title="Add Product" onPress={() => setModalVisible(true)} />
      <View style={styles.scrollContainer}>
        <Text style={styles.sectionHeader} onPress={() => {}}>
          Products Details
        </Text>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
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
            {/* Button to select image */}
            <Button title="Select Image" onPress={selectImage} />
            {/* Display selected image */}
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100 }}
              />
            )}
            <Button title="Submit" onPress={addProduct} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
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
});
