import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, HelperText, TextInput } from 'react-native-paper';
import { usePlaylists } from '../context/PlaylistContext';

export default function CreatePlaylistScreen({ navigation }) {
  const { createPlaylist } = usePlaylists();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    try {
      const playlist = createPlaylist(name);
      setError('');
      navigation.replace('PlaylistSongs', { playlistId: playlist.id });
    } catch (creationError) {
      setError(creationError.message);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Nueva playlist" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      <View style={styles.content}>
        <TextInput
          mode="outlined"
          label="Nombre de la playlist"
          value={name}
          onChangeText={(value) => {
            setName(value);
            if (error) setError('');
          }}
          textColor="white"
          activeOutlineColor="#1DB954"
          outlineColor="#555"
          style={styles.input}
          autoFocus
        />
        <HelperText type="error" visible={Boolean(error)}>
          {error}
        </HelperText>
        <Button mode="contained" onPress={handleCreate} buttonColor="#1DB954" textColor="black">
          Crear y agregar canciones
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { backgroundColor: '#121212' },
  headerTitle: { color: 'white' },
  content: { padding: 20 },
  input: { backgroundColor: '#1e1e1e', marginBottom: 4 },
});
