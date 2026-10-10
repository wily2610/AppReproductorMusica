import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import PlaylistSongRow from '../components/playlist/PlaylistSongRow';
import { songs } from '../data/songs';
import { usePlaylists } from '../context/PlaylistContext';

export default function PlaylistSongsScreen({ navigation, route }) {
  const { playlists, addSongToPlaylist } = usePlaylists();
  const playlist = playlists.find((item) => item.id === route.params.playlistId);

  if (!playlist) {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
          <Appbar.Content title="Playlist no encontrada" titleStyle={styles.headerTitle} />
        </Appbar.Header>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Agregar canciones" subtitle={playlist.name} titleStyle={styles.headerTitle} subtitleStyle={styles.subtitle} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.helpText}>Selecciona las canciones que quieres guardar.</Text>
        {songs.map((song) => (
          <PlaylistSongRow
            key={song.id}
            song={song}
            added={playlist.songs.some((item) => item.id === song.id)}
            onAdd={() => addSongToPlaylist(playlist.id, song)}
          />
        ))}
        <Button
          mode="contained"
          onPress={() => navigation.replace('PlaylistDetail', { playlistId: playlist.id })}
          buttonColor="#1DB954"
          textColor="black"
          style={styles.doneButton}
        >
          Ver playlist
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { backgroundColor: '#121212' },
  headerTitle: { color: 'white' },
  subtitle: { color: 'gray' },
  content: { padding: 16, paddingBottom: 100 },
  helpText: { color: 'gray', marginBottom: 12 },
  doneButton: { marginTop: 20 },
});
