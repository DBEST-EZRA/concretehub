import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLogin = () => {
    if (email && password) {
      fetch("http://localhost:8000/api/v1/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            Alert.alert("Success", "Logged in successfully");
            setEmail("");
            setPassword("");
            navigateToCorrectPage(email); // Navigate based on user's email
          } else {
            Alert.alert("Invalid Credentials", data.message || "An error occurred");
          }
        })
        .catch((error) => {
          console.error("Error logging in: ", error);
          Alert.alert("Error", "An error occurred while logging in");
        });
    } else {
      Alert.alert("Error", "Please fill all the fields");
    }
  };

  const handleLinkPress = () => {
    navigation.navigate("Signup");
  };

  const handleForgotPassword = () => {
    if (email) {
      fetch("http://localhost:8000/api/v1/customer/password/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            Alert.alert("Success", "Password reset email sent!");
          } else {
            Alert.alert("Error", data.message || "An error occurred");
          }
        })
        .catch((error) => {
          console.error("Error sending password reset email: ", error);
          Alert.alert("Error", "An error occurred while sending the password reset email");
        });
    } else {
      Alert.alert("Error", "Please enter your email address to reset password");
    }
  };

  const navigateToCorrectPage = (email) => {
    if (email === "onewaycompagency@gmail.com") {
      navigation.navigate("AdminPage");
    } else if (email === "ezradbest101@gmail.com") {
      navigation.navigate("FinancePage");
    } else if (email === "ezradbest1on1@gmail.com") {
      navigation.navigate("DriverPage");
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <SafeAreaView style={styles.loginContainer}>
          <View style={styles.loginHeader}>
            <Ionicons name="person-circle-sharp" size={120} color="#007bff" />
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
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <Fontisto
                name="email"
                size={20}
                color="black"
                style={styles.icon}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordInput}>
                <TextInput
                  style={styles.passwordTextInput}
                  placeholder="Password"
                  secureTextEntry={secureTextEntry}
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={toggleSecureTextEntry}>
                  <Ionicons
                    name={secureTextEntry ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="black"
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.rememberMe}>
            <Text style={styles.rememberMeText}>Remember me</Text>
            <TouchableOpacity onPress={handleForgotPassword}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  loginContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
  },
  loginHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  loginHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
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
    backgroundColor: "#e0e0e0",
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 35,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  passwordTextInput: {
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    paddingRight: 40,
    backgroundColor: "#e0e0e0",
    fontSize: 16,
    flex: 1,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: -10,
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
    width: 200,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
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
