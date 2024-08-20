import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        let storedUsers = await AsyncStorage.getItem('users');
        storedUsers = storedUsers ? JSON.parse(storedUsers) : [];
        setUsers(storedUsers);
      } catch (error) {
        console.error('Failed to load users', error);
        Alert.alert('Error', 'Ocorreu um erro ao carregar os usuários.');
      }
    };

    loadUsers();
  }, []);

  const showUsersJson = () => {
    const json = JSON.stringify(users, null, 2);
    Alert.alert('Dados dos Usuários', json);
  };

  const handleDelete = async (index) => {
    try {
      const newUsers = users.filter((_, i) => i !== index);
      setUsers(newUsers);
      await AsyncStorage.setItem('users', JSON.stringify(newUsers));
    } catch (error) {
      console.error('Failed to delete user', error);
      Alert.alert('Error', 'Ocorreu um erro ao excluir o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.userItem}>
            <Text>{item.name} {item.surname}</Text>
      
            <View style={styles.buttonContainer}>
              <Button title="Excluir" onPress={() => handleDelete(index)} />
            </View>
          </View>
        )}
      />
      <Button title="Exibir JSON" onPress={showUsersJson} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F44336',
  },
  userItem: {
    padding: 20,
    marginVertical: 8,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ListScreen;
