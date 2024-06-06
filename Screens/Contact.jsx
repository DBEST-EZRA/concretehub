import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Linking,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import CircleButton from "./CircleButton";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const openWhatsApp = () => {
    let url = "whatsapp://send?phone=+254712405172"; // Replace with your number
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          alert("WhatsApp is not installed on this device");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const makePhoneCall = () => {
    let phoneNumber = "tel:+254757534843"; // Replace phone number
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          alert("Phone call is not supported on this device");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const sendEmail = () => {
    let email =
      "mailto:dr.ezraofficial@gmail.com?subject=Hello%20ConcreteHub%20Helpcentre"; // Replace email address and subject
    Linking.canOpenURL(email)
      .then((supported) => {
        if (!supported) {
          alert("Email is not supported on this device");
        } else {
          return Linking.openURL(email);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

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

  const button3Style = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -210],
        }),
      },
    ],
    opacity: animation,
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 20 }}>
          Need To Get In Touch With Us?
        </Text>
        <View style={styles.innerContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Phone Call</Text>
          <Text style={{ fontSize: 16 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            incidunt corporis voluptate aliquid consequuntur! Quidem voluptas
            nostrum laudantium laborum quaerat, laboriosam alias veniam
            molestiae ea rerum doloremque culpa consequatur maxime optio iusto
            libero ullam nesciunt magnam perspiciatis?
          </Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Phone Call</Text>
          <Text style={{ fontSize: 16 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            incidunt corporis voluptate aliquid consequuntur! Quidem voluptas
            nostrum laudantium laborum quaerat, laboriosam alias veniam
            molestiae ea rerum doloremque culpa consequatur maxime optio iusto
            libero ullam nesciunt magnam perspiciatis?
          </Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Phone Call</Text>
          <Text style={{ fontSize: 16 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            incidunt corporis voluptate aliquid consequuntur! Quidem voluptas
            nostrum laudantium laborum quaerat, laboriosam alias veniam
            molestiae ea rerum doloremque culpa consequatur maxime optio iusto
            libero ullam nesciunt magnam perspiciatis?
          </Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Phone Call</Text>
          <Text style={{ fontSize: 16 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            incidunt corporis voluptate aliquid consequuntur! Quidem voluptas
            nostrum laudantium laborum quaerat, laboriosam alias veniam
            molestiae ea rerum doloremque culpa consequatur maxime optio iusto
            libero ullam nesciunt magnam perspiciatis?
          </Text>
        </View>

        <View style={styles.fabContainer}>
          <Animated.View style={[styles.secondaryButton, button1Style]}>
            <TouchableOpacity style={styles.fabEmail} onPress={sendEmail}>
              <Icon name="create" size={20} color="white" />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.secondaryButton, button2Style]}>
            <TouchableOpacity style={styles.fabPhone} onPress={makePhoneCall}>
              <Icon name="call" size={20} color="white" />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.secondaryButton, button3Style]}>
            <TouchableOpacity style={styles.fabWhatsapp} onPress={openWhatsApp}>
              <Icon name="logo-whatsapp" size={20} color="white" />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
            <Icon name={isOpen ? "close" : "add"} size={30} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  innerContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  fabContainer: {
    position: "absolute",
    right: 30,
    bottom: 80, // Adjusted to raise FAB container
    alignItems: "center",
  },
  fab: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 30,
    elevation: 8,
  },
  fabWhatsapp: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25D366",
    borderRadius: 30,
    elevation: 8,
  },
  fabEmail: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c71610",
    borderRadius: 30,
    elevation: 8,
  },
  fabPhone: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    borderRadius: 30,
    elevation: 8,
  },
  secondaryButton: {
    position: "absolute",
  },
});
