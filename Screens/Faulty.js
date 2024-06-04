import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    if (isOpen) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setIsOpen(!isOpen);
  };

  const button1Style = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70],
        }),
      },
    ],
    opacity: animation,
  };

  const button2Style = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140],
        }),
      },
    ],
    opacity: animation,
  };

  return (
    <View style={styles.container}>
      {/* Other contents of the page */}
      <Text style={styles.text}>This is some text on the page.</Text>
      <Text style={styles.text}>Here is some more content.</Text>

      {/* Floating Action Button */}
      <View style={styles.fabContainer}>
        <Animated.View style={[styles.secondaryButton, button1Style]}>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => alert("Button 1 clicked!")}
          >
            <Icon name="create" size={20} color="white" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.secondaryButton, button2Style]}>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => alert("Button 2 clicked!")}
          >
            <Icon name="camera" size={20} color="white" />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
          <Icon name={isOpen ? "close" : "add"} size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  fabContainer: {
    position: "absolute",
    right: 30,
    bottom: 30,
    alignItems: "center",
  },
  fab: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
  },
  secondaryButton: {
    position: "absolute",
  },
});

export default App;
