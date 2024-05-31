import React from "react";
import { useState } from "react";
import { ScrollView, View,StyleSheet } from "react-native";
import { Appbar, Searchbar,Text } from "react-native-paper";


const AdminPage = () => {
  const [items] = useState([
    {
      key: 1,
      name: "Cupcake",
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: "Eclair",
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: "Frozen yogurt",
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
        key: 5,
        name: "Gingerbread",
        calories: 305,
        fat: 3.7,
      },
      {
        key: 6,
        name: "Gingerbread",
        calories: 305,
        fat: 3.7,
      },
      {
        key: 7,
        name: "Gingerbread",
        calories: 305,
        fat: 3.7,
      },
  ]);
const [horizontalScroll,setHorizontalScroll] =useState(true)
 const showDetails =()=>{
    setHorizontalScroll(prev=> !prev)
 }

  return (
    <View style={{backgroundColor:'gray',flex:1}}>
      <View>
        <Appbar.Header>
          {/* <Appbar.BackAction/> */}
          <Appbar.Content title="Admin Page" />
        </Appbar.Header>

        {/* products details  */}
      </View>
        <Searchbar style={styles.search} placeholder="Search"/>
        <ScrollView style={styles.scrollContainer}>
      <View style={styles.scroll}>
        <Text style={{marginBottom:5,color:"blue",fontSize:24,borderBottomWidth:1,borderColor:'blue'}} onPress={showDetails}>Products Details</Text>

        <ScrollView horizontal={horizontalScroll}>
            {
                items.map(items => (
                    <View key={items.key} style={styles.card} >
                            <Text style={{color:"blue",fontWeight:'bold'}}>Name : {items.name}</Text>
                            <Text style={styles.text}>Calories : {items.calories}</Text>
                            <Text style={styles.text}>Fat : {items.fat}</Text>
                    </View>
                ))}
        </ScrollView>
        
      </View>
                {/* inventory scroll */}
      <View style={styles.scroll}>
        <Text style={{marginBottom:5,color:"blue",fontSize:24,borderBottomWidth:1,borderColor:'blue'}} onPress={showDetails}>suppliers Details</Text>
        <ScrollView horizontal={horizontalScroll} >
            {
                items.map(items => (
                    <View key={items.key} style={styles.card} >
                            <Text style={{color:"blue",fontWeight:'bold'}}>Name : {items.name}</Text>
                            <Text style={styles.text}>Calories : {items.calories}</Text>
                            <Text style={styles.text}>Fat : {items.fat}</Text>
                    </View>
                ))}
        </ScrollView>  
      </View>
     {/* work in progress */}
     <View style={styles.scroll}>
        <Text style={{marginBottom:5,color:"blue",fontSize:24,borderBottomWidth:1,borderColor:'blue'}}>WIP details ....</Text>
        <ScrollView horizontal={true}>
            {
                items.map(items => (
                    <View key={items.key} style={styles.card} >
                            <Text style={{color:"blue",fontWeight:'bold'}}>Name : {items.name}</Text>
                            <Text style={styles.text}>Calories : {items.calories}</Text>
                            <Text style={styles.text}>Fat : {items.fat}</Text>
                    </View>
                ))}
        </ScrollView>  
      </View>
      {/* drivers details */}
      <View style={styles.scroll}>
        <Text style={{marginBottom:5,color:"blue",fontSize:24,borderBottomWidth:1,borderColor:'blue'}}>Drivers Details</Text>
        <ScrollView horizontal={true}>
            {
                items.map(items => (
                    <View key={items.key} style={styles.card} >
                            <Text style={{color:"blue",fontWeight:'bold'}}>Name : {items.name}</Text>
                            <Text style={styles.text}>Calories : {items.calories}</Text>
                            <Text style={styles.text}>Fat : {items.fat}</Text>
                    </View>
                ))}
        </ScrollView>
      </View>
          {/* pending orders  */}
      <View style={styles.scroll}>
        <Text style={{marginBottom:5,color:"blue",fontSize:24,borderBottomWidth:1,borderColor:'blue'}}>pending orders ....</Text>
        <View>
        <ScrollView horizontal={true}>
            {
                items.map(items => (
                    <View key={items.key} style={styles.card} >
                            <Text style={{color:"blue",fontWeight:'bold'}}>Name : {items.name}</Text>
                            <Text style={styles.text}>Calories : {items.calories}</Text>
                            <Text style={styles.text}>Fat : {items.fat}</Text>
                    </View>
                ))}
        </ScrollView>
        </View>
       
      </View>
      </ScrollView>
    </View>
  );
};

export default AdminPage;


const styles = StyleSheet.create({
    search :{
        backgroundColor:"#ffffff",
        borderRadius:8,
        margin:10,
        elevation:5,
        shadowColor:"#00000",
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.25,
        shadowRadius:4,

    },
   scrollContainer:{
    marginBottom:50
   },
    scroll:{
        padding:10,
        margin:10,
        backgroundColor:"#ffffff",
        borderRadius:8,
        padding:16,
        elevation:5,
        shadowColor:"#00000",
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.25,
        shadowRadius:4

        // height:200
    },
    card:{
        fontSize:24,
        margin:10,
        gap:10,
        padding:10,
        margin:10,
        borderBottomWidth:0.5,
        margin: 8, // Add margin for space between cards
        borderRadius: 8, // Border radius for the card
        elevation: 5, // Add elevation for shadow effect
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow radius
        paddingTop:20,

    },
    text:{
      fontSize:24,
    }


})