import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

export default function CategoryChips() {
  const categories = ['Todas', 'Hip Hop', 'Fiesta', 'Pop', 'Rock'];
  const [selected, setSelected] = React.useState('Todas');

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {categories.map((cat) => (
        <Chip
          key={cat}
          selected={selected === cat}
          onPress={() => setSelected(cat)}
          style={[styles.chip, selected === cat && { backgroundColor: '#1DB954' }]}
          textStyle={{ color: selected === cat ? 'black' : 'white' }}
        >
          {cat}
        </Chip>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  chip: { marginRight: 8, backgroundColor: '#2a2a2a' },
});