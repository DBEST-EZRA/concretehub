import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  StyleSheet,
  Alert,
  Share,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ProductDetails = ({ route }) => {
  const { item } = route.params;
  const [addedToCart, setAddedToCart] = useState(false);
  const navigation = useNavigation();
  const [addedItems, setAddedItems] = useState([]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this product: ${item.name}\n\nPrice: Ksh ${
          item.cost
        }\n\nDescription: ${
          item.description || "No description available."
        }\n\nDownload the app Concrete Hub from the Google Play Store for more amazing products!`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

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
          <Entypo name="shopping-cart" size={30} color="#007bff" />
          <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: "bold" }}>
            Cart
          </Text>
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

        <View style={styles.icons}>
          <TouchableOpacity style={styles.fabShare} onPress={onShare}>
            <Icon name="share-social" size={20} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, marginLeft: 10 }}>
            Share This Product
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: "#f8f8f8",
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
    marginBottom: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    height: 150,
    width: 150,
  },

  textContainer: {
    alignItems: "flex-start",
    marginLeft: 20,
    justifyContent: "center",
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
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  fabShare: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 30,
    elevation: 8,
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
