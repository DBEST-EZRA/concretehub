import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  Feather,
} from "@expo/vector-icons";
import Calculator from "../Screens/Calculator";
import Contact from "../Screens/Contact";
import Help from "../Screens/Help";
import ProductsPage from "../Screens/ProductsPage";
import Fetch from "../Database/Fetch";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 50,
  },
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="ProductsPage"
        component={ProductsPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? "#007bff" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={Calculator}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="calculator-variant"
              size={24}
              color={focused ? "#007bff" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="phone-call"
              size={24}
              color={focused ? "#007bff" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Fetch"
        component={Fetch}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="help-with-circle"
              size={24}
              color={focused ? "#007bff" : "grey"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

// name = "Cart";
// component = { Cart };
