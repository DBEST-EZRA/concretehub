import { StyleSheet, SafeAreaView } from "react-native";
import BottomNavigation from "./Navigation/BottomNavigation.jsx";
import { NavigationContainer } from "@react-navigation/native";
import ProductDetails from "./Screens/ProductDetails.jsx";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/Login.jsx";
import Signup from "./Screens/Signup.jsx";

const Stack = createStackNavigator();

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
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <HomeStack />
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
