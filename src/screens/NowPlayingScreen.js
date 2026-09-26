import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Appbar, Text, IconButton, Button } from 'react-native-paper';
import PlayerProgress from '../components/player/PlayerProgress';
import PlayerControls from '../components/player/PlayerControls';

export default function NowPlayingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#121212' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content 
          title="Playing From Album" 
          subtitle="Starboy" 
          titleStyle={{ color: 'white', fontSize: 14 }} 
          subtitleStyle={{ color: 'gray' }} 
        />
        <Appbar.Action icon="dots-vertical" iconColor="white" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.content}>
        <Image source={{ uri: 'https://picsum.photos/300' }} style={styles.albumArt} />
        
        <View style={styles.titleRow}>
          <View>
            <Text variant="headlineSmall" style={styles.songTitle}>Starboy Remix</Text>
            <Text variant="bodyLarge" style={styles.artist}>The Weeknd</Text>
          </View>
          <IconButton icon="heart-outline" size={30} iconColor="white" onPress={() => {}} />
        </View>

        <PlayerProgress />
        <PlayerControls />

        <Button mode="text" textColor="gray" onPress={() => {}} style={{ marginTop: 20 }}>
          LIRICS
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { flex: 1, padding: 20, alignItems: 'center' },
  albumArt: { width: 300, height: 300, borderRadius: 10, marginBottom: 30 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' },
  songTitle: { color: 'white', fontWeight: 'bold' },
  artist: { color: 'gray' },
});