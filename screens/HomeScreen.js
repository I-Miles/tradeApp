import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Modal, TouchableOpacity, FlatList, Button } from 'react-native';

const menuItems = [
  { title: 'Destaques'},
  { title: 'Equipamentos'},
  { title: 'Cadastro'},
];

const featuredItems = [
  { image: require('../assets/pictures/destaque1.jpg'), description: 'Transformardor trifásico', price: 'R$3.800,00' },
  { image: require('../assets/pictures/destaque2.jpg'), description: 'TROQUELADORA e REBOBINADEIRA', price: 'R$20.000,00' },
];

const products = [
  { image: require('../assets/pictures/produtos1.jpeg'), name: 'Solna 125 Plus', price: 8500.00 },
  { image: require('../assets/pictures/produtos2.jpeg'), name: 'Solna 132 60×80', price: 18500.00 },
  { image: require('../assets/pictures/produtos3.jpeg'), name: 'Solna 225 bicolor', price: 15000.00 },
  { image: require('../assets/pictures/produtos4.jpeg'), name: 'Ryoby 780E 4 ', price: 650000.00 },
  { image: require('../assets/pictures/produtos5.jpeg'), name: 'Sakurai 252E', price: 50000.00 },
  { image: require('../assets/pictures/produtos6.jpeg'), name: 'Sakurai 258 EP 2', price: 60000.00 },
  { image: require('../assets/pictures/produtos7.jpeg'), name: 'Sakurai 272', price: 120000.00 },
  { image: require('../assets/pictures/produtos8.jpeg'), name: 'Sakurai 272 ', price: 115000.00 },
];

const register = [
  { image: require('../assets/pictures/produtos2.jpeg'), name: 'Produtos', },
];

const registerforn = [
  { image: require('../assets/pictures/produtos2.jpeg'), name: 'Fornecedor' },
]


export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const scrollViewRef = useRef(null);
  const homeRef = useRef(null);
  const equipmentsRef = useRef(null);
  const aboutUsRef = useRef(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  const handleMenuItemPress = (ref) => {
    if (scrollViewRef.current && ref.current) {
      ref.current.measureLayout(
        scrollViewRef.current.getScrollResponder().getScrollableNode(),
        (x, y) => {
          scrollViewRef.current.scrollTo({ y, animated: true });
        }
      );
    }
  };

  const handleBuyButtonPress = (product) => {
    setSelectedProducts([...selectedProducts, product]);
    navigation.navigate('Checkout', { products: selectedProducts });
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  return (
    <ScrollView 
      ref={scrollViewRef}
      contentContainerStyle={styles.container}
    >
      <View ref={homeRef} style={styles.header}>
        <Image source={require('../assets/pictures/trade.agile.png')} style={styles.logo} />
        <FlatList
          data={menuItems}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.menuContainer}
          renderItem={({ item }) => (
            <View style={styles.menuItemContainer}>
              <TouchableOpacity onPress={() => handleMenuItemPress(item.ref)}>
                <Text style={styles.menuItem}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.title}
        />
      </View>
      <View ref={homeRef} style={styles.featuredContainer}>
        <Text style={styles.sectionTitle}>Destaques</Text>
        <View style={styles.featuredItemsWrapper}>
          {featuredItems.map((item, index) => (
            <View key={index} style={styles.featuredItemContainer}>
              <Image source={item.image} style={styles.featuredImage} />
              <View style={styles.featuredTextContainer}>
                <Text style={styles.featuredDescription}>{item.description}</Text>
                <Text style={styles.featuredPrice}>{item.price}</Text>
                
              </View>
            </View>
          ))}
        </View>
      </View>
      <View ref={equipmentsRef} style={styles.productsContainer}>
        <Text style={styles.sectionTitle}>Equipamentos</Text>
        <FlatList
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.productItemContainer}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productTextContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{`R$${item.price.toFixed(2)}`}</Text>
                <TouchableOpacity 
                  style={styles.buyButton} 
                  onPress={() => handleBuyButtonPress(item)}
                >
                  <Text style={styles.buyButtonText}>Comprar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    <View style={styles.center}>
      <View ref={equipmentsRef} style={styles.productsContainer}>
        <Text style={styles.sectionTitle}>Cadastros</Text>
        <FlatList
          data={register}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.productItemContainer}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productTextContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <TouchableOpacity 
                  style={styles.buyButton} 
                  onPress={() =>navigation.navigate('ProForn')}
                >
                  <Text style={styles.buyButtonText}>Cadastrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
       </View>
       <View ref={equipmentsRef} style={styles.productsContainer}>
        <FlatList
          data={registerforn}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.productItemContainer}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productTextContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <TouchableOpacity 
                  style={styles.buyButton} 
                  onPress={() =>navigation.navigate('forn')}
                >
                  <Text style={styles.buyButtonText}>Cadastrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
       </View>
    </View>
      <TouchableOpacity 
                  style={styles.buyButton} 
                  onPress={() =>navigation.navigate('List')}
                >
                  <Text style={styles.buyButtonText}>Demostrar tabelas</Text>
                </TouchableOpacity>
      <View ref={aboutUsRef} style={styles.footer}>
        <Image source={require('../assets/pictures/trade.agile.png')} style={styles.footerLogo} />
      </View>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Image style={styles.modalImage} source={selectedImage} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#1E5E8B',
  },

  center: {
    marginLeft: 14,
    padding: 15,
  },

  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: 20,
    backgroundColor: '#1E5E8B', 
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  logo: {
    width: 90, 
    height: 70,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  menuContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
  },

  menuItemContainer: {
    paddingHorizontal: 10, 
  },
  
  menuItem: {
    color: 'white',
    fontWeight: 'bold', 
    paddingTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },

  featuredContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#1E5E8B',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    color:'#FFFFFF',
    textAlign: 'center'
  },

  featuredItemsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  featuredItemContainer: {
    flex: 1,
    marginHorizontal: 10, 
    position: 'relative',
  },

  featuredImage: {
    width: '100%',
    height: 200,
    borderRadius: 15, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  featuredTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  featuredDescription: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },

  featuredPrice: {
    color: 'white',
    fontSize: 18,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },

  buyButton: {
    backgroundColor: '#FFDE59',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  buyButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },

  productsContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#1E5E8B',
    justifyContent: 'center',
  },

  productItemContainer: {
    marginRight: 15, 
    position: 'relative',
  },

  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  productTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  productName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },

  productPrice: {
    color: 'white',
    fontSize: 18,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  footer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1E5E8B', 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1E5E8B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  footerLogo: {
    width: 70,
    height: 50,
    marginRight: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },

  closeButtonText: {
    fontSize: 24,
    color: '#000000',
  },

  modalImage: {
    width: 300,
    height: 300,
  },
});
