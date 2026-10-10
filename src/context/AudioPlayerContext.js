import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { songs } from '../data/songs';

const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
  const player = useAudioPlayer(null, { updateInterval: 500 });
  const status = useAudioPlayerStatus(player);
  const [currentSong, setCurrentSong] = useState(null);
  const [isShuffleEnabled, setIsShuffleEnabled] = useState(false);
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'doNotMix',
    }).catch((error) => {
      console.warn('No se pudo configurar la sesión de audio.', error);
    });
  }, []);

  const playSong = useCallback((song) => {
    if (!song?.audio) {
      throw new Error('Esta canción no tiene una fuente de audio disponible.');
    }

    if (currentSong?.id !== song.id) {
      player.replace(song.audio);
      setCurrentSong(song);
      player.setActiveForLockScreen(true, {
        title: song.title,
        artist: song.artist,
        artworkUrl: song.image,
      });
    }

    player.play();
  }, [currentSong, player]);

  const togglePlayPause = useCallback(() => {
    if (!currentSong) return;
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  }, [currentSong, player, status.playing]);

  const seekTo = useCallback((seconds) => player.seekTo(seconds), [player]);

  const playRelativeSong = useCallback((offset) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    if (isShuffleEnabled) {
      const availableSongs = songs.filter((song) => song.id !== currentSong?.id);
      playSong(availableSongs[Math.floor(Math.random() * availableSongs.length)]);
      return;
    }
    const nextIndex = currentIndex < 0
      ? 0
      : (currentIndex + offset + songs.length) % songs.length;
    playSong(songs[nextIndex]);
  }, [currentSong, isShuffleEnabled, playSong]);

  useEffect(() => {
    if (status.didJustFinish && currentSong) {
      if (isRepeatEnabled) {
        player.seekTo(0);
        player.play();
      } else {
        playRelativeSong(1);
      }
    }
  }, [currentSong, isRepeatEnabled, playRelativeSong, player, status.didJustFinish]);

  const value = useMemo(
    () => ({
      currentSong,
      isPlaying: status.playing,
      currentTime: status.currentTime,
      duration: status.duration,
      playSong,
      togglePlayPause,
      seekTo,
      playNext: () => playRelativeSong(1),
      playPrevious: () => playRelativeSong(-1),
      isShuffleEnabled,
      isRepeatEnabled,
      toggleShuffle: () => setIsShuffleEnabled((enabled) => !enabled),
      toggleRepeat: () => setIsRepeatEnabled((enabled) => !enabled),
      player,
    }),
    [
      currentSong,
      status.playing,
      status.currentTime,
      status.duration,
      player,
      playRelativeSong,
      isShuffleEnabled,
      isRepeatEnabled,
    ]
  );

  return <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>;
}

export function useAudioPlayerContext() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayerContext debe utilizarse dentro de AudioPlayerProvider.');
  }
  return context;
}
