import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';

export default function PlayerProgress() {
  return (
    <View style={styles.container}>
      <ProgressBar progress={0.3} color="#1DB954" style={styles.bar} />
      <View style={styles.timeRow}>
        <Text style={styles.time}>1:37</Text>
        <Text style={styles.time}>4:21</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: 20 },
  bar: { height: 4, borderRadius: 2, backgroundColor: '#333' },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  time: { color: 'gray', fontSize: 12 },
});