// App.js
import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigation from "./Navigation/BottomNavigation.jsx";
import ProductDetails from "./Screens/ProductDetails.jsx";
import Login from "./Screens/Login.jsx";
import Signup from "./Screens/Signup.jsx";
import Cart from "./Screens/Cart.jsx";
import PaymentDetails from "./Screens/PaymentDetails.jsx";
import FinancePage from "./Admin/FinancePage.jsx";
import DriverPage from "./Admin/DriverPage.jsx";
import AdminPage from "./Admin/AdminPage.jsx";
import { AuthProvider } from "./Auth/AuthContext.js";
import ProtectedRoute from "./Auth/ProtectedRoute.js";

const Stack = createStackNavigator();

const SplashScreen = () => (
  <View style={styles.splashContainer}>
    <Image
      source={require("./assets/concretehub.png")}
      style={styles.splashImage}
    />
    <Text style={styles.splashText}>Loading...</Text>
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
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      <Stack.Screen
        name="FinancePage"
        options={{ headerShown: false }}
        children={(props) => (
          <ProtectedRoute
            {...props}
            component={FinancePage}
            roles={["finance"]}
          />
        )}
      />
      <Stack.Screen
        name="DriverPage"
        options={{ headerShown: false }}
        children={(props) => (
          <ProtectedRoute
            {...props}
            component={DriverPage}
            roles={["driver"]}
          />
        )}
      />
      <Stack.Screen
        name="AdminPage"
        options={{ headerShown: false }}
        children={(props) => (
          <ProtectedRoute {...props} component={AdminPage} roles={["admin"]} />
        )}
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
    <AuthProvider>
      <NavigationContainer>
        {isLoading ? (
          <SplashScreen />
        ) : (
          <SafeAreaView style={styles.container}>
            <HomeStack />
          </SafeAreaView>
        )}
      </NavigationContainer>
    </AuthProvider>
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
    backgroundColor: "#FFD700",
  },
  splashImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  splashText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
