import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function PlaylistCard({ playlist, onPress }) {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title} numberOfLines={1}>
          {playlist.name}
        </Text>
        <Text variant="bodyMedium" style={styles.count}>
          {playlist.songs.length} {playlist.songs.length === 1 ? 'canción' : 'canciones'}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, backgroundColor: '#1e1e1e' },
  title: { color: 'white', fontWeight: 'bold' },
  count: { color: 'gray', marginTop: 4 },
});
