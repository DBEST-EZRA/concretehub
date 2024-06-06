import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "./Config";

const Fetch = () => {
  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection("products");

  useEffect(() => {
    const unsubscribe = todoRef.onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const { cost, description, name, quantity, remaining } = doc.data();
        users.push({
          id: doc.id,
          cost,
          description,
          name,
          quantity,
          remaining,
        });
      });
      setUsers(users);
    });

    // Cleanup the subscription on unmount
    return () => {
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <FlatList
        style={{ height: "100%" }}
        data={users}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable
            style={{
              backgroundColor: "#f8f8f8",
              padding: 15,
              borderRadius: 10,
              margin: 5,
              marginHorizontal: 10,
            }}
          >
            <View style={{ alignItems: "center", flexDirection: "column" }}>
              <Text>{item.cost}</Text>
              <Text>{item.description}</Text>
              <Text>{item.name}</Text>
              <Text>{item.quantity}</Text>
              <Text>{item.remaining}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Fetch;

const styles = StyleSheet.create({});
