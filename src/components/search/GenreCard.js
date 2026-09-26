import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function GenreCard({ genre, color }) {
  return (
    <Card style={[styles.card, { backgroundColor: color }]}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.text}>{genre}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { width: '48%', height: 90, marginBottom: 15, justifyContent: 'center' },
  text: { color: 'white', fontWeight: 'bold' },
});