import React from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductDetails = ({ route }) => {
  const { item } = route.params;

  const navigation = useNavigation();

  const showProductsInCart = () => {
    navigation.navigate("Cart");
    console.log("Showing products in Cart");
  };

  return (
    <View style={styles.productContainer}>
      <View style={styles.titleContainer}>
        {/* <Text style={styles.title}>Product Details</Text> */}
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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio,
          perferendis? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Distinctio, perferendis?
        </Text>

        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add To Cart</Text>
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
