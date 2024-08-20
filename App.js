import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import LoginOnnScreen from './screens/LoginOnnScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import RegisterproScreen from './screens/RegisterproScreen';
import PurchaseConfirmationScreen from './screens/PurchaseConfirmationScreen'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="LoOn" component={LoginOnnScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="ProForn" component={RegisterproScreen} />
        <Stack.Screen name="Confirmation" component={PurchaseConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
