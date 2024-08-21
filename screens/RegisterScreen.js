import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const formatPhoneNumber = (number) => {
    const cleaned = ('' + number).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return number;
  };

  const handlePhoneChange = (text) => {
    setPhone(formatPhoneNumber(text));
  };

  const handleRegister = async () => {
    if (!name || !surname || !email || !phone || !username || !password) {
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

    try {
      const newUser = { name, surname, email, phone, username, password };
      let users = await AsyncStorage.getItem('users');
      users = users ? JSON.parse(users) : [];
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      navigation.navigate('LoOn');
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
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={handlePhoneChange}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
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
    color: '#00000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
