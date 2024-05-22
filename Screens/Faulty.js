import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const products = [
  {
    id: "1",
    name: "Product 1",
    description: "Description of Product 1",
    price: 10,
  },
  {
    id: "2",
    name: "Product 2",
    description: "Description of Product 2",
    price: 20,
  },
];

const ProductsScreen = ({ navigation }) => {
  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetail", { product: item })
            }
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  return (
    <View>
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>Price: ${product.price}</Text>
      <Button
        title="Add to Cart"
        onPress={() => {
          // add to cart
        }}
      />
    </View>
  );
};

const CartScreen = ({ cart }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <View>
      {cart.map((item) => (
        <Text key={item.id}>
          {item.name} - ${item.price}
        </Text>
      ))}
      <Text>Total: ${total}</Text>
    </View>
  );
};

const AuthScreen = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <View>
      {isLoggedIn ? (
        <Text>Welcome Back!</Text>
      ) : (
        <>
          <Button title="Login" onPress={() => setIsLoggedIn(true)} />
          <Button
            title="Signup"
            onPress={() => {
              // signup
            }}
          />
        </>
      )}
    </View>
  );
};

const ProductsStack = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          headerRight: () => (
            <>
              <Ionicons
                name="cart"
                size={25}
                onPress={() => navigation.navigate("Cart", { cart })}
              />
              <Ionicons
                name={isLoggedIn ? "person" : "person-outline"}
                size={25}
                onPress={() =>
                  navigation.navigate("Auth", { isLoggedIn, setIsLoggedIn })
                }
              />
            </>
          ),
        }}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart">
        {(props) => <CartScreen {...props} cart={cart} />}
      </Stack.Screen>
      <Stack.Screen name="Auth">
        {(props) => (
          <AuthScreen
            {...props}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="ProductsStack"
          component={ProductsStack}
          options={{ tabBarLabel: "Products" }}
        />
        <Tab.Screen
          name="Page2"
          component={Page2Screen}
          options={{ tabBarLabel: "Page 2" }}
        />
        <Tab.Screen
          name="Page3"
          component={Page3Screen}
          options={{ tabBarLabel: "Page 3" }}
        />
        <Tab.Screen
          name="Page4"
          component={Page4Screen}
          options={{ tabBarLabel: "Page 4" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const Page2Screen = () => (
  <View>
    <Text>Page 2</Text>
  </View>
);
const Page3Screen = () => (
  <View>
    <Text>Page 3</Text>
  </View>
);
const Page4Screen = () => (
  <View>
    <Text>Page 4</Text>
  </View>
);

export default App;
