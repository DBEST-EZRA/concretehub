import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import GetLocation from "react-native-get-location";

const GetDeviceLocation = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getLocation = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });
      setLatitude(String(location.latitude));
      setLongitude(String(location.longitude));
    } catch (error) {
      Alert.alert("Error", "Failed to get location");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Latitude"
        value={latitude}
        onChangeText={(text) => setLatitude(text)}
      />
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Longitude"
        value={longitude}
        onChangeText={(text) => setLongitude(text)}
      />
      <Button title="Get Location" onPress={getLocation} />
    </View>
  );
};

export default GetDeviceLocation;
