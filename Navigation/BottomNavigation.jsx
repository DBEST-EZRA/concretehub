import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, Entypo, Feather } from "@expo/vector-icons";
import Home from "../Screens/Home";
import Calculator from "../Screens/Calculator";
import Contact from "../Screens/Contact";
import Help from "../Screens/Help";
import Signup from "../Screens/Signup";
import Login from "../Screens/Login";
import PaymentDetails from "../Screens/PaymentDetails";

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
    height: 70,
  },
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
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
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="calculator"
              size={24}
              color={focused ? "#007bff" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PaymentDetails"
        component={PaymentDetails}
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
        name="Signup"
        component={Signup}
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

// name = "Help";
// component = { Help };

// name = "Calculator";
// component = { Calculator };

// name="Home"
// component={Home}

// name="Contact"
// component={Contact}
