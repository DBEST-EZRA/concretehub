import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Button,
} from "react-native";
import TopNavigation from "../Navigation/TopNavigation";

const ProductsPage = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchProducts = () => {
    setLoading(true);
    setError(false);

    fetch("https://6cba-102-210-40-234.ngrok-free.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setFilteredProducts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products: ", err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText, products]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}
      style={styles.cardContainer}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: item.base_image.small_image_url }}
          style={styles.image}
        />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>{item.min_price}</Text>
        {/* <Text style={styles.remaining}>{item.remaining} items left</Text> */}
      </View>
    </TouchableOpacity>
  );

  const [numColumns, setNumColumns] = useState(2);

  return (
    <View style={styles.container}>
      <TopNavigation onSearch={setSearchText} />
      <View style={styles.welcomeContainer}></View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Unable to load data</Text>
          <Button title="Refresh" onPress={fetchProducts} />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      )}
    </View>
  );
};

export default ProductsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5FCFF",
    paddingBottom: 50,
  },
  listContainer: {
    justifyContent: "space-between",
  },
  cardContainer: {
    flex: 1,
    margin: 5,
  },
  card: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get("window").width / 2 - 20,
    height: 250,
  },
  image: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  remaining: {
    color: "red",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
  },
  welcomeContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 10,
  },
});

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Image,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
//   ActivityIndicator,
//   Button,
// } from "react-native";
// import TopNavigation from "../Navigation/TopNavigation";
// import { db, auth } from "../Database/Config"; // Import Firestore and auth instance
// import { collection, onSnapshot } from "firebase/firestore"; // Import Firestore functions from v9 modular SDK

// const ProductsPage = ({ navigation }) => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [userEmail, setUserEmail] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [searchText, setSearchText] = useState("");

//   const fetchProducts = () => {
//     setLoading(true);
//     setError(false);

//     const unsubscribe = onSnapshot(
//       collection(db, "products"),
//       (snapshot) => {
//         const productsData = [];
//         snapshot.forEach((doc) => {
//           productsData.push({
//             id: doc.id,
//             ...doc.data(),
//           });
//         });
//         setProducts(productsData);
//         setFilteredProducts(productsData);
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Error fetching products: ", error);
//         setError(true);
//         setLoading(false);
//       }
//     );

//     return unsubscribe;
//   };

//   useEffect(() => {
//     // Fetch user's email from auth
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       setUserEmail(currentUser.email);
//     }

//     // Fetch products
//     const unsubscribe = fetchProducts();

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     // Filter products based on search text
//     const filtered = products.filter((product) =>
//       product.name.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   }, [searchText, products]);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => navigation.navigate("ProductDetails", { item })}
//       style={styles.cardContainer}
//     >
//       <View style={styles.card}>
//         <Image source={{ uri: item.image }} style={styles.image} />
//         <Text style={styles.title}>{item.name}</Text>
//         <Text style={styles.text}>sh {item.cost}</Text>
//         <Text style={styles.remaining}>{item.remaining} items left</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const [numColumns, setNumColumns] = useState(2);

//   return (
//     <View style={styles.container}>
//       <TopNavigation onSearch={setSearchText} />
//       <View style={styles.welcomeContainer}>
//         {/* <Text style={styles.welcomeText}>Welcome, {userEmail}</Text> */}
//       </View>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : error ? (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>Unable to load data</Text>
//           <Button title="Refresh" onPress={fetchProducts} />
//         </View>
//       ) : (
//         <FlatList
//           data={filteredProducts}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           numColumns={numColumns}
//           contentContainerStyle={styles.listContainer}
//           columnWrapperStyle={{ justifyContent: "space-between" }}
//         />
//       )}
//     </View>
//   );
// };

// export default ProductsPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#F5FCFF",
//     paddingBottom: 50,
//   },
//   listContainer: {
//     justifyContent: "space-between",
//   },
//   cardContainer: {
//     flex: 1,
//     margin: 5,
//   },
//   card: {
//     backgroundColor: "#fff",
//     alignItems: "center",
//     padding: 10,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     width: Dimensions.get("window").width / 2 - 20,
//     height: 250,
//   },
//   image: {
//     width: "100%",
//     height: 130,
//     resizeMode: "contain",
//   },
//   title: {
//     marginTop: 5,
//     fontSize: 18,
//     fontWeight: "bold",
//     marginVertical: 5,
//     textAlign: "center",
//   },
//   text: {
//     fontSize: 16,
//     textAlign: "center",
//   },
//   remaining: {
//     color: "red",
//     fontSize: 14,
//     fontStyle: "italic",
//     textAlign: "center",
//   },
//   welcomeContainer: {
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   welcomeText: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   errorContainer: {
//     alignItems: "center",
//   },
//   errorText: {
//     fontSize: 18,
//     color: "red",
//     marginBottom: 10,
//   },
// });
