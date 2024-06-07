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

const TopNavigation = ({ onSearch }) => {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  const [searchText, setSearchText] = useState("");

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

  const handleClearSearch = () => {
    setSearchText("");
    onSearch("");
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.navContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchText}
          onChangeText={handleSearchChange}
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={handleClearSearch}
            style={styles.clearButton}
          >
            <Entypo name="cross" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
  },
  input: {
    height: 30,
    borderWidth: 1,
    flex: 1,
    borderRadius: 20,
    paddingLeft: 20,
  },
  clearButton: {
    position: "absolute",
    right: 10,
  },
  icons: {
    flexDirection: "column",
    alignItems: "center",
  },
});
