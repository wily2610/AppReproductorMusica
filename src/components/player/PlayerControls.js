import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useAudioPlayerContext } from '../../context/AudioPlayerContext';

export default function PlayerControls() {
  const {
    isPlaying,
    togglePlayPause,
    playNext,
    playPrevious,
    isShuffleEnabled,
    isRepeatEnabled,
    toggleShuffle,
    toggleRepeat,
  } = useAudioPlayerContext();

  return (
    <View style={styles.container}>
      <IconButton icon="shuffle" size={30} iconColor={isShuffleEnabled ? '#1DB954' : 'white'} onPress={toggleShuffle} />
      <IconButton icon="skip-previous" size={40} iconColor="white" onPress={playPrevious} />
      <IconButton icon={isPlaying ? 'pause-circle' : 'play-circle'} size={70} iconColor="#1DB954" onPress={togglePlayPause} />
      <IconButton icon="skip-next" size={40} iconColor="white" onPress={playNext} />
      <IconButton icon="repeat" size={30} iconColor={isRepeatEnabled ? '#1DB954' : 'white'} onPress={toggleRepeat} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
});