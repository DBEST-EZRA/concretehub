import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";

import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SearchLogic } from "../logic/SearchLogic";

const TopNavigation = ({data,setData}) => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate("Login");
    console.log("I have navigated");
  };

function handleSearch(text){
  setData(SearchLogic(data,text))
}

  return (
    <View style={styles.navContainer}>
      <Searchbar placeholder="Search" onChangeText={()=>handleSearch(text)} />
      <TouchableOpacity style={styles.icons} onPress={handleLoginPress}>
        <MaterialCommunityIcons name="account" size={24} color="black" />
        <Text>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icons}>
        <Entypo name="shopping-cart" size={24} color="black" />
        <Text>Cart</Text>
      </TouchableOpacity>
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
