import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={require("../assets/concretehub.png")}
        />
      </View>
      <View style={styles.midSectionText}>
        <Text style={styles.title}>CONCRETE HUB</Text>
        <Text style={styles.text}>committed to creating value</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.bigButton}>
          <Text style={styles.buttons}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bigButton}>
          <Text style={styles.buttons}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  imageView: {
    top: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 161,
    height: 159,
    // left: 150,
    // paddingLeft: "auto",
  },

  titleContainer: {
    verticalAlign: "middle",
  },
  midSectionText: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: 282,
    height: 44,
    top: 200,
    // fontWeight: 300,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 36,
    lineHeight: 44,
  },

  text: {
    width: 277,
    height: 35,
    top: 250,
    textAlign: "center",
    // fontWeight: 300,
    fontSize: 20,
    lineHeight: 24.2,
    color: "#000000",
  },

  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 300,
  },
  bigButton: {
    width: 220,
    height: 50,
    backgroundColor: "#000000",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttons: {
    fontSize: 22,
    lineHeight: 39,
    textAlign: "center",
    color: "white",
  },
});
