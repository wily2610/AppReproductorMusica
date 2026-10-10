import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Divider, Text } from 'react-native-paper';
import PlaylistSongRow from '../components/playlist/PlaylistSongRow';
import { usePlaylists } from '../context/PlaylistContext';

export default function PlaylistDetailScreen({ navigation, route }) {
  const { playlists } = usePlaylists();
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
        <Appbar.Content title={playlist.name} titleStyle={styles.headerTitle} />
        <Appbar.Action
          icon="plus"
          iconColor="white"
          onPress={() => navigation.navigate('PlaylistSongs', { playlistId: playlist.id })}
          accessibilityLabel="Agregar canciones"
        />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.count}>
          {playlist.songs.length} {playlist.songs.length === 1 ? 'canción' : 'canciones'}
        </Text>
        {playlist.songs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Esta playlist todavía está vacía.</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('PlaylistSongs', { playlistId: playlist.id })}
              buttonColor="#1DB954"
              textColor="black"
            >
              Agregar canciones
            </Button>
          </View>
        ) : (
          playlist.songs.map((song) => (
            <React.Fragment key={song.id}>
              <PlaylistSongRow
                song={song}
                added
                onAdd={() => {}}
                onPress={() => navigation.navigate('NowPlaying', { songId: song.id })}
              />
              <Divider style={styles.divider} />
            </React.Fragment>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { backgroundColor: '#121212' },
  headerTitle: { color: 'white' },
  content: { padding: 16, paddingBottom: 100 },
  count: { color: 'gray', marginBottom: 12 },
  divider: { backgroundColor: '#333' },
  emptyState: { alignItems: 'center', marginTop: 48 },
  emptyText: { color: 'gray', marginBottom: 20 },
});
