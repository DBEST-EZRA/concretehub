import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const Login = () => {
  const navigation = useNavigation();

  const handleLinkPress = () => {
    // Navigate to Signup Page
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginHeader}>
        <Ionicons name="person-circle-sharp" size={168} color="#007bff" />
        <Text>LOGIN</Text>
      </View>
      <View style={styles.inputFields}>
        <View style={styles.inputContainer}>
          <Text>Email Address</Text>
          <TextInput style={styles.input} placeholder="Email" />
          <Fontisto name="email" size={24} color="black" style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Ionicons
            name="key-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.rememberMe}>
        <Text style={{ alignItems: "center" }}>
          {/* <CheckBox style={styles.checkbox} /> */}
          Remember me
        </Text>
        <Text>Forgot password</Text>
      </View>
      <View style={styles.loginFunctions}>
        {/* <TouchableOpacity style={styles.button}>
          <Button
            // onPress={onPressLearnMore}
            title="Login"
            color="#007bff"
          />
        </TouchableOpacity> */}
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.linkText}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={handleLinkPress}>
            <Text style={{ color: "#007bff", textDecorationLine: "underline" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 30,
  },
  loginHeader: {
    marginHorizontal: "10%",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  inputFields: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "10%",
  },
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  input: {
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    width: "100%",
    backgroundColor: "#d9d9d9",
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
  rememberMe: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "10%",
    marginBottom: 20,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 25,
  },
});
