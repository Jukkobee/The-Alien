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

**Methods:**

#### 2. **P0: Communication**
Handles the language mechanics, conversation logic, keyboard, and chat log.

**Variables:**
- `keyboardLayout` - How the keyboard looks / is set up

**Methods:**
- `initializeChat` - Sets up the chat function to talk to the NPC
- `createKeyboard` - creates the keyboard so the player can type in their message
- `addMessage` - sets the message up so it can be sent
- `sendMessage` - sends the message to the NPC and has the logic for the NPC's response

#### 6. **P1: Grid**
Manages the grid system and object placement.

**Variables:**
- `grid`: `2D Array of Hex` - Grid layout. P2
- `walkableHexes`: `List<HexCoordinate>` - Accessible positions. P2
- `objectLocations`: `Map<GameObject, HexCoordinate>` - Object positions. //connects to GameObject P1
- `newX` - new value for x-position while moving
- `newY` - new value for y-position while moving
- `width` - width of the sprites
- `height` - height of the sprites

**Methods:**
- `snapToGrid` - makes it so that the objects aren't in between grid squares
- `drawFence` - draws the fence in the middle of the screen
- `handlePlayerMovement` - allows the player to move around with wasd or arrow keys
