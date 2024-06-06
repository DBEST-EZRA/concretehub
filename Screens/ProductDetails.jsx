import React, { useState, useEffect } from "react";
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
import { db, auth } from "../Database/Config"; // Import Firestore and auth instance
import { addDoc, collection } from "firebase/firestore"; // Import Firestore functions from v9 modular SDK

const ProductDetails = ({ route }) => {
  const { item } = route.params;
  const [addedToCart, setAddedToCart] = useState(false);
  const navigation = useNavigation();

  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Fetch user's email from auth
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

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

  const addToCart = async () => {
    if (!userEmail) {
      // If user is not logged in, display an alert
      Alert.alert(
        "Login Required",
        "You need to login first to add items to the cart."
      );
      return;
    }

    try {
      // Add item to cart collection in Firestore
      const cartRef = collection(db, "cart");
      await addDoc(cartRef, {
        name: item.name,
        cost: item.cost,
        quantity: 1, // Default quantity is 1, you can change it as per your requirement
        userEmail: userEmail, // Add user's email to the cart item
      });

      setAddedToCart(true);
      console.log("Adding item to Cart:", item);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <View style={styles.productContainer}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart")}
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
