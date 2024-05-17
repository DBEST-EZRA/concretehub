import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    Image,
    View,
  } from "react-native";
  import React from "react";
  import { useNavigation } from "@react-navigation/native";
  import { SafeAreaView } from "react-native-web";
  
  const Signup = () => {
    const navigation = useNavigation();
  
    const handleLinkPress = () => {
      navigation.navigate("Login");
    };
    return (
      <View style={styles.screenView}>
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
          <View>
            <Text style={{ fontWeight: "bold" }}>or</Text>
          </View>
        </View>
        <View style={styles.signupOptions}>
          <TouchableOpacity style={styles.googleButton} onPress={() => {}}>
            <Image
              source={require("../images/facebook.png")}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleButton} onPress={() => {}}>
            <Image
              source={require("../images/google.png")}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleButton} onPress={() => {}}>
            <Image
              source={require("../images/instagram.png")}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Button onPress={() => {}} title="Sign Up" color="#007bff" />
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
      </View>
    );
  };
  
  export default Signup;
  
  const styles = StyleSheet.create({
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
      borderRadius: "50%",
      alignItems: "center",
      justifyContent: "center",
    },
    imageStyle: {
      height: 22,
      width: 22,
    },
    button: {
      marginHorizontal: "10%",
      marginVertical: 20,
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
  