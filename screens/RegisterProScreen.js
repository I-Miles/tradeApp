import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [descri, setDescri] = useState('');
  const [quanti, setQuanti] = useState('');
  const [forn, setForn] = useState(''); 
  const [phone, setPhone] = useState('');

  const formatCNPJ = (value) => {
    value = value.replace(/\D/g, ''); 
    if (value.length <= 14) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
      value = value.replace(/(\d{2})$/, '-$1');
    }
    return value;
  };

  const handleRegister = async () => {
    if (!name || !descri || !quanti || !forn|| !phone) {
      Alert.alert('Validation Error', 'Please fill all the fields.');
      return;
    }

    const phonePattern = /^[0-9]{10,15}$/; 
    if (!phonePattern.test(phone)) {
      Alert.alert('Validation Error', 'Please enter a valid phone number.');
      return;
    }

   try {
      const newUser = { name, descri, quanti, forn, phone };
      let users = await AsyncStorage.getItem('users');
      users = users ? JSON.parse(users) : [];
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      navigation.navigate('Home');
    } catch (error) {
      console.error('Failed to register user', error);
      Alert.alert('Registration Error', 'An error occurred while registering the user.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/pictures/trade.agile.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder='Nome'
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder='Descrição'
        value={descri}
        onChangeText={setDescri}
      />
      <TextInput
        style={styles.input}
        placeholder='Quantidade'
        value={quanti}
        onChangeText={setQuanti}
        keyboardType='phone-pad'
      />
      <TextInput
        style={styles.input}
        placeholder='Fornecedor'
        value={forn}
        onChangeText={setForn}
      />
      <TextInput
        style={styles.input}
        placeholder='Telefone'
        value={phone}
        onChangeText={setPhone}
        keyboardType='phone-pad'
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E5E8B',
    alignItems: 'center',
  },

  logo: {
    width: 160,
    height: 120,
  },

  input: {
    width: '100%',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  button: {
    backgroundColor: '#FFDE59',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
