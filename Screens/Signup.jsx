import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { auth, createUserWithEmailAndPassword } from "../Database/Config";

const Signup = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLinkPress = () => {
    navigation.navigate("Login");
  };

  const handleSignup = () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert("Success", "Account created successfully");
          // You can also navigate the user to another screen or update user profile here
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert("Error", errorMessage);
        });
    } else {
      Alert.alert("Error", "Please fill all the fields");
    }
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
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
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
        <TouchableOpacity style={styles.buttonSpace} onPress={handleSignup}>
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
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
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
