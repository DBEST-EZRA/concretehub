import React from "react";
import { Card, Button } from "react-native-paper";
import { Text, StyleSheet } from "react-native";

export const CardComponent = ({ item }) => {
  const { id, image, name, cost, remaining } = item;

  return (
    <>
      <Card style={styles.card} elevation={4}>
        <Card.Actions>
          <Card.Cover style={styles.image} source={image} />
          <Card.Content style={styles.content}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.cost}>sh {cost}</Text>
          </Card.Content>
        </Card.Actions>

        <Card.Actions>
          <Button>View Details</Button>
          <Button>Add To Cart</Button>
        </Card.Actions>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    display: "flex",
    flexDirection: "row"
  },
  content: {
    width:'50%',
    fontSize:200,
    padding:20
  },
  title:{
    fontSize:30,
    color:"gray"
  },
  cost:{
    color:"red",
    fontSize:30
  },
  image: {
    width: "50%",
    height: 200,
  },
});
