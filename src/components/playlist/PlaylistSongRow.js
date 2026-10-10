import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, IconButton, List } from 'react-native-paper';

export default function PlaylistSongRow({ song, added, onAdd, onPress }) {
  return (
    <List.Item
      title={song.title}
      description={song.artist}
      titleStyle={styles.title}
      descriptionStyle={styles.description}
      onPress={onPress}
      left={() => <Avatar.Image size={48} source={{ uri: song.image }} />}
      right={() => (
        <IconButton
          icon={added ? 'check' : 'plus'}
          iconColor={added ? '#1DB954' : 'white'}
          onPress={onAdd}
          disabled={added}
          accessibilityLabel={added ? 'Canción agregada' : `Agregar ${song.title}`}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  title: { color: 'white' },
  description: { color: 'gray' },
});
