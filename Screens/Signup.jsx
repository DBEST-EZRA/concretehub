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
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

const RegisterCustomer = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLinkPress = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !passwordConfirmation) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    if (password !== passwordConfirmation) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    fetch("http://localhost:8000/api/v1/customer/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.message) {
          Alert.alert("Success", "Customer registered successfully");
          navigation.navigate("ProductsPage"); // Navigate to ProductsPage
        } else {
          Alert.alert("Error", data.message || "An error occurred");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error registering customer: ", error);
        Alert.alert("Error", "An error occurred while registering the customer");
      });
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
          <Text>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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
        <View style={styles.inputContainer}>
          <Text>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
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
        <TouchableOpacity style={styles.buttonSpace} onPress={handleRegister} disabled={loading}>
          <View style={styles.button}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign up</Text>
            )}
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

export default RegisterCustomer;

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
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
