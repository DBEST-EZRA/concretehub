import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
//icon
import { MaterialIcons } from "@expo/vector-icons";

import { TextInput, Modal } from "react-native-paper";
import FlatButton from "../components/FlatButton";
const Calculator = () => {
  const WEIGHT_OF_POST = 90;
  const COST_PER_POST = 1500;
  const COST_PER_METER_OF_BARBED_WIRE = 164;
  const COST_PER_KG_OF_U_NAILS = 300;
  const COST_PER_KG_OF_STRAIGHT_NAILS = 250;

  const validateForm = () => {
    console.log("validation of form ");
  };
  const handleSubmit = (e) => {
    console.log("hejj");
  };

  const [acres, setAcres] = useState("");
  const [postInterval, setPostsInterval] = useState("");
  const [numberOfConrners, setNumberOfCorners] = useState("");
  const [barbedWires, setBarbedWires] = useState("");
  const [distance, setDistance] = useState("");
  const [postWeight, setPostWeight] = useState("");
  const [offloaders, setOffloaders] = useState("");
  const [postCost, setpostCost] = useState("");
  const [barbedwireCost, setBarbedWireCost] = useState("");
  const [u_nails, setU_nails] = useState("");
  const [straightNails, setStraightNails] = useState("");

  const [visible, setVisible] = useState(false);

  const totalArea = acres ? parseInt(acres) * 4046.86 : 0;
  const sideLength = Math.sqrt(totalArea);
  const perimeter = sideLength * 4;
  const cornerBrace = numberOfConrners ? parseInt(numberOfConrners) : 0;
  const uprightPosts = cornerBrace;
  const interval = 2;
  const intermediateBrace = perimeter / interval - 1;
  const totalPosts = uprightPosts + cornerBrace + intermediateBrace;
  const totalCostPosts = totalPosts * COST_PER_POST;
  const totalCostBarbedWire = barbedwireCost
    ? parseInt(barbedwireCost) * COST_PER_METER_OF_BARBED_WIRE
    : 0;
  const totalCostUNails = u_nails
    ? parseInt(u_nails) * COST_PER_KG_OF_U_NAILS
    : 0;
  const totalCostStraightNails = straightNails
    ? parseInt(straightNails) * COST_PER_KG_OF_STRAIGHT_NAILS
    : 0;
  const totalCost =
    totalCostUNails +
    totalCostPosts +
    totalCostStraightNails +
    totalCostBarbedWire;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Concrete Hub Calculator</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Name of Acres"
            value={acres}
            onChangeText={(text) => setAcres(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="interval between posts in meters"
            value={postInterval}
            onChangeText={(text) => setPostsInterval(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Number of corners on your land"
            value={numberOfConrners}
            onChangeText={(text) => setNumberOfCorners(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Lines of barbed wires"
            value={barbedWires}
            onChangeText={(text) => setBarbedWires(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Transport distance from Nairobi"
            value={distance}
            onChangeText={(text) => setDistance(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="weight of the posts"
            value={postWeight}
            onChangeText={(text) => setPostWeight(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Number of people to offload"
            value={offloaders}
            onChangeText={(text) => setOffloaders(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="cost per post"
            value={postCost}
            onChangeText={(text) => setpostCost(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="cost per meter of barbed wire"
            value={barbedwireCost}
            onChangeText={(text) => setBarbedWireCost(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Cost per KG of U-nails"
            value={u_nails}
            onChangeText={(text) => setU_nails(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Cost per KG of 4 Straight nails"
            value={straightNails}
            onChangeText={(text) => setStraightNails(text)}
          />
          <FlatButton text="CALCULATE" onPress={() => setVisible(true)} />
        </View>
      </ScrollView>

      <Modal
        style={styles.modal}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.icon}>
            <MaterialIcons
              name="cancel"
              size={30}
              color="white"
              onPress={() => setVisible(false)}
            />
          </View>

          <Text style={{ ...styles.text, ...styles.textTitle }}>
            STATISTICS
          </Text>
          <Text style={styles.text}>
            Total area of your land in m2 : {totalArea}
          </Text>
          <Text style={styles.text}>Length of one side : {sideLength}</Text>
          <Text style={styles.text}>Perimeter of one side : {perimeter}</Text>
          <Text style={styles.text}>No of upright post : {uprightPosts}</Text>
          <Text style={styles.text}>Intermediate posts</Text>
          <Text style={styles.text}>Total cost of Post : {totalCostPosts}</Text>
          <Text style={styles.text}>Barbed wire : {totalCostBarbedWire}</Text>
          <Text style={styles.text}>U-nails : {totalCostUNails}</Text>
          <Text style={styles.text}>
            4 Straight nails : {totalCostStraightNails}
          </Text>

          <Text style={{ ...styles.text, alignItems: "center", color: "blue" }}>
            Total cost is ksh {totalCost}
          </Text>

          <FlatButton text="Order Now" />
        </View>
      </Modal>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    justifyContent: "center",
    position: "relative",
    paddingHorizontal: 20,
    paddingVertical: 50,
    margin: 20,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    textAlign: "left",
  },
  textTitle: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 40,
    color: "red",
    padding: 10,
    paddingHorizontal: "auto",
    borderBottomColor: "red",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  statButton: {
    color: "yellow",
  },
  modal: {
    justifyContent: "center",
    alignContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  formContainer: {
    marginTop: 50,
    gap: 10,
    marginBottom: 70,
    fontSize: 30,
  },
  title: {
    color: "#007bff",
    fontSize: 30,
    lineHeight: 30,
    marginHorizontal: "auto",
  },
  input: {
    fontSize: 17,
    marginHorizontal: 10,
  },
  buton: {
    fontSize: 40,
    marginHorizontal: 10,
    backgroundColor: "yellow",
    color: "white",
  },
});
