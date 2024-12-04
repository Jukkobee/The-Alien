### Platform:

#### Using `knova.js` to implement the design would be best for a few reasons:
- **Easy Installation:** Konva can be installed extremely easily through the terminal (`npm install konva`).
- **Example Layout:** [Mystikaze](https://mystikaze.com/) is the perfect example of a layout for the game: hexagonal pattern, interactive buttons, text boxes – everything needed to implement this game is included within the Konva architecture.
- **Minimal Coding:** Not much coding is needed for a 2D design in Konva; most of it is interactive. Specifically, resizing, creating elements, and color grading do not require *any* coding.
- **2D Textures:** You can implement 2D textures in the background to give the appearance of a 3D game – different layers that move at a different speed and opacity.
- **Sound Implementation:** You can also easily implement sound in the background, which is critical to this linguistics-based game.

#### Using `phaser.io` to implement the design would also be a good choice:
- **Straightforward Setup:** After watching a YouTube tutorial, it seems pretty straightforward and can be installed directly through the terminal.
- **Similar Game Example:** The game [Legion](https://phaser.io/news/2024/10/legion) is very similar to what THE ALIEN game is attempting to do.
- **Less Ideal than Konva:** Not as good as Konva because it is not as simplistic, but still a viable option.

---
FIGMA LINK: https://www.figma.com/board/vjSPkIdI8fSJ9PLJyOyecl/Welcome-to-FigJam?node-id=0-1&t=Mn9pvoKOkSGx0mzy-1


### Architecture:

#### 1. **P0: Main**
Manages the two other classes.

**Variables:**
- `currentLevel`: `int` - Tracks the current level number. P2
- `player`: `Player` - Instance of the player character. //connects to Player P0
- `stranger`: `Stranger` - Instance of the NPC stranger. //connects to Stranger P0
- `inventory`: `List<GameObject>` - List of items the player is carrying. //connects to GameObject P1
- `barriers`: `List<Barrier>` - List of impassable barriers (fences, walls). P2

**Methods:**
- `initializeGame`: Initializes the game, loads the first level, initializes player and stranger. P0
- `loadLevel(levelNumber: int)`: Loads level layout, places objects, sets up language dictionary. P0
- `handleInteraction(object: GameObject)`: Processes player interaction with objects (picking up, showing). P1
- `toggleConversationMode`: Switches between exploration and conversation interfaces. P1
- `checkWinCondition`: Returns a boolean indicating if the level objectives are met for both player and stranger. P0

#### 2. **P0: Communication**
Handles the language mechanics, conversation logic, keyboard, and chat log.

**Variables:**
- `dictionary`: `Map<String, WordType>` - Maps words to their types (noun, verb, etc.). P0
- `validSentencePatterns`: `List<Pattern>` - Valid grammatical structures. P0
- `commonWords`: `List<String>` - Words used across all levels. P0
- `levelWords`: `List<String>` - Level-specific vocabulary. P0
- `lastResponse`: `String` - Stranger's most recent response. P0

**Methods:**
- `parsePlayerSentence(words: List<String>)`: Returns a boolean indicating if the sentence is grammatically valid. P0
- `generateStrangerResponse(playerWords: List<String>, state: GameState)`: Generates a contextual response based on the game state. P0

#### 6. **P1: Grid**
Manages the grid system and object placement.

**Variables:**
- `grid`: `2D Array of Hex` - Grid layout. P2
- `walkableHexes`: `List<HexCoordinate>` - Accessible positions. P2
- `objectLocations`: `Map<GameObject, HexCoordinate>` - Object positions. //connects to GameObject P1

**Methods:**
- `isWalkable(position: Coordinate)`: Returns a boolean indicating if the square can be walked on. P2
- `getNeighbors(position: Coordinate)`: Returns a list of adjacent accessible squares. P2
- `placeObject(object: GameObject, position: Coordinate)`: Places object on grid. //connects to GameObject P2
