import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function SectionHeader({ title }) {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>{title}</Text>
      <Button mode="text" textColor="#1DB954" onPress={() => {}}>Todo</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { color: 'white', fontWeight: 'bold' },
});