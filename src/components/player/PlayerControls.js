import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function PlayerControls() {
  return (
    <View style={styles.container}>
      <IconButton icon="shuffle" size={30} iconColor="white" onPress={() => {}} />
      <IconButton icon="skip-previous" size={40} iconColor="white" onPress={() => {}} />
      <IconButton icon="play-circle" size={70} iconColor="#1DB954" onPress={() => {}} />
      <IconButton icon="skip-next" size={40} iconColor="white" onPress={() => {}} />
      <IconButton icon="repeat" size={30} iconColor="white" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
});