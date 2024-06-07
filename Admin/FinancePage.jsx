import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { Card } from "react-native-paper";
import { db } from "../Database/Config"; // Import Firestore instance
import { collection, onSnapshot, query, where } from "firebase/firestore";

const FinancePage = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      const ordersCollection = collection(db, "orders");
      onSnapshot(ordersCollection, (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOrders(ordersData);
        setFilteredOrders(ordersData);
      });
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchCartData = () => {
      orders.forEach((order) => {
        const cartCollection = collection(db, "cart");
        const q = query(cartCollection, where("userEmail", "==", order.email));
        onSnapshot(q, (snapshot) => {
          const cartData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          order.cart = cartData; // Attach cart data to the corresponding order
          setOrders((prevOrders) =>
            prevOrders.map((o) => (o.id === order.id ? order : o))
          );
          setFilteredOrders((prevOrders) =>
            prevOrders.map((o) => (o.id === order.id ? order : o))
          );
        });
      });
    };
    if (orders.length > 0) {
      fetchCartData();
    }
  }, [orders]);

  useEffect(() => {
    setFilteredOrders(
      orders.filter((order) =>
        order.mpesaNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, orders]);

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Enter MPESA Number"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView>
        <View style={styles.cardsContainer}>
          {filteredOrders.map((order) => (
            <Card key={order.id} style={styles.card}>
              <Card.Content>
                <Text style={styles.cardText}>Order No: {order.orderNo}</Text>
                <Text style={styles.cardText}>
                  Grand Total: {order.grandTotal}
                </Text>
                <Text style={styles.cardText}>
                  MPESA Code: {order.mpesaCode}
                </Text>
                <Text style={styles.cardText}>
                  MPESA Name: {order.mpesaName}
                </Text>
                <Text style={styles.cardText}>
                  MPESA Number: {order.mpesaNumber}
                </Text>
                {order.cart &&
                  order.cart.map((item) => (
                    <View key={item.id}>
                      <Text style={styles.cardText}>
                        Product Name: {item.name}
                      </Text>
                      <Text style={styles.cardText}>
                        Quantity: {item.quantity}
                      </Text>
                    </View>
                  ))}
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default FinancePage;

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
  },
  cardsContainer: {
    padding: 10,
  },
  card: {
    marginVertical: 10,
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
});
