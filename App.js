import { StyleSheet, SafeAreaView, View } from "react-native";
import BottomNavigation from "./Navigation/BottomNavigation.jsx";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <BottomNavigation />
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
