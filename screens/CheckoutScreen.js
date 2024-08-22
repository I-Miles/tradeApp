import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert } from 'react-native';

const CheckoutScreen = ({ route, navigation }) => {
  const { products } = route.params;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(products);
  }, [products]);

  const updateQuantity = (productId, change) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

  const handleFinalizePurchase = () => {
    Alert.alert(
      "Confirmação de Compra",
      "Deseja finalizar a compra?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Confirmar", 
          onPress: () => {
            
            setCart([]); 
            navigation.navigate('Confirmation'); 
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{`R$${(item.price * item.quantity).toFixed(2)}`}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, -1)}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, 1)}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {`R$${calculateTotalPrice()}`}</Text>
      </View>
      <Button
        title="Selecionar outro Produto"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Finalizar Compra"
        onPress={handleFinalizePurchase}
        color="#004AAD"
        disabled={cart.length === 0}
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#004AAD',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: 'white',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
  },
});

export default CheckoutScreen;
