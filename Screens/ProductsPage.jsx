import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import TopNavigation from "../Navigation/TopNavigation";
import { db, auth } from "../Database/Config"; // Import Firestore and auth instance
import { collection, onSnapshot } from "firebase/firestore"; // Import Firestore functions from v9 modular SDK

const ProductsPage = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Fetch user's email from auth
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }

    // Subscribe to products collection changes
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData = [];
      snapshot.forEach((doc) => {
        productsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>sh {item.cost}</Text>
        <Text style={styles.remaining}>{item.remaining} items left</Text>
      </View>
    </TouchableOpacity>
  );

  const [numColumns, setNumColumns] = useState(3);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const screenWidth = Dimensions.get("window").width;
    const widthWithoutMargin = 10;
    const marginBetweenItems = 10;
    const calculatedItemWidth =
      (screenWidth - widthWithoutMargin) / numColumns - marginBetweenItems;

    setItemWidth(calculatedItemWidth);
  }, [numColumns]);

  return (
    <View style={styles.container}>
      <TopNavigation />
      <View style={styles.welcomeContainer}>
        {/* <Text style={styles.welcomeText}>Welcome, {userEmail}</Text> */}
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ justifyContent: "space-around" }}
      />
    </View>
  );
};

export default ProductsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5FCFF",
    paddingBottom: 50,
  },
  listContainer: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  remaining: {
    fontSize: 16,
    fontStyle: "italic",
  },
  welcomeContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
