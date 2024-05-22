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

const ProductsPage = ({ navigation }) => {
  const [data, setData] = useState([
    {
      id: 1,
      image: require("../assets/concretehub.png"),
      name: "culverts",
      cost: 200,
      remaining: 4,
    },
    {
      id: 2,
      image: require("../assets/concretehub.png"),
      name: "pipes",
      cost: 150,
      remaining: 10,
    },
    {
      id: 3,
      image: require("../assets/concretehub.png"),
      name: "bricks",
      cost: 50,
      remaining: 25,
    },
    {
      id: 4,
      image: require("../assets/concretehub.png"),
      name: "cement",
      cost: 100,
      remaining: 50,
    },
    {
      id: 5,
      image: require("../assets/concretehub.png"),
      name: "gravel",
      cost: 75,
      remaining: 30,
    },
    {
      id: 6,
      image: require("../assets/concretehub.png"),
      name: "sand",
      cost: 40,
      remaining: 20,
    },
    {
      id: 7,
      image: require("../assets/concretehub.png"),
      name: "rebar",
      cost: 120,
      remaining: 15,
    },
    {
      id: 8,
      image: require("../assets/concretehub.png"),
      name: "concrete blocks",
      cost: 60,
      remaining: 22,
    },
    {
      id: 9,
      image: require("../assets/concretehub.png"),
      name: "roof tiles",
      cost: 80,
      remaining: 35,
    },
    {
      id: 10,
      image: require("../assets/concretehub.png"),
      name: "floor tiles",
      cost: 90,
      remaining: 12,
    },
    {
      id: 11,
      image: require("../assets/concretehub.png"),
      name: "steel beams",
      cost: 300,
      remaining: 8,
    },
    {
      id: 12,
      image: require("../assets/concretehub.png"),
      name: "wood planks",
      cost: 50,
      remaining: 50,
    },
    {
      id: 13,
      image: require("../assets/concretehub.png"),
      name: "asphalt",
      cost: 110,
      remaining: 18,
    },
    {
      id: 14,
      image: require("../assets/concretehub.png"),
      name: "tiles",
      cost: 70,
      remaining: 24,
    },
    {
      id: 15,
      image: require("../assets/concretehub.png"),
      name: "insulation",
      cost: 40,
      remaining: 36,
    },
    {
      id: 16,
      image: require("../assets/concretehub.png"),
      name: "drywall",
      cost: 25,
      remaining: 44,
    },
    {
      id: 17,
      image: require("../assets/concretehub.png"),
      name: "nails",
      cost: 10,
      remaining: 100,
    },
    {
      id: 18,
      image: require("../assets/concretehub.png"),
      name: "screws",
      cost: 8,
      remaining: 120,
    },
    {
      id: 19,
      image: require("../assets/concretehub.png"),
      name: "electrical wires",
      cost: 60,
      remaining: 60,
    },
    {
      id: 20,
      image: require("../assets/concretehub.png"),
      name: "plumbing pipes",
      cost: 90,
      remaining: 40,
    },
    {
      id: 21,
      image: require("../assets/concretehub.png"),
      name: "paint",
      cost: 30,
      remaining: 55,
    },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}
    >
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
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
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
});
