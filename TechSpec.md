### Platform:
# Using knova.js to implement the design would be best for a few reasons:
* Konva can be installed extremely easily through the terminal (npm install konva).
* https://mystikaze.com/ is the perfect example of a layout for the game: hexagonal pattern, interactive buttons, text boxes - everything needed to implement this game is included within the Konva architecture. 
* Not much coding is needed for a 2D design in Konva, most of it is interactive. Specifically, resizing, creating elements, and color grading do not require *any* coding. 
* You can implement 2D textures in the background to give the apperance of a 3D game - different layers that move at a different speed at different opacity. 
* You can also easily implement sound in the background which is critical to this lingustics-based game. 

# Using phaser.io to implement the design would also be a good choice:
* After watching a YouTube video on how to implement Phaser, it seems pretty straight forward and can be installed directly through the terminal. 
* This game: https://phaser.io/news/2024/10/legion, is very similar to what THE ALIEN game is attempting to do. 
* Not as good as Konva because it is not as simplistic, but still a good option. 

### Architecture:
# Alien Class:
- List<English, ForeignLanguage> {I, You, No, Yes, One, Two, Many, question, want, be (just one word for am, is, was, are, etc), give, take}, {TBD}

# Human Class:


# Game Engine Class:
- void makeLangauge ()

# Environment Class:


