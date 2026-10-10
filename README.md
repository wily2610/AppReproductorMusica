# proyecto AppMusica 

## prompt utilizado
Actúa como un desarrollador senior experto en React Native. Estoy trabajando en mi aplicación de música existente (AppMusica) y necesito implementar una nueva funcionalidad de "Listas de reproducción personalizadas" (Playlists).

Revisa la estructura de mi proyecto en @workspace para entender cómo están organizados mis archivos actuales (como AppNavigator.js, SongCard.js, GenreCard.js, etc.).

El objetivo es implementar una funcionalidad que permita:
1. Crear una nueva playlist.
2. Asignarle un nombre.
3. Agregar canciones existentes de la aplicación.
4. Visualizar la playlist creada.
5. Mostrar las canciones que contiene.
6. Utilizar React Native Paper para toda la interfaz de usuario.

Restricciones importantes (CRÍTICO):
- NO utilizar una API externa.
- NO instalar nuevas librerías (cero dependencias nuevas).
- Reutilizar los componentes y datos existentes en mi aplicación.
- NO eliminar funcionalidades actuales.
- La playlist debe conservarse mientras el usuario navega por la aplicación (necesito una estrategia de estado global sin librerías externas).

Por favor, genera un plan de arquitectura paso a paso detallado. Indícame exactamente:
- Qué archivos debo crear (nombres y rutas sugeridas).
- Qué archivos debo modificar.
- Cómo manejar el estado global (ej. usando React Context API nativo).
- Cómo integrar las pantallas en mi AppNavigator.js actual.
- Qué componentes de React Native Paper específicos debo usar para cada paso.

No escribas el código todavía, solo dame el plan estructurado para revisarlo.


## plan propuesto
# Plan: Playlists personalizadas para AppMusica

## Problema y enfoque

La aplicación actualmente tiene canciones definidas directamente en `HomeScreen`, navegación basada en React Navigation y componentes visuales con React Native Paper, pero no tiene un modelo compartido para conservar playlists. Se añadirá soporte para múltiples playlists locales usando React Context API nativo, sin API externa ni dependencias nuevas. La misma colección de canciones reutilizable alimentará Inicio y el flujo de agregar canciones, mientras el contexto conservará las playlists durante toda la sesión de navegación.

## Alcance confirmado

- Se podrán crear múltiples playlists.
- Cada playlist tendrá nombre y lista de canciones.
- Las playlists vivirán en memoria mientras la aplicación siga abierta; no se añadirá persistencia en disco porque la restricción pide una solución global sin librerías nuevas y no solicita persistencia entre reinicios.
- Se conservará la navegación y funcionalidad actuales; Biblioteca dejará de ser un alias visual de Inicio y mostrará las playlists.
- No se implementará reproducción real de audio ni API externa como parte de esta funcionalidad.

## Archivos a crear

1. `src/data/songs.js`
   - Extraer la colección actual de canciones a objetos con un identificador estable, título, artista e imagen.
   - Servir como fuente única para Inicio y para seleccionar canciones al crear/editar una playlist.

2. `src/context/PlaylistContext.js`
   - Crear `PlaylistContext` y `PlaylistProvider` con React Context API.
   - Exponer `playlists`, `createPlaylist`, `addSongToPlaylist` y, si el diseño lo requiere, operaciones de eliminación.
   - Garantizar nombres válidos, IDs de playlist únicos y evitar canciones duplicadas dentro de una playlist.
   - Mantener actualizaciones inmutables para que las pantallas se actualicen correctamente.

3. `src/screens/LibraryScreen.js`
   - Reemplazar el uso de `HomeScreen` en el tab Biblioteca.
   - Mostrar las playlists creadas y un control para crear una nueva.
   - Usar estados de carga/vacío apropiados para la biblioteca.

4. `src/screens/CreatePlaylistScreen.js`
   - Mostrar un formulario para introducir el nombre.
   - Validar nombre vacío y evitar crear playlists inválidas.
   - Después de crear, navegar a la selección de canciones o directamente al detalle según el flujo definido.

5. `src/screens/PlaylistSongsScreen.js`
   - Mostrar las canciones existentes con opción de agregarlas a la playlist seleccionada.
   - Indicar visualmente las canciones que ya pertenecen a la playlist.
   - Mantener disponible la navegación hacia el detalle de la playlist.

6. `src/screens/PlaylistDetailScreen.js`
   - Mostrar el nombre de la playlist y sus canciones.
   - Reutilizar `SongCard` o extraer una variante reutilizable si el layout de lista requiere otro formato.
   - Mostrar estado vacío cuando aún no tenga canciones.

## Archivos a modificar

1. `App.js`
   - Envolver `NavigationContainer` y `AppNavigator` con `PlaylistProvider`, para que todas las tabs y stacks compartan el mismo estado.

2. `src/navigation/AppNavigator.js`
   - Importar `LibraryScreen`, `CreatePlaylistScreen`, `PlaylistSongsScreen` y `PlaylistDetailScreen`.
   - Crear un stack para Biblioteca que incluya:
     - `LibraryScreen`
     - `CreatePlaylistScreen`
     - `PlaylistSongsScreen`
     - `PlaylistDetailScreen`
   - Mantener intacto el stack de Inicio y la pantalla de reproducción.
   - Configurar los parámetros de navegación necesarios para identificar la playlist seleccionada.

3. `src/screens/HomeScreen.js`
   - Sustituir la colección local duplicada por la importación desde `src/data/songs.js`.
   - Mantener el carrusel, títulos, navegación a `NowPlaying` y apariencia actuales.

4. `src/components/home/SongCard.js`
   - Solo modificar si hace falta aceptar metadatos completos o una acción secundaria para agregar una canción.
   - Conservar su uso actual en Inicio para no alterar la UX existente.

5. `src/components/search/GenreCard.js`
   - No se requiere modificación funcional; se conservará para el flujo de búsqueda.
   - Solo se tocaría si se decide enlazar géneros con selección de canciones, fuera del alcance actual.

6. `src/components/home/SectionHeader.js` y/o componentes nuevos de playlist
   - Conectar el botón “Todo” únicamente si resulta necesario para acceder a la biblioteca.
   - Preferir crear componentes específicos bajo `src/components/playlist/` si hay UI repetida, por ejemplo `PlaylistCard` y `PlaylistSongRow`, sin sobrecargar `SongCard`.

## Arquitectura de estado

El árbol de proveedores quedará conceptualmente así:

```text
PaperProvider
└── PlaylistProvider
    └── NavigationContainer
        └── AppNavigator
```

El contexto mantendrá una estructura similar a:

```text
playlists: [
  {
    id: string,
    name: string,
    songs: Song[]
  }
]
```

Las acciones deberán:

- Crear playlists con un ID generado localmente.
- Rechazar nombres vacíos después de normalizar espacios.
- Agregar solo canciones que existan en `songs.js`.
- No agregar dos veces la misma canción a la misma playlist.
- Actualizar el contexto de forma inmutable.
- Hacer explícitos los errores de validación mediante mensajes de UI con React Native Paper.

No se usará estado global mutable ni se copiará el estado entre pantallas mediante props salvo para parámetros de navegación como `playlistId`.

## Flujo de navegación

```text
Biblioteca
├── Crear playlist
│   └── Seleccionar canciones
│       └── Detalle de playlist
└── Seleccionar una playlist
    └── Detalle de playlist
        └── Agregar canciones
            └── Seleccionar canciones
```

El ID de la playlist viajará mediante React Navigation; los datos y mutaciones se resolverán siempre desde `PlaylistContext`, evitando pasar listas completas por navegación.

## Componentes React Native Paper

- `Appbar`: encabezados, título de pantalla y navegación de regreso.
- `TextInput`: nombre de la playlist.
- `Button`: crear, guardar, agregar y volver a intentar.
- `Card`: representación de cada playlist.
- `List.Item` / `List.Icon`: filas de canciones y acciones de agregar.
- `Checkbox` o `IconButton`: indicar/agregar canciones sin duplicarlas.
- `Snackbar` o `HelperText`: errores de validación y confirmaciones.
- `Text`: estados vacíos, nombres, artistas y mensajes informativos.
- `Divider`: separación visual entre filas.
- `ActivityIndicator`: solo si se introduce alguna operación local que requiera estado de transición; no es necesario para datos síncronos.

Se conservarán los colores, fondo oscuro y acento verde existentes, y se respetarán los patrones de estilos actuales.

## Orden de implementación

1. Extraer y normalizar los datos compartidos en `src/data/songs.js`.
2. Implementar `PlaylistContext` y sus operaciones con validación.
3. Integrar `PlaylistProvider` en `App.js`.
4. Crear los componentes visuales específicos de playlists.
5. Crear las cuatro pantallas de biblioteca/playlist.
6. Integrar el stack de Biblioteca en `AppNavigator.js`.
7. Actualizar `HomeScreen` para reutilizar la fuente común de canciones.
8. Verificar manualmente los flujos de crear, seleccionar, agregar, volver a Biblioteca y abrir una playlist.
9. Ejecutar lint y typecheck según los comandos del repositorio, sin instalar dependencias.

## Consideraciones y límites

- Las playlists se conservarán mientras el usuario navega porque el `PlaylistProvider` vive por encima del navegador.
- Al cerrar o reiniciar la app se perderán porque no se añadirá AsyncStorage ni otra dependencia/persistencia; si se requiere persistencia entre sesiones habrá que aprobar una decisión adicional.
- `NowPlayingScreen` seguirá recibiendo el flujo actual; la reproducción no forma parte de esta implementación.
- Se evitarán cambios innecesarios en `SearchScreen`, `GenreCard` y controles del reproductor.
