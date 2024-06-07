import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
  ToastAndroid,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { auth, createUserWithEmailAndPassword } from "../Database/Config";

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
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

  const showToast = () => {
    const message = "Still under maintenance";
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
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
          <Text>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
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
          onPress={showToast}
        />
        <IconButton
          icon="facebook"
          color="blue"
          size={25}
          style={{ backgroundColor: "#d9d9d9" }}
          onPress={showToast}
        />
        <IconButton
          icon="instagram"
          color="#C13584"
          size={25}
          style={{ backgroundColor: "#d9d9d9" }}
          onPress={showToast}
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
    flex: 1,
    // justifyContent: "center",
    padding: 20,
  },
  headerText: {
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeMessage: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputFieldsContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginVertical: 10,
    width: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    paddingLeft: 10,
  },
  buttonSpace: {
    marginVertical: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
  },
  linkText: {
    textAlign: "center",
    marginTop: 10,
  },
  signupOptions: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
});
