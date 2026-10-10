import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import PlaylistCard from '../components/playlist/PlaylistCard';
import { usePlaylists } from '../context/PlaylistContext';

export default function LibraryScreen({ navigation }) {
  const { playlists } = usePlaylists();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Tu biblioteca" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <Button
          mode="contained"
          icon="plus"
          onPress={() => navigation.navigate('CreatePlaylist')}
          buttonColor="#1DB954"
          textColor="black"
          style={styles.createButton}
        >
          Nueva playlist
        </Button>

        {playlists.length === 0 ? (
          <View style={styles.emptyState}>
            <Text variant="titleMedium" style={styles.emptyTitle}>
              Aún no tienes playlists
            </Text>
            <Text style={styles.emptyText}>
              Crea una playlist para guardar tus canciones favoritas.
            </Text>
          </View>
        ) : (
          playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onPress={() => navigation.navigate('PlaylistDetail', { playlistId: playlist.id })}
            />
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
  createButton: { marginBottom: 24 },
  emptyState: { alignItems: 'center', marginTop: 48, paddingHorizontal: 20 },
  emptyTitle: { color: 'white', marginBottom: 8 },
  emptyText: { color: 'gray', textAlign: 'center' },
});
