import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";
import BottomNavigation from "./Navigation/BottomNavigation.jsx";
import { NavigationContainer } from "@react-navigation/native";
import ProductDetails from "./Screens/ProductDetails.jsx";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/Login.jsx";
import Signup from "./Screens/Signup.jsx";
import React, { useState, useEffect } from "react";
import Cart from "./Screens/Cart.jsx";
import PaymentDetails from "./Screens/PaymentDetails.jsx";

const Stack = createStackNavigator();

const SplashScreen = () => (
  <View style={styles.splashContainer}>
    <Image
      source={require("./assets/concretehub.png")}
      style={styles.splashImage}
    />
    <Text>Loading...</Text>
  </View>
);

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="Cart"
        component={Cart}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentDetails"
        component={PaymentDetails}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      <NavigationContainer>
        {isLoading ? (
          <SplashScreen />
        ) : (
          <SafeAreaView style={styles.container}>
            <HomeStack />
          </SafeAreaView>
        )}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  splashImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
