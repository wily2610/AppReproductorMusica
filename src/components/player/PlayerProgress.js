import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import { useAudioPlayerContext } from '../../context/AudioPlayerContext';

export default function PlayerProgress() {
  const { currentTime, duration, seekTo } = useAudioPlayerContext();
  const [barWidth, setBarWidth] = React.useState(0);
  const progress = duration > 0 ? currentTime / duration : 0;
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Pressable
        onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
        onPress={(event) => {
          if (duration > 0 && barWidth > 0) {
            seekTo((event.nativeEvent.locationX / barWidth) * duration);
          }
        }}
      >
        <ProgressBar progress={progress} color="#1DB954" style={styles.bar} />
      </Pressable>
      <View style={styles.timeRow}>
        <Text style={styles.time}>{formatTime(currentTime)}</Text>
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: 20 },
  bar: { height: 4, borderRadius: 2, backgroundColor: '#333' },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  time: { color: 'gray', fontSize: 12 },
});