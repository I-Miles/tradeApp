import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');


  const formatCNPJ = (value) => {
    value = value.replace(/\D/g, ''); 
    if (value.length <= 14) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return value;
  };

  const formatPhoneNumber = (value) => {
    value = value.replace(/\D/g, ''); 
    if (value.length > 11) {
      value = value.substring(0, 11); 
    }
    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{0,5})(\d{0,4})/, '($1) $2-$3');
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleCnpjChange = (text) => {
    const formattedCNPJ = formatCNPJ(text);
    if (formattedCNPJ.length <= 18) {
      setCnpj(formattedCNPJ); 
    }
  };

  const handlePhoneChange = (text) => {
    setPhone(formatPhoneNumber(text));
  };

  const handleRegister = async () => {
    if (!name || !cnpj || !email || !phone ) {
      Alert.alert('Validation Error', 'Please fill all the fields.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email.');
      return;
    }

    const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/; 
    if (!phonePattern.test(phone)) {
      Alert.alert('Validation Error', 'Please enter a valid phone number.');
      return;
    }

    const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    if (!cnpjPattern.test(cnpj)) {
      Alert.alert('Validation Error', 'Please enter a valid CNPJ.');
      return;
    }

    try {
      const newUser = { name, cnpj, email, phone };
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
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder='CNPJ'
        value={cnpj}
        onChangeText={handleCnpjChange}
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        placeholder='Telefone'
        value={phone}
        onChangeText={handlePhoneChange}
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
    width: 190,
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
