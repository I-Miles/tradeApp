import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CarTable = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.galleryTitle, styles.centerText]}>
        Tabela de carros esportivos
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Tipo</Text>
          <Text style={styles.tableHeader}>Cor</Text>
          <Text style={styles.tableHeader}>Ano</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Porsche 911</Text>
          <Text style={styles.tableCell}>Vermelho</Text>
          <Text style={styles.tableCell}>2022</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Ferrari</Text>
          <Text style={styles.tableCell}>Amarelo</Text>
          <Text style={styles.tableCell}>2021</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Lamborghini Huracán</Text>
          <Text style={styles.tableCell}>Verde</Text>
          <Text style={styles.tableCell}>2023</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  galleryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  centerText: {
    textAlign: 'center',
  },
  table: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
  },
});

export default CarTable;
