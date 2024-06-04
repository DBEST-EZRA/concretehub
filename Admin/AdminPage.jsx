import React from "react";
import { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Appbar, Searchbar, Text } from "react-native-paper";

const AdminPage = () => {
  const [items] = useState([
    {
      key: 1,
      name: "Cupcake",
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: "Eclair",
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: "Frozen yogurt",
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 5,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 68,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 6,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 7,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
  ]);
  const [horizontalScroll, setHorizontalScroll] = useState(true);
  const showDetails = () => {
    setHorizontalScroll((prev) => !prev);
  };

  return (
    <View style={{ backgroundColor: "#f8f8f8", marginBottom: 150 }}>
      <View>
        <Appbar.Header>
          <Appbar.Content title="Admin Page" />
        </Appbar.Header>
      </View>
      <Searchbar style={styles.search} placeholder="Search" />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.scroll}>
          <Text
            style={{
              marginBottom: 5,
              color: "#007bff",
              fontSize: 16,
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderColor: "#007bff",
            }}
            onPress={showDetails}
          >
            Products Details
          </Text>

          <ScrollView horizontal={horizontalScroll}>
            {items.map((items) => (
              <View key={items.key} style={styles.card}>
                <Text style={{ color: "#007bff", fontSize: 16 }}>
                  {items.name}
                </Text>
                <Text style={styles.text}>Calories : {items.calories}</Text>
                <Text style={styles.text}>Fat : {items.fat}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* inventory scroll */}
        <View style={styles.scroll}>
          <Text
            style={{
              marginBottom: 5,
              color: "#007bff",
              fontSize: 16,
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderColor: "#007bff",
            }}
            onPress={showDetails}
          >
            suppliers Details
          </Text>
          <ScrollView horizontal={horizontalScroll}>
            {items.map((items) => (
              <View key={items.key} style={styles.card}>
                <Text style={{ color: "#007bff", fontSize: 16 }}>
                  {items.name}
                </Text>
                <Text style={styles.text}>Calories : {items.calories}</Text>
                <Text style={styles.text}>Fat : {items.fat}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* work in progress */}
        <View style={styles.scroll}>
          <Text
            style={{
              marginBottom: 5,
              color: "#007bff",
              fontSize: 16,
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderColor: "#007bff",
            }}
          >
            WIP details ....
          </Text>
          <ScrollView horizontal={true}>
            {items.map((items) => (
              <View key={items.key} style={styles.card}>
                <Text style={{ color: "#007bff", fontSize: 16 }}>
                  {items.name}
                </Text>
                <Text style={styles.text}>Calories : {items.calories}</Text>
                <Text style={styles.text}>Fat : {items.fat}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* drivers details */}
        <View style={styles.scroll}>
          <Text
            style={{
              marginBottom: 5,
              color: "#007bff",
              fontSize: 16,
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderColor: "#007bff",
            }}
          >
            Drivers Details
          </Text>
          <ScrollView horizontal={true}>
            {items.map((items) => (
              <View key={items.key} style={styles.card}>
                <Text style={{ color: "#007bff", fontSize: 16 }}>
                  {items.name}
                </Text>
                <Text style={styles.text}>Calories : {items.calories}</Text>
                <Text style={styles.text}>Fat : {items.fat}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* pending orders  */}
        <View style={styles.scroll}>
          <Text
            style={{
              marginBottom: 5,
              color: "#007bff",
              fontSize: 16,
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderColor: "#007bff",
            }}
          >
            pending orders ....
          </Text>
          <View>
            <ScrollView horizontal={true}>
              {items.map((items) => (
                <View key={items.key} style={styles.card}>
                  <Text style={{ color: "#007bff", fontSize: 16 }}>
                    {items.name}
                  </Text>
                  <Text style={styles.text}>Calories : {items.calories}</Text>
                  <Text style={styles.text}>Fat : {items.fat}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminPage;

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    margin: 10,
    elevation: 5,
    shadowColor: "#00000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  scrollContainer: {
    marginBottom: 50,
  },
  scroll: {
    padding: 10,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    elevation: 5,
    shadowColor: "#00000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  card: {
    fontSize: 24,
    margin: 10,
    gap: 10,
    padding: 10,
    margin: 10,
    margin: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 10,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  text: {
    fontSize: 16,
  },
});
