/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import RouterConfig from "./RouterConfig";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

const initialList = {
  cartValue: []
};

const cartStore = (state = initialList, action) => {
  console.log("action dispachted", action);
  switch (action.type) {
    case "ADD_VALUE_IN_STORE":
      let temp = action.payload.item;
      let finalValue = state.cartValue;
      
      finalValue.push(temp);
  
      return {
        ...state,
        cartValue: finalValue
      };
    case "DELETE_VALUE_FROM_STORE":
      return{
        ...state,
        cartValue:state.cartValue.filter(item => item.name !== action.payload.item.name)
      }
    case "ADD_CART_VALUE_FROM_STORAGE":
      return{
        ...state,
        cartValue:action.payload
      }
    default:
      return state;
  }
};
const reducer = combineReducers({
  cartStore: cartStore
});

const store = createStore(reducer);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount(){
     //here you can save your data in async storage
    this.storeInAsyncStorage("CART_VALUE",JSON.stringify(store.getState().cartStore.cartValue) );
  }

  storeInAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };

  render() {
    return (
      <Provider store={store}>
        <RouterConfig />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
