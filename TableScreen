import React from 'react'
import {View, Button, StyleSheet} from 'react-native';
import CarTable from './CarTable';

export default function CarTableScreen({navigation}){
  return(
    <View style = {styles.container}>
      <CarTable/>
      <Button title = "Voltar" onPress={() => navigation.goBack()}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
