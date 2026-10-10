import React, { createContext, useContext, useMemo, useState } from 'react';

const PlaylistContext = createContext(null);

export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);

  const createPlaylist = (name) => {
    const normalizedName = name.trim();
    if (!normalizedName) {
      throw new Error('Escribe un nombre para la playlist.');
    }

    const playlist = {
      id: `playlist-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: normalizedName,
      songs: [],
    };

    setPlaylists((currentPlaylists) => [...currentPlaylists, playlist]);
    return playlist;
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((currentPlaylists) =>
      currentPlaylists.map((playlist) => {
        if (playlist.id !== playlistId || playlist.songs.some((item) => item.id === song.id)) {
          return playlist;
        }

        return { ...playlist, songs: [...playlist.songs, song] };
      })
    );
  };

  const value = useMemo(
    () => ({ playlists, createPlaylist, addSongToPlaylist }),
    [playlists]
  );

  return <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>;
}

export function usePlaylists() {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylists debe utilizarse dentro de PlaylistProvider.');
  }
  return context;
}
