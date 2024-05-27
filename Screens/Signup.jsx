import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  View,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

const Signup = () => {
  const navigation = useNavigation();

  const handleLinkPress = () => {
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.screenView}>
      <View style={styles.headerText}>
        <Text style={styles.welcomeMessage}>Welcome!</Text>
        <Text>Sign Up and get started</Text>
      </View>
      <View style={styles.inputFieldsContainer}>
        <View style={styles.inputContainer}>
          <Text>Full Name</Text>
          <TextInput style={styles.input} placeholder="Full Name" />
        </View>
        <View style={styles.inputContainer}>
          <Text>Email Address</Text>
          <TextInput style={styles.input} placeholder="Email" />
        </View>
        <View style={styles.inputContainer}>
          <Text>Phone Number</Text>
          <TextInput style={styles.input} placeholder="Phone" />
        </View>
        <View style={styles.inputContainer}>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontWeight: "bold" }}>or</Text>
      </View>
      <View style={styles.signupOptions}>
        <IconButton
          icon="google"
          color="red"
          size={25}
          style={{ backgroundColor: "#d9d9d9" }}
          onPress={() => console.log("Pressed")}
        />
        <IconButton
          icon="facebook"
          color="red"
          size={25}
          style={{ backgroundColor: "#d9d9d9" }}
          onPress={() => console.log("Pressed")}
        />
        <IconButton
          icon="instagram"
          color="red"
          size={25}
          style={{ backgroundColor: "#d9d9d9" }}
          onPress={() => console.log("Pressed")}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.buttonSpace}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.linkText}>
          Already have an account?{" "}
          <TouchableOpacity onPress={handleLinkPress}>
            <Text style={{ color: "#007bff", textDecorationLine: "underline" }}>
              Login
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  screenView: {
    marginTop: 50,
  },
  headerText: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeMessage: { fontSize: 40, fontWeight: "bold" },
  inputFieldsContainer: {
    alignItems: "center",
  },
  inputFieldsContainer: {
    alignItems: "center",
  },
  inputContainer: {
    marginVertical: 10,
    width: "80%",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    paddingLeft: 10,
  },
  googleButton: {
    marginHorizontal: 10,
    backgroundColor: "#D9D9D9",
    height: 40,
    width: 40,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    height: 22,
    width: 22,
  },
  buttonSpace: {
    marginVertical: 10,
  },
  button: {
    marginHorizontal: "10%",
    borderRadius: 8,
    paddingVertical: 10,
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
  buttonR: {
    paddingVertical: 30,
  },
  linkText: {
    marginLeft: "10%",
  },
  signupOptions: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
