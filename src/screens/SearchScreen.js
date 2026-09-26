import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import GenreCard from '../components/search/GenreCard';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const genres = [
    { name: 'Hip Hop', color: '#E91E63' },
    { name: 'Electrónica', color: '#9C27B0' },
    { name: 'Pop', color: '#3F51B5' },
    { name: 'Fiesta', color: '#00BCD4' },
    { name: 'Blues', color: '#4CAF50' },
    { name: 'Tecno', color: '#FF9800' }
  ];

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar canción..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={{ color: 'white' }}
        iconColor="white"
        placeholderTextColor="gray"
      />
      
      <Text variant="titleLarge" style={styles.title}>Explora SoundCloud</Text>
      
      <ScrollView contentContainerStyle={styles.grid}>
        {genres.map((genre, index) => (
          <GenreCard key={index} genre={genre.name} color={genre.color} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16, paddingTop: 40 },
  searchbar: { backgroundColor: '#2a2a2a', marginBottom: 20 },
  title: { color: 'white', marginBottom: 15, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: 100 },
});