import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import { db } from "../Database/Config"; // Import Firestore instance
import { collection, getDocs, query, where } from "firebase/firestore";

const DriverPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersData = ordersSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOrders(ordersData);
        setFilteredOrders(ordersData);
        fetchCartData(ordersData); // Fetch cart data after orders data is set
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    const fetchCartData = async (ordersData) => {
      try {
        const updatedOrders = await Promise.all(
          ordersData.map(async (order) => {
            const cartCollection = collection(db, "cart");
            const q = query(
              cartCollection,
              where("userEmail", "==", order.email)
            );
            const cartSnapshot = await getDocs(q);
            const cartData = cartSnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            return { ...order, cart: cartData };
          })
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
      } catch (error) {
        console.error("Error fetching cart data: ", error);
      } finally {
        setLoading(false); // Set loading to false once cart data is fetched
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    setFilteredOrders(
      orders.filter(
        (order) =>
          order.mpesaNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.orderNo
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, orders]);

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by Phone Number or Order No"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity
            onPress={() => setSearchQuery("")}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <ScrollView>
        <View style={styles.cardsContainer}>
          {filteredOrders.map((order) => (
            <Card key={order.id} style={styles.card}>
              <Card.Content>
                <Text style={styles.cardText}>
                  Order No:{" "}
                  <Text style={{ fontWeight: "bold" }}>{order.orderNo}</Text>
                </Text>
                <Text style={styles.cardText}>
                  County:{" "}
                  <Text style={{ fontWeight: "bold" }}>{order.county}</Text>
                </Text>
                <Text style={styles.cardText}>
                  Town/City:{" "}
                  <Text style={{ fontWeight: "bold" }}>{order.city}</Text>
                </Text>
                <Text style={styles.cardText}>
                  Phone Number:{" "}
                  <Text style={{ fontWeight: "bold" }}>{order.phone}</Text>
                </Text>
                <Text style={styles.cardText}>
                  Postal Address:{" "}
                  <Text style={{ fontWeight: "bold" }}>{order.code}</Text>
                </Text>
                {order.cart &&
                  order.cart.map((item) => (
                    <View key={item.id}>
                      <Text style={styles.cardTextGreen}>
                        {item.name} - {item.quantity}
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

export default DriverPage;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
  },
  clearButton: {
    marginLeft: 8,
    backgroundColor: "red",
    borderRadius: 5,
    padding: 5,
  },
  clearButtonText: {
    color: "white",
    fontWeight: "bold",
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
  cardTextGreen: {
    color: "green",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
