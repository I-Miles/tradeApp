import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';

const CheckoutScreen = ({ route, navigation }) => {
  const { products } = route.params;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(products);
  }, [products]);

  const removeFromCart = (product) => {
    setCart(prevCart => prevCart.filter(item => item !== product));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const handleFinalizePurchase = () => {
    navigation.navigate('Confirmation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{`R$${item.price.toFixed(2)}`}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item)}>
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => `${item.name}-${index}`}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {`R$${calculateTotalPrice()}`}</Text>
      </View>
      <Button
        title="Comprar mais"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Finalizar Compra"
        onPress={handleFinalizePurchase}
        color="#004AAD"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E5E8B',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemName: {
    fontSize: 16,
    color:'white'
  },
  itemPrice: {
    fontSize: 16,
    color: 'white',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalContainer: {
    marginVertical: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
});

export default CheckoutScreen;
