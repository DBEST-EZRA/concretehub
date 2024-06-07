import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db, auth } from "../Database/Config"; // Import Firestore and auth instance
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore"; // Import Firestore functions from v9 modular SDK

const Cart = () => {
  const navigation = useNavigation();
  const routeParams = useRoute();
  const [products, setProducts] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = fetchCartItems();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    calculateGrandTotal();
  }, [products]);

  const fetchCartItems = () => {
    const userEmail = auth.currentUser.email;

    const q = query(
      collection(db, "cart"),
      where("userEmail", "==", userEmail)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = [];
      snapshot.forEach((doc) => {
        productsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setProducts(productsData);
      setLoading(false); // Set loading to false once data is fetched
    });

    return unsubscribe;
  };

  const increaseQuantity = async (id) => {
    await updateDoc(doc(db, "cart", id), {
      quantity: products.find((product) => product.id === id).quantity + 1,
    });
  };

  const decreaseQuantity = async (id) => {
    const currentQuantity = products.find(
      (product) => product.id === id
    ).quantity;
    if (currentQuantity > 1) {
      await updateDoc(doc(db, "cart", id), { quantity: currentQuantity - 1 });
    }
  };

  const calculateTotal = (product) => {
    return (product.cost * product.quantity).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const total = products.reduce(
      (sum, product) => sum + product.cost * product.quantity,
      0
    );
    console.log(`Calculated grand total: ${total.toFixed(2)}`); // Debug log
    setGrandTotal(total.toFixed(2));
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "cart", id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const clearAll = async () => {
    const userEmail = auth.currentUser.email;
    const q = query(
      collection(db, "cart"),
      where("userEmail", "==", userEmail)
    );
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  };

  const showPaymentsPage = () => {
    const uniqueNumber = generateUniqueNumber();
    navigation.navigate("PaymentDetails", { uniqueNumber, grandTotal });
    console.log("navigating to the payments page");
    console.log(
      `Generated unique number: ${uniqueNumber} and total ${grandTotal}`
    );
  };

  const generateUniqueNumber = () => {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.cost.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <Button
          title="-"
          onPress={() => decreaseQuantity(item.id)}
          style={styles.minusButton}
        />
        <Text style={styles.itemText}>{item.quantity}</Text>
        <Button
          title="+"
          onPress={() => increaseQuantity(item.id)}
          style={styles.minusButton}
        />
        <TouchableOpacity
          onPress={() => deleteItem(item.id)}
          style={styles.deleteButton}
        >
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <Text style={styles.itemText}>{calculateTotal(item)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
      <View style={styles.grandTotal}>
        <Text style={styles.total}>
          Total: Ksh {grandTotal !== 0 ? grandTotal : "0.00"}
        </Text>
        <Button title="Clear All" onPress={clearAll} />
      </View>
      <View style={styles.checkout}>
        <TouchableOpacity onPress={showPaymentsPage}>
          <View style={styles.checkButton}>
            <Text style={styles.checkButtonText}>Checkout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  list: {
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  deleteButton: {
    marginHorizontal: 10,
  },
  minusButton: {
    paddingHorizontal: 5,
  },
  checkButton: {
    marginHorizontal: "10%",
    marginVertical: 20,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#007bff",
  },
  checkButtonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  checkout: {
    alignItems: "center",
  },
});

export default Cart;
