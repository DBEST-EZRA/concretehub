import React, { useState } from "react";
import { View, Text } from "react-native";
import { Appbar, DataTable } from "react-native-paper";
import { Calendar } from "react-native-calendars";

const Drivers = () => {
  const [visibily, setVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleToggle = () => {
    setVisibility(!visibily);
  };
  return (
    <View style={{paddingBottom:20}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { }} />
        <Appbar.Content title="Title" />
        <Appbar.Action icon="calendar" onPress={handleToggle} />
        <Appbar.Action icon="magnify" onPress={() => { }} />
      </Appbar.Header>

        {visibily && (
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: "red",
                markedDates: { selectedDate: true },
              },
            }}
          />
        )}

        <View>
          <View>
            <DataTable>
              <Text style={{marginLeft:20,fontSize:20}}>pending task </Text>
              <DataTable.Header>
                <DataTable.Title>Items</DataTable.Title>
                <DataTable.Title>From</DataTable.Title>
                <DataTable.Title>To</DataTable.Title>
                <DataTable.Cell>Date</DataTable.Cell>
                {/* <DataTable.Title>Details</DataTable.Title> */}
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>cement</DataTable.Cell>
                <DataTable.Cell>Nku</DataTable.Cell>
                <DataTable.Cell>NBI</DataTable.Cell>
                <DataTable.Cell>12DEC</DataTable.Cell>
                {/* <DataTable.Cell></DataTable.Cell> */}
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Nails</DataTable.Cell>
                <DataTable.Cell>Naks</DataTable.Cell>
                <DataTable.Cell>Eld</DataTable.Cell>
                <DataTable.Cell>30`JUN</DataTable.Cell>

              </DataTable.Row>

            </DataTable>
          </View>
        </View>
    </View>
  );
};

export default Drivers;
