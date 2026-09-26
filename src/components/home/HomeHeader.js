import React from 'react';
import { Appbar, IconButton } from 'react-native-paper';

export default function HomeHeader() {
  return (
    <Appbar.Header style={{ backgroundColor: '#121212' }}>
      <Appbar.Content title="Hola, John" titleStyle={{ color: 'white' }} />
      <IconButton icon="bell-outline" iconColor="white" size={24} onPress={() => {}} />
      <IconButton icon="account-circle-outline" iconColor="white" size={24} onPress={() => {}} />
    </Appbar.Header>
  );
}