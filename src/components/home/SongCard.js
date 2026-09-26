import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function SongCard({ image, title, artist, onPress }) {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={{ uri: image }} style={styles.cover} />
      <Card.Content style={styles.content}>
        <Text variant="titleMedium" style={styles.title} numberOfLines={1}>{title}</Text>
        <Text variant="bodySmall" style={styles.artist} numberOfLines={1}>{artist}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { width: 150, marginRight: 15, backgroundColor: '#1e1e1e' },
  cover: { height: 150 },
  content: { padding: 10 },
  title: { color: 'white', fontWeight: 'bold' },
  artist: { color: 'gray' },
});