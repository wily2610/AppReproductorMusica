import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { PlaylistProvider } from './src/context/PlaylistContext';
import { AudioPlayerProvider } from './src/context/AudioPlayerContext';

export default function App() {
  return (
    <PaperProvider>
      <PlaylistProvider>
        <AudioPlayerProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AudioPlayerProvider>
      </PlaylistProvider>
    </PaperProvider>
  );
}