import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../Database/Config";
import { collection, addDoc } from "firebase/firestore";

const LocationDetails = ({
  setCountry,
  setCounty,
  setCity,
  setPostalCode,
  setPhone,
  setEmail,
}) => {
  return (
    <View style={styles.mpesaDetailsContainer}>
      <Text style={styles.mpesaDetailsText}>
        Fill your location Details here
      </Text>
      <TextInput
        placeholder="Country"
        style={styles.input}
        onChangeText={setCountry}
      />
      <TextInput
        placeholder="County"
        style={styles.input}
        onChangeText={setCounty}
      />
      <TextInput
        placeholder="Town/City"
        style={styles.input}
        onChangeText={setCity}
      />
      <TextInput
        placeholder="Postal Code"
        style={styles.input}
        onChangeText={setPostalCode}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        onChangeText={setPhone}
      />
      <TextInput
        placeholder="enter same email as login"
        style={styles.input}
        onChangeText={setEmail}
      />
    </View>
  );
};

const MpesaDetails = ({ setMpesaName, setMpesaCode, setMpesaNumber }) => {
  return (
    <View style={styles.mpesaDetailsContainer}>
      <Text style={styles.mpesaDetailsText}>Paybill Number: 522522</Text>
      <Text style={styles.mpesaDetailsText}>Account Number: 12409281</Text>
      <TextInput
        placeholder="Enter Mpesa name"
        style={styles.input}
        onChangeText={setMpesaName}
      />
      <TextInput
        placeholder="Mpesa Code eg SF55GQQY7L"
        style={styles.input}
        onChangeText={setMpesaCode}
      />
      <TextInput
        placeholder="Enter Mpesa number 07xxxx"
        style={styles.input}
        onChangeText={setMpesaNumber}
      />
    </View>
  );
};

const PaymentDetails = () => {
  const route = useRoute();
  const { uniqueNumber, grandTotal } = route.params;
  const shippingFee = 150;
  const totalToPay = parseFloat(shippingFee) + parseFloat(grandTotal);

  const [country, setCountry] = useState("");
  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [mpesaName, setMpesaName] = useState("");
  const [mpesaCode, setMpesaCode] = useState("");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [userEmail, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (
      country &&
      county &&
      city &&
      postalCode &&
      phone &&
      mpesaName &&
      mpesaCode &&
      mpesaNumber &&
      userEmail
    ) {
      // Update grandTotal with totalToPay
      const newGrandTotal = totalToPay;

      setLoading(true); // Start spinner

      // Send the data to Firebase Firestore
      try {
        const orderRef = await addDoc(collection(db, "orders"), {
          city,
          code: postalCode,
          country,
          county,
          email: userEmail,
          grandTotal: newGrandTotal,
          mpesaCode,
          mpesaName,
          mpesaNumber,
          orderNo: uniqueNumber,
          phone,
        });

        console.log("Order successfully placed with ID: ", orderRef.id);

        // Show success modal
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
      } catch (error) {
        console.error("Error adding document: ", error);
        Alert.alert(
          "Error",
          "Failed to place the order. Please try again later."
        );
      }
    } else {
      Alert.alert("Error", "Please fill all the fields.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.productsHeader}>
            <LocationDetails
              setCountry={setCountry}
              setCounty={setCounty}
              setCity={setCity}
              setPostalCode={setPostalCode}
              setPhone={setPhone}
              setEmail={setEmail}
            />
          </View>
          <View style={styles.paymentMethods}>
            <Text style={styles.titleTwo}>Payment Method</Text>
            <MpesaDetails
              setMpesaName={setMpesaName}
              setMpesaCode={setMpesaCode}
              setMpesaNumber={setMpesaNumber}
            />
          </View>
          <View style={styles.subtotalSection}>
            <Text style={styles.goodsText}>Total</Text>
            <View style={styles.goodsAmount}>
              <Text style={{ fontSize: 16 }}>Goods Amount</Text>
              <Text style={{ fontSize: 16 }}>Ksh {grandTotal}</Text>
            </View>
            <View style={styles.goodsAmount}>
              <Text style={{ fontSize: 16 }}>Shipping Fee</Text>
              <Text style={{ fontSize: 16 }}>Ksh {shippingFee}</Text>
            </View>
            <View style={styles.goodsAmount}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Order Number: {uniqueNumber}
              </Text>
            </View>
          </View>
          <View style={styles.placeOrder}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Ksh {totalToPay}
            </Text>

            <Button
              title={loading ? "Placing Order..." : "Place Order"} // Button title changes based on loading state
              style={{ borderRadius: 5 }}
              onPress={handlePlaceOrder}
              disabled={loading} // Disable button when loading
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Ionicons name="checkmark-circle" size={64} color="green" />
            <Text style={styles.successText}>Success!</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PaymentDetails;
const styles = StyleSheet.create({
  productsHeader: {
    marginHorizontal: "5%",
  },
  productsHeaderText: {
    fontSize: 24,
  },
  input: {
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    width: "100%",
    backgroundColor: "#d9d9d9",
    marginVertical: 5,
  },
  paymentMethods: {
    marginHorizontal: "5%",
    marginVertical: 20,
  },
  titleTwo: {
    color: "green",
    fontSize: 24,
    fontWeight: "bold",
  },
  paymentContainer: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  selectedCard: {
    borderColor: "#007bff",
    borderWidth: 2,
  },
  paymentIcon: {
    width: 34,
    height: 34,
  },
  paymentText: {
    marginLeft: 10,
    fontSize: 16,
  },
  mpesaDetailsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  mpesaDetailsText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  subtotalSection: {
    marginHorizontal: "5%",
  },
  goodsAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 7,
  },
  goodsText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  placeOrder: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "5%",
    marginTop: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    fontSize: 20,
    marginTop: 10,
    color: "green",
  },
});
