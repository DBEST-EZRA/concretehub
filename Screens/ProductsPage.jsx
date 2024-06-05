import React, { useEffect, useState } from 'react'
import { View,Text,StyleSheet,FlatList } from 'react-native'
import {Appbar,Card,Button,Searchbar } from 'react-native-paper'


const ProductsPage = () => {
const [data,setData]=useState([1,2,3,4,5,6,7,8,])


// useEffect(()=>{
  // fetch("http://localhost:3000/data")
  // .then(Response=>Response.json())
  // .then(data=>setData(data))
// })
  const renderItem =({item})=>(
    <View style={styles.container}>
    <Card style={styles.card}>                                                                                                            
      <Card.Cover  style={styles.image} source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Content style={styles.content}>
        <View>
          <View>
            <Text variant="titleLarge">product name </Text>
            <Text>sh 300</Text>
          </View>   
            <Button style={styles.buttons}>Add to cart</Button>
        </View>
        
      </Card.Content>
    </Card>
  </View>
  )


  return (
    <View>
     <Appbar.Header>
       <Appbar.Content title="Products" />
    </Appbar.Header>
    <Searchbar
    style={styles.search}
      placeholder="Search"
      onChangeText={console.log("hello world")}
      
    />


<View>
  <View >
      {data ? (
        <FlatList
        style={styles.flatListContainer}
          data={data}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>Loading...</Text>
      )}
  </View>
      
    </View>


  
    </View>
  )
}

export default ProductsPage

const styles = StyleSheet.create({
  flatListContainer:{
    display:"flex"
  },
  container:{
    marginHorizontal:10,
    // display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'flex-start',
  },
  search:{
    margin:10,
    fontSize:24
  },
  card:{
    backgroundColor:'grey',
    width:"45%",
    height:220,
    margin:10
  
  },
  content:{
    justifyContent:'flex-start',
    paddingVertical:15
  },
  image:{
    padding:0,
    height:100,
    width:"100%",
  },
  buttons:{
    marginTop:20,
    backgroundColor:'red',

  }
})