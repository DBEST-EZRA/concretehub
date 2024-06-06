import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../Database/Config"; // Import auth instance from your Firebase config

import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const TopNavigation = () => {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Fetch user's email from auth
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  const handleLoginPress = () => {
    navigation.navigate("Login");
    console.log("Going to Login Page");
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out successfully");
        // Navigate to the login screen or any other screen you want after logout
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const showProductsInCart = () => {
    navigation.navigate("Cart");
    console.log("Showing products in Cart");
  };

  return (
    <View style={styles.navContainer}>
      <TextInput style={styles.input} placeholder="search " />
      <TouchableOpacity style={styles.icons} onPress={handleLoginPress}>
        <MaterialCommunityIcons name="account" size={24} color="black" />
        <Text>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icons} onPress={showProductsInCart}>
        <Entypo name="shopping-cart" size={24} color="black" />
        <Text>Cart</Text>
      </TouchableOpacity>
      {/* {userEmail && (
        <TouchableOpacity style={styles.icons} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="black" />
          <Text>Logout</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default TopNavigation;

const styles = StyleSheet.create({
  navContainer: {
    top: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 50,
  },
  input: {
    height: 30,
    borderWidth: 1,
    width: "60%",
    borderRadius: 20,
    paddingLeft: 20,
  },
  button: {
    borderRadius: 20,
    backgroundColor: "yellow",
    width: 66,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 17,
    color: "#000",
  },
  icons: {
    // display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
