import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PurchaseConfirmationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compra Confirmada!</Text>
      <Text style={styles.message}>
        Obrigado por sua compra. Seu pedido está sendo processado e você receberá uma confirmação por e-mail em breve.
      </Text>
      <TouchableOpacity 
        style={styles.homeButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeButtonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },

  homeButton: {
    backgroundColor: 'navy',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },

  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
