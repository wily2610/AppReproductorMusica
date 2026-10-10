import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import HomeScreen from '../screens/HomeScreen';
import NowPlayingScreen from '../screens/NowPlayingScreen';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import CreatePlaylistScreen from '../screens/CreatePlaylistScreen';
import PlaylistSongsScreen from '../screens/PlaylistSongsScreen';
import PlaylistDetailScreen from '../screens/PlaylistDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NowPlaying" component={NowPlayingScreen} />
    </Stack.Navigator>
  );
}

function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
      <Stack.Screen name="CreatePlaylist" component={CreatePlaylistScreen} />
      <Stack.Screen name="PlaylistSongs" component={PlaylistSongsScreen} />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
      <Stack.Screen name="NowPlaying" component={NowPlayingScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          borderRadius: 30, 
          backgroundColor: '#1e1e1e',
          height: 60,
          borderTopWidth: 0,
          elevation: 5,
        },
        tabBarActiveTintColor: '#1DB954', 
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false, 
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={HomeStack} 
        options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} /> }}
      />
      <Tab.Screen 
        name="Buscar" 
        component={SearchScreen} 
        options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="magnify" color={color} size={size} /> }}
      />
      <Tab.Screen 
        name="Biblioteca" 
        component={LibraryStack}
        options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="library-shelves" color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}