import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProductDetails from "../Screens/ProductDetails";
import ProductsPage from "../Screens/ProductsPage";

const ProductStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductsPage"
        component={ProductsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProductStack;
