import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const LocationDetails = ({ setModalVisible }) => {
  const [country, setCountry] = useState("");
  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (country && county && city && postalCode && phone && email) {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    } else {
      Alert.alert("Error", "Please fill all the fields.");
    }
  };

  return (
    <View style={styles.mpesaDetailsContainer}>
      <Text style={styles.mpesaDetailsText}>
        Fill your location Details here
      </Text>

      <TextInput
        placeholder="Country"
        style={styles.input}
        value={country}
        onChangeText={setCountry}
      />
      <TextInput
        placeholder="County"
        style={styles.input}
        value={county}
        onChangeText={setCounty}
      />
      <TextInput
        placeholder="Town/City"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        placeholder="Postal Code"
        style={styles.input}
        value={postalCode}
        onChangeText={setPostalCode}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        placeholder="Email Address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const MpesaDetails = ({ setModalVisible }) => {
  const [mpesaName, setMpesaName] = useState("");
  const [mpesaCode, setMpesaCode] = useState("");
  const [mpesaNumber, setMpesaNumber] = useState("");

  const handleSubmit = () => {
    if (mpesaName && mpesaCode && mpesaNumber) {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    } else {
      Alert.alert("Error", "Please fill all the fields.");
    }
  };

  return (
    <View style={styles.mpesaDetailsContainer}>
      <Text style={styles.mpesaDetailsText}>Paybill Number: 522522</Text>
      <Text style={styles.mpesaDetailsText}>Account Number: 12409281</Text>
      <TextInput
        placeholder="Enter Mpesa name"
        style={styles.input}
        value={mpesaName}
        onChangeText={setMpesaName}
      />
      <TextInput
        placeholder="Mpesa Code eg SF55GQQY7L"
        style={styles.input}
        value={mpesaCode}
        onChangeText={setMpesaCode}
      />
      <TextInput
        placeholder="Enter Mpesa number 07xxxx"
        style={styles.input}
        value={mpesaNumber}
        onChangeText={setMpesaNumber}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const PaymentCard = ({ source, text, value, onPress, isSelected }) => (
  <TouchableOpacity
    style={[styles.paymentContainer, isSelected && styles.selectedCard]}
    onPress={() => onPress(value)}
  >
    <Image source={source} style={styles.paymentIcon} />
    <Text style={styles.paymentText}>{text}</Text>
  </TouchableOpacity>
);

const PaymentDetails = () => {
  const route = useRoute();
  const { uniqueNumber, grandTotal } = route.params;
  const shippingFee = 150;
  const totalToPay = parseFloat(shippingFee) + parseFloat(grandTotal);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardPress = (value) => {
    setSelectedPayment(value);
    console.log(value);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.productsHeader}>
            <Text style={styles.productsHeaderText}>Shipping Information</Text>
            <PaymentCard
              source={require("../images/location.png")}
              text="Location"
              value="location"
              onPress={handleCardPress}
              isSelected={selectedPayment === "location"}
            />
            {selectedPayment === "location" && (
              <LocationDetails setModalVisible={setModalVisible} />
            )}
          </View>
          <View style={styles.paymentMethods}>
            <Text style={styles.titleTwo}>Payment Method</Text>
            <PaymentCard
              source={require("../images/wallet.png")}
              text="Wallet"
              value="Wallet"
              onPress={handleCardPress}
              isSelected={selectedPayment === "Wallet"}
            />
            <PaymentCard
              source={require("../images/mastercard.png")}
              text="Visa/Mastercard"
              value="Visa/Mastercard"
              onPress={handleCardPress}
              isSelected={selectedPayment === "Visa/Mastercard"}
            />
            <PaymentCard
              source={require("../images/mapesa.jpg")}
              text="Mpesa"
              value="Mpesa"
              onPress={handleCardPress}
              isSelected={selectedPayment === "Mpesa"}
            />
            {selectedPayment === "Mpesa" && (
              <MpesaDetails setModalVisible={setModalVisible} />
            )}
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
            <TouchableOpacity>
              <Button title="Place Order" style={{ borderRadius: 5 }} />
            </TouchableOpacity>
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
    fontSize: 28,
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
