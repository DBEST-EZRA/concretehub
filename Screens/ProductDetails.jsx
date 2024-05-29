import React, { useState } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductDetails = ({ route }) => {
  const { item } = route.params;
  const [addedToCart, setAddedToCart] = useState(false);
  const navigation = useNavigation();
  const [addedItems, setAddedItems] = useState([]);

  const showProductsInCart = () => {
    navigation.navigate("Cart");
    console.log("Showing products in Cart");
  };

  const addToCart = () => {
    navigation.navigate("Cart", { item });
    setAddedItems([...addedItems, item]);
    setAddedToCart(true);
    console.log("Adding item to Cart:", item);
    console.log(addedItems);
  };

  return (
    <View style={styles.productContainer}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={showProductsInCart}
        >
          <Entypo name="shopping-cart" size={24} color="black" />
          <Text>Cart</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.innerContainer}>
        <Image style={styles.image} source={item.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.textTwo}>Ksh {item.cost}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.descriptionTitle}>Product Description</Text>
        <Text style={styles.description}>
          {item.description || "No description available."}
        </Text>

        <TouchableOpacity onPress={addToCart} disabled={addedToCart}>
          <View
            style={[styles.button, addedToCart && styles.addedToCartButton]}
          >
            <Text style={styles.buttonText}>
              {addedToCart ? "Added To Cart" : "Add To Cart"}
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.descriptionTitle}>Share This Product</Text>
        <View style={styles.icons}>
          <AntDesign name="facebook-square" size={24} color="black" />
          <AntDesign name="google" size={24} color="black" />
          <AntDesign name="instagram" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: "white",
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  image: {
    height: 150,
    width: 150,
  },
  textContainer: {
    // justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 5,
  },
  textTwo: {
    fontSize: 22,
    marginVertical: 5,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
  },
  description: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#007bff",
  },
  addedToCartButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
