# The Alien
## Game Design Document

### Overview
A puzzle-linguistics game where players must learn an alien language to solve challenges. Each level presents a unique language and scenario, requiring players to decipher meaning through context and interaction.

### Target Audience
- Puzzle enthusiasts
- Linguistics fans
- Players who enjoy deep problem-solving experiences

### Core Mechanics

#### Language System
- Approximately 20 words per level
- Each word represented by a single letter (max 26 possible words)
- No gestures or facial expressions allowed
- Consistent language rules within each level

#### Universal Vocabulary
1. Core Words (Present in all levels):
   - I, You, No, Yes, One, Two, Many, Question, Want, Be (covers: am/is/was/are), Give

#### Gameplay Elements
- Top-down 2D perspective
- Hexagonal grid movement
- Basic interaction mechanics:
  - Walking, Moving objects, Speaking to alien, Level-specific actions

### Visual Style
- 8-bit inspired graphics
- Minimalist design
- Bird's eye view
- Player represented as simple shape (circle)
- Hexagonal floor tiles

### Level 1 Specification

#### Additional Vocabulary
- Wolf, Help, Lock, Key, Rock, Food

#### Setting
- Player and alien separated by fence
- No direct physical interaction possible
- Communication through language only

#### Objectives
Player's Goal:
- Obtain food from alien's side (driven by hunger)

Alien's Goal:
- Acquire key from under rock on player's side
- Unlock chains
- Escape before wolves arrive

#### Level Constraints
- Cannot climb fence
- Must solve through verbal communication only
- All solutions must use established vocabulary

### Design Philosophy
1. Realism Priority
   - Language rules must be internally consistent
   - No compromise on linguistic logic for sake of difficulty
   - Difficulty can be adjusted through other means

2. Level Design
   - Each level features unique language and scenario
   - Difficulty varies but not necessarily progressive
   - Focus on communication puzzles

### Future Considerations
- Multiple levels planned
- Potential alternate communication methods (e.g., intercoms, cameras)
- Maintaining consistent rule enforcement across all levels

### Technical Notes
- Simple graphics enable focus on puzzle mechanics
- Clear feedback system for language interaction
- Consistent rule enforcement across all levels