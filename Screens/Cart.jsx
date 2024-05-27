import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const productsData = [
  { id: "1", name: "Product 1", price: 10.0, quantity: 1 },
  { id: "2", name: "Product 2", price: 20.0, quantity: 1 },
  { id: "3", name: "Product 3", price: 30.0, quantity: 1 },
];

const Cart = () => {
  const [products, setProducts] = useState(productsData);
  const [grandTotal, setGrandTotal] = useState(0);

  const navigation = useNavigation();

  const showPaymentsPage = () => {
    navigation.navigate("PaymentDetails");
    console.log("navigating to the payments page");
  };

  useEffect(() => {
    calculateGrandTotal();
  }, [products]);

  const increaseQuantity = (id) => {
    setProducts((prevProducts) => {
      const newProducts = prevProducts.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      return newProducts;
    });
  };

  const decreaseQuantity = (id) => {
    setProducts((prevProducts) => {
      const newProducts = prevProducts.map((product) => {
        if (product.id === id && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      return newProducts;
    });
  };

  const calculateTotal = (product) => {
    return (product.price * product.quantity).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const total = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    console.log(`Calculated grand total: ${total.toFixed(2)}`); // Debug log
    setGrandTotal(total.toFixed(2));
  };

  const deleteItem = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const clearAll = () => {
    setProducts([]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <Button
          title="-"
          onPress={() => decreaseQuantity(item.id)}
          style={styles.minusButton}
        />
        <Text style={styles.itemText}>{item.quantity}</Text>
        <Button
          title="+"
          onPress={() => increaseQuantity(item.id)}
          style={styles.minusButton}
        />
        <TouchableOpacity
          onPress={() => deleteItem(item.id)}
          style={styles.deleteButton}
        >
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <Text style={styles.itemText}>{calculateTotal(item)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <View style={styles.grandTotal}>
        <Text style={styles.total}>
          Total: Ksh {grandTotal !== 0 ? grandTotal : "0.00"}
        </Text>
        <Button title="Clear All" onPress={clearAll} />
      </View>
      <View style={styles.checkout}>
        <TouchableOpacity onPress={showPaymentsPage}>
          <View style={styles.checkButton}>
            <Text style={styles.checkButtonText}>Checkout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  list: {
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  deleteButton: {
    marginHorizontal: 10,
  },
  minusButton: {
    paddingHorizontal: 5,
  },
  checkButton: {
    marginHorizontal: "10%",
    marginVertical: 20,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#007bff",
  },
  checkButtonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Cart;
