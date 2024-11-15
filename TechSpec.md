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

#### 1. **P0: GameManager**
Manages the game state, level progression, and core game mechanics.

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

#### 2. **P0: LanguageSystem**
Handles the language mechanics and conversation logic.

**Variables:**
- `dictionary`: `Map<String, WordType>` - Maps words to their types (noun, verb, etc.). P0
- `validSentencePatterns`: `List<Pattern>` - Valid grammatical structures. P0
- `commonWords`: `List<String>` - Words used across all levels. P0
- `levelWords`: `List<String>` - Level-specific vocabulary. P0
- `lastResponse`: `String` - Stranger's most recent response. P0

**Methods:**
- `parsePlayerSentence(words: List<String>)`: Returns a boolean indicating if the sentence is grammatically valid. P0
- `generateStrangerResponse(playerWords: List<String>, state: GameState)`: Generates a contextual response based on the game state. P0
        - riyan note: this will be changed to a static HashMap (key: player words, value: stranger response) for efficiency
- `isValidWord(word: String)`: Checks if the word exists in the current level's vocabulary. P0

#### 3. **P0: Player**
Represents the player character and their interactions.

**Variables:**
- `position`: `HexCoordinate` - Current position on hex grid. P2
        - riyan note: for simplification purposes, the player will not move, and all interactions will be accessible via clicks on the screen
- `direction`: `Vector2` - Facing direction. P2
- `isHoldingObject`: `boolean` - Whether the player is carrying something. P0
- `currentObject`: `GameObject` - Reference to the held object. //connects to gameobject P0

**Methods:**
- `move(direction: Direction)`: Updates position on hex grid and checks for collisions. /connects to HexGrid P2
- `pickupObject(object: GameObject)`: Attempts to pick up a nearby object. //connects to gameObject P1
- `showObject(object: GameObject)`: Displays held object to the stranger.//connects to gameObject P2
- `dropObject`: Releases the currently held object. P2
        - riyan note: players don't have to drop items, they can just keep them in their inventory

#### 4. **P0: Stranger**
Manages the NPC stranger's behavior and state.

**Variables:**
- `position`: `HexCoordinate` - Position on hex grid. P2
- `needsMet`: `boolean` - Whether the stranger's objective is fulfilled. P0
- `currentState`: `State` - Current behavioral state. P0
        - riyan note: this is really vague
- `inventory`: `List<GameObject>` - Items the stranger possesses. P0

**Methods:**
- `processPlayerAction(action: Action)`: Responds to player interactions. P0
        - riyan note: this is also really vague
- `updateState`: Updates the stranger's state based on game progress. P0
- `giveItem(item: GameObject)`: Transfers item to the player if conditions are met. P0 //connects to GameObject

#### 5. **P1: HexGrid**
Manages the hexagonal grid system and object placement.

**Variables:**
- `grid`: `2D Array of Hex` - Grid layout. P2
- `walkableHexes`: `List<HexCoordinate>` - Accessible positions. P2
- `objectLocations`: `Map<GameObject, HexCoordinate>` - Object positions. //connects to GameObject P1

**Methods:**
- `isWalkable(position: HexCoordinate)`: Returns a boolean indicating if the hex can be walked on. P2
- `getNeighbors(position: HexCoordinate)`: Returns a list of adjacent accessible hexes. P2
- `placeObject(object: GameObject, position: HexCoordinate)`: Places object on grid. //connects to GameObject P2

#### 6. **P1: GameObject**
Base class for interactive objects in the game.

**Variables:**
- `type`: `ObjectType` - Type of object (key, rock, food, etc.). P1
- `position`: `HexCoordinate` - Current position. //connect to hex P1
- `isPickupable`: `boolean` - Whether the object can be picked up. P1
- `isVisible`: `boolean` - Whether the object is currently visible. P2

**Methods:**
- `interact(player: Player)`: Handles player interaction with the object. //connect to player P0
- `updateState(state: GameState)`: Updates object state based on game events. P2
        - riyan note: really vague
- `show/hide`: Controls object visibility. P2
