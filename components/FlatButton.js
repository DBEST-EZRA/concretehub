import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
// import { Colors } from 'react-native/Libraries/NewAppScreen'
const FlatButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
