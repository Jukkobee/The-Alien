# The Alien

## The Alien.md is written by Jacob

# Design.md has everything Jacob wrote + edits from Sean

# How to set up and use my files
## Pretty self explanatory. There's only three classes. Communication runs communication with the NPC, Grid runs the map and movement and stuff, and Main connects the two of them together.

## The simplified plot is that the player is walking through the wilderness when they see the stranger. The stranger has his hands and feet bound and is yelling in a language that the player does not understand (Except that they learned some basics of the language before going on this trip, but have now forgotten everything but the part of speech of each word). The player must figure out the language in order to actually understand the stranger and help him break free.

## Here's what each letter means:
### Q = “I” (NOUN)
### Z = “You” (NOUN)
### M = “No” (MISC)
### H = “Yes” (MISC)
### R = “One” (MISC)
### Y = “Two” (MISC)
### F = “More” (MISC)
### K = “Want” (VERB)
### A = “Be” (VERB)
### X = “Give” (VERB)
### L = “Take” (VERB)
### N = “Wolf” (NOUN)
### C = “Help” (VERB)
### J = “Please/Thanks/Sorry” (MISC)
### D = “Left” (DIRECTIONAL)
### U = “Right” (DIRECTIONAL)
### T = “Location” (DIRECTIONAL)
### P = “what” (MISC)
### S = “forward” (DIRECTIONAL)
### W = “backward” (DIRECTIONAL)
### B = nothing yet (possibly never anything and we just remove it from the keyboard)
### O = nothing yet (possibly never anything and we just remove it from the keyboard)
### V = nothing yet (possibly never anything and we just remove it from the keyboard)
### I = nothing yet (possibly never anything and we just remove it from the keyboard)
### G = nothing yet (possibly never anything and we just remove it from the keyboard)
### E = nothing yet (possibly never anything and we just remove it from the keyboard)

## The first thing you need to code is the logic for the NPC's responses. You should have a set of phrases that if the player says, the NPC will respond with something specific. Like, if the player says "n" meaning "wolf", the stranger could panic and look around, and then when he sees no wolf, say "n? m n." meaning "wolf? no wolf." That's one example. If the player says anything outside of your list, you can just respond with "The stranger seems confused." or something like that. 

## It would also be good to code a screen at the beginning that explains the setting of the game. Like, the stuff that I explained to you about the player being in the wilderness and stuff. This isn't as necesary, though.

## To win, the plan is that the NPC knows that there is a knife buried in the area, and he even knows where it's buried. So the NPC will direct the player to the knife by saying things like "left" and "forward". Then, the player can dig up the knife and throw it to the NPC so the NPC can cut himself free. And that's a win. However, this seems like a lot to code, and we will probably just end up with a game that has no win condition, and that's totally fine.

# LMK if you have any questions. Phone number is 424-230-2750