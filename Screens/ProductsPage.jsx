import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Button } from "react-native-paper";
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
import { CardComponent } from "../components/CardComponent";

const ProductsPage = ({ navigation }) => {
  const [data, setData] = useState([
    {
      id: 1,
      image: require("../assets/concretehub.png"),
      name: "culverts",
      cost: 200,
      remaining: 4,
      quantity: 31,
      description: "sample of text description should be here dude",
    },
    {
      id: 2,
      image: require("../assets/concretehub.png"),
      name: "pipes",
      cost: 150,
      remaining: 10,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 3,
      image: require("../assets/concretehub.png"),
      name: "bricks",
      cost: 50,
      remaining: 25,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 4,
      image: require("../assets/concretehub.png"),
      name: "cement",
      cost: 100,
      remaining: 50,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 5,
      image: require("../assets/concretehub.png"),
      name: "gravel",
      cost: 75,
      remaining: 30,
      description: "sample of text description should be here dude",
    },
    {
      id: 6,
      image: require("../assets/concretehub.png"),
      name: "sand",
      cost: 40,
      remaining: 20,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 7,
      image: require("../assets/concretehub.png"),
      name: "rebar",
      cost: 120,
      remaining: 15,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 8,
      image: require("../assets/concretehub.png"),
      name: "concrete blocks",
      cost: 60,
      remaining: 22,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 9,
      image: require("../assets/concretehub.png"),
      name: "roof tiles",
      cost: 80,
      remaining: 35,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 10,
      image: require("../assets/concretehub.png"),
      name: "floor tiles",
      cost: 90,
      remaining: 12,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 11,
      image: require("../assets/concretehub.png"),
      name: "steel beams",
      cost: 300,
      remaining: 8,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 12,
      image: require("../assets/concretehub.png"),
      name: "wood planks",
      cost: 50,
      remaining: 50,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 13,
      image: require("../assets/concretehub.png"),
      name: "asphalt",
      cost: 110,
      remaining: 18,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 14,
      image: require("../assets/concretehub.png"),
      name: "tiles",
      cost: 70,
      remaining: 24,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 15,
      image: require("../assets/concretehub.png"),
      name: "insulation",
      cost: 40,
      remaining: 36,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 16,
      image: require("../assets/concretehub.png"),
      name: "drywall",
      cost: 25,
      remaining: 44,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 17,
      image: require("../assets/concretehub.png"),
      name: "nails",
      cost: 10,
      remaining: 100,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 18,
      image: require("../assets/concretehub.png"),
      name: "screws",
      cost: 8,
      remaining: 120,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 19,
      image: require("../assets/concretehub.png"),
      name: "electrical wires",
      cost: 60,
      remaining: 60,
      quantity: 20,
      description: "sample of text description should be here dude",
    },
    {
      id: 20,
      image: require("../assets/concretehub.png"),
      name: "plumbing pipes",
      cost: 90,
      remaining: 40,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
    {
      id: 21,
      image: require("../assets/concretehub.png"),
      name: "paint",
      cost: 30,
      remaining: 55,
      quantity: 1,
      description: "sample of text description should be here dude",
    },
  ]);




  const renderItem = ({ item }) => (
    <CardComponent item ={item}/>
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
    <View>
      <TopNavigation data={data} setData={setData} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ProductsPage;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically center items
    margin: 8, // Add margin for space between cards
    borderRadius: 8, // Border radius for the card
    elevation: 5, // Add elevation for shadow effect
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    paddingTop:20,
    backgroundColor:'red'
  },
  imageContainer:{
    margin:8,
    width:200,
    height:200
  },
image: {

    flex:1,
    borderTopLeftRadius: 8, // Adjust border radius for the image
    borderBottomLeftRadius: 8, // Adjust border radius for the image
  },
  content: {
    flex: 1, 
    padding: 8 // Add padding for content inside
  },
});
