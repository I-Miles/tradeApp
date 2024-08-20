import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Modal, TouchableOpacity, FlatList } from 'react-native';

const menuItems = [
  { title: 'Home', ref: 'homeRef' },
  { title: 'Equipamentos', ref: 'equipmentsRef' },
  { title: 'Quem Somos ?', ref: 'aboutUsRef' },
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
        <Image source={require('../assets/pictures/logo.jpg')} style={styles.logo} />
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
        <Text style={styles.infoText}>
          Máquinas gráficas são ferramentas essenciais para a aplicação de tinta ou corante em superfícies, usadas em diversas áreas como arte, impressão e educação. Elas podem ser manuais ou automatizadas e são comuns em estúdios de arte, escolas, escritórios, laboratórios e fábricas de impressão, facilitando a reprodução de imagens, textos e materiais promocionais.
        </Text>
      </View>
      <View ref={aboutUsRef} style={styles.footer}>
        <Image source={require('../assets/pictures/logo.jpg')} style={styles.footerLogo} />
        <Text style={styles.footerText}>A GRAPH.agile é líder no mercado, oferecendo soluções de impressão de alta qualidade e serviços completos.</Text>
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
  // Seus estilos permanecem aqui gay
  container: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },

  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: 20,
    backgroundColor: '#161616', 
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  logo: {
    width: 70, 
    height: 70, 
    marginHorizontal: 10,
    marginTop: 20, 
    borderRadius: 100,
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
    backgroundColor: 'white',
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
    backgroundColor: 'navy',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  productsContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
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

  infoText: {
    fontSize: 16,
    color: 'black',
    marginVertical: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
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
    backgroundColor: '#161616', 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  footerLogo: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  footerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
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
    color: '#fff',
  },

  modalImage: {
    width: 300,
    height: 300,
  },
});
