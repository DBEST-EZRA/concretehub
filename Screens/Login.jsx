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
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../Auth/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = login(email, password);
    if (user) {
      switch (user.role) {
        case "finance":
          navigation.navigate("FinancePage");
          break;
        case "driver":
          navigation.navigate("DriverPage");
          break;
        case "admin":
          navigation.navigate("AdminPage");
          break;
        default:
          navigation.navigate("Home");
      }
    } else {
      Alert.alert(
        "Invalid Credentials",
        "Please check your email and password."
      );
    }
  };

  const handleLinkPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginHeader}>
        <Ionicons name="person-circle-sharp" size={168} color="#007bff" />
        <Text style={styles.loginHeaderText}>LOGIN</Text>
      </View>
      <View style={styles.inputFields}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Fontisto name="email" size={24} color="black" style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
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
        <Text style={styles.rememberMeText}>Remember me</Text>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginFunctions}>
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.linkText}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={handleLinkPress}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    // flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  loginHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  loginHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  inputFields: {
    width: "100%",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    paddingRight: 40,
    backgroundColor: "#d9d9d9",
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 35,
  },
  rememberMe: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMeText: {
    fontSize: 16,
    color: "#333",
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
  },
  loginFunctions: {
    alignItems: "center",
  },
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
  linkText: {
    fontSize: 16,
    color: "#333",
  },
  signUpLink: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});
