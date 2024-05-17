import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";

const PaymentDetails = () => {
  return (
    <SafeAreaView style={{ marginTop: 50 }}>
      <View style={styles.productsHeader}>
        <Text style={styles.productsHeaderText}>Shipping Information</Text>
        <TextInput placeholder="Input your Location" style={styles.input} />
      </View>
      <View style={styles.paymentMethods}>
        <Text style={styles.titleTwo}>Payment Method</Text>
        <View style={styles.paymentContainer}>
          <Image
            source={require("../images/wallet.png")}
            style={styles.paymentIcon}
          />
          <Text style={styles.paymentText}>Wallet</Text>
        </View>
        <View style={styles.paymentContainer}>
          <Image
            source={require("../images/mastercard.png")}
            style={styles.paymentIconO}
          />
          <Text style={styles.paymentText}>Visa/Mastercard</Text>
        </View>
        <View style={styles.paymentContainer}>
          <Image
            source={require("../images/mpesa.png")}
            style={styles.paymentIconO}
          />
          <Text style={styles.paymentText}>Mpesa</Text>
        </View>
      </View>
      <View style={styles.subtotalSection}>
        <Text style={styles.goodsText}>Total</Text>
        <View style={styles.goodsAmount}>
          <Text style={{ fontSize: 16 }}>Goods Amount</Text>
          <Text style={{ fontSize: 16 }}>Ksh 200</Text>
        </View>
        <View style={styles.goodsAmount}>
          <Text style={{ fontSize: 16 }}>Shipping Fee</Text>
          <Text style={{ fontSize: 16 }}>Ksh 50</Text>
        </View>
      </View>
      <View style={styles.placeOrder}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Ksh 250</Text>
        <TouchableOpacity>
          <Button title="Place Order" style={{ borderRadius: 5 }} />
        </TouchableOpacity>
      </View>
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
  },
  paymentIcon: {
    width: 24,
    height: 24,
  },
  paymentIconO: {
    width: 34,
    height: 34,
  },
  paymentText: {
    left: 40,
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
  },
});
