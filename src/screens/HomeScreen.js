import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import HomeHeader from '../components/home/HomeHeader';
import CategoryChips from '../components/home/CategoryChips';
import SectionHeader from '../components/home/SectionHeader';
import SongCard from '../components/home/SongCard';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HomeHeader />
      
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Selecciona</Text>
        <CategoryChips />

        <SectionHeader title="Canciones Populares" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <SongCard 
            image="https://picsum.photos/200" 
            title="Starboy" 
            artist="The Weeknd" 
            onPress={() => navigation.navigate('NowPlaying')} 
          />
          <SongCard 
            image="https://picsum.photos/201" 
            title="Superman" 
            artist="Eminem" 
            onPress={() => navigation.navigate('NowPlaying')} 
          />
          <SongCard 
            image="https://picsum.photos/202" 
            title="We Don't Talk" 
            artist="Kyuhyun" 
            onPress={() => navigation.navigate('NowPlaying')} 
          />
        </ScrollView>

        <SectionHeader title="Nueva Colección" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  scroll: { padding: 16, paddingBottom: 100 }, 
  sectionTitle: { color: 'white', fontWeight: 'bold', marginBottom: 5 },
  horizontalScroll: { marginBottom: 20 },
});