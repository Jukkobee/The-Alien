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

#### 1. **GameManager**
Manages the game state, level progression, and core game mechanics.

**Variables:**
- `currentLevel`: `int` - Tracks the current level number.
- `player`: `Player` - Instance of the player character. //connects to Player
- `stranger`: `Stranger` - Instance of the NPC stranger. //connects to Stranger
- `inventory`: `List<GameObject>` - List of items the player is carrying. //connects to GameObject
- `barriers`: `List<Barrier>` - List of impassable barriers (fences, walls).

**Methods:**
- `initializeGame`: Initializes the game, loads the first level, initializes player and stranger.
- `loadLevel(levelNumber: int)`: Loads level layout, places objects, sets up language dictionary.
- `handleInteraction(object: GameObject)`: Processes player interaction with objects (picking up, showing).
- `toggleConversationMode`: Switches between exploration and conversation interfaces.
- `checkWinCondition`: Returns a boolean indicating if the level objectives are met for both player and stranger.

#### 2. **LanguageSystem**
Handles the language mechanics and conversation logic.

**Variables:**
- `dictionary`: `Map<String, WordType>` - Maps words to their types (noun, verb, etc.).
- `validSentencePatterns`: `List<Pattern>` - Valid grammatical structures.
- `commonWords`: `List<String>` - Words used across all levels.
- `levelWords`: `List<String>` - Level-specific vocabulary.
- `lastResponse`: `String` - Stranger's most recent response.

**Methods:**
- `parsePlayerSentence(words: List<String>)`: Returns a boolean indicating if the sentence is grammatically valid.
- `generateStrangerResponse(playerWords: List<String>, state: GameState)`: Generates a contextual response based on the game state.
- `isValidWord(word: String)`: Checks if the word exists in the current level's vocabulary.

#### 3. **Player**f
Represents the player character and their interactions.

**Variables:**
- `position`: `HexCoordinate` - Current position on hex grid.
- `direction`: `Vector2` - Facing direction.
- `isHoldingObject`: `boolean` - Whether the player is carrying something.
- `currentObject`: `GameObject` - Reference to the held object. //connects to gameobject

**Methods:**
- `move(direction: Direction)`: Updates position on hex grid and checks for collisions. /connects to HexGrid
- `pickupObject(object: GameObject)`: Attempts to pick up a nearby object. //connects to gameObject
- `showObject(object: GameObject)`: Displays held object to the stranger.//connects to gameObject
- `dropObject`: Releases the currently held object.

#### 4. **Stranger**
Manages the NPC stranger's behavior and state.

**Variables:**
- `position`: `HexCoordinate` - Position on hex grid.
- `needsMet`: `boolean` - Whether the stranger's objective is fulfilled.
- `currentState`: `State` - Current behavioral state.
- `inventory`: `List<GameObject>` - Items the stranger possesses.

**Methods:**
- `processPlayerAction(action: Action)`: Responds to player interactions.
- `updateState`: Updates the stranger's state based on game progress.
- `giveItem(item: GameObject)`: Transfers item to the player if conditions are met. //connecst to GameObject

#### 5. **HexGrid**
Manages the hexagonal grid system and object placement.

**Variables:**
- `grid`: `2D Array of Hex` - Grid layout.
- `walkableHexes`: `List<HexCoordinate>` - Accessible positions.
- `objectLocations`: `Map<GameObject, HexCoordinate>` - Object positions. //connects to GameObject

**Methods:**
- `isWalkable(position: HexCoordinate)`: Returns a boolean indicating if the hex can be walked on.
- `getNeighbors(position: HexCoordinate)`: Returns a list of adjacent accessible hexes.
- `placeObject(object: GameObject, position: HexCoordinate)`: Places object on grid. //connects to GameObject

#### 6. **GameObject**
Base class for interactive objects in the game.

**Variables:**
- `type`: `ObjectType` - Type of object (key, rock, food, etc.).
- `position`: `HexCoordinate` - Current position. //connect to hex
- `isPickupable`: `boolean` - Whether the object can be picked up.
- `isVisible`: `boolean` - Whether the object is currently visible.

**Methods:**
- `interact(player: Player)`: Handles player interaction with the object. //connect to player
- `updateState(state: GameState)`: Updates object state based on game events.
- `show/hide`: Controls object visibility.
