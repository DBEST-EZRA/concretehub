import React  from "react";
import { useState,createContext } from "react";
import { Text, View } from "react-native";

export const dataContext = createContext()
 
class Context extends Component {
    state = {  } 
    render() { 
        return (
            <View>
                <Text>data</Text>
            </View>
        );
    }
}
 
export default Context;