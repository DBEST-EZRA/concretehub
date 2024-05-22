import React from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import FlatButton from "../components/FlatButton";

const ProductDetails = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.productContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Product Details</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Entypo name="shopping-cart" size={24} color="black" />
          <Text>Cart</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.innerContainer}>
        <Image style={styles.image} source={item.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>sh {item.cost}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.descriptionTitle}>Product Description</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio,
          perferendis? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Distinctio, perferendis?
        </Text>

        <FlatButton text="Add To Cart" />

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
    paddingTop: 50,
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
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#000",
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
});
