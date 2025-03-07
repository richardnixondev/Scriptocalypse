# Scriptocalypse

[Click here to see deployed game](https://richardnixondev.github.io/Scriptocalypse/)

## Description
Scriptocalypse, set in a zombie apocalypse scenario in the year 2666, the objective is to survive the attack of all groups of zombies for 3 minutes. The game ends when the clock resets, your score will be based on the amount of destruction you managed to cause.


## MVP - (Minimum Scope)
- The game must have at least 3 states (initial start screen, game screen, and game over screen)

- The game must have the ability to start and be restarted at the end.

- The game needs to have a logic of losing or winning.

- The game needs to be versioned on github.

-----------------------------------------------------------------------------
## Extras
- The game may have a local storage function.

- The game may have audio.

- The game may have a variety of enemies.

- The game may have BOSS-type enemies.


## Backlog

- Add hardcore state to make the game more difficult
- Add different types of creatures
- Add a boss fight when a time is reached.
- Add music and sound in the game.



## Data structure
-  introPage(): Sets up and displays the game’s intro screen, hiding other sections.

-  startGame(): Starts the game when the "Start" button is clicked, setting up the game area, resetting variables, and starting the timer.

-  timeGame(): Updates the elapsed game time every second.

-  shoot(): Creates a bullet when the player shoots and checks for collisions with enemies.

-  spawnEnemy(): Continuously spawns enemies and moves them across the screen.

-  checkCollision(bullet, enemy): Detects if a bullet collides with an enemy, removing both and increasing the score if a hit is detected.

-  checkCollisionEnemy(player, enemy): Checks if an enemy collides with the player. If so, it reduces the player's lives and determines if the game should end.

-  endGame(): Ends the game when the player runs out of lives, displaying the "Game Over" screen and clearing game elements.


## States y States Transitions
-  Start Screen
-  Game Screen
-  Game Over Screen


## Task
- [x] MVP
- [ ] Extras




## Links

- [Slides Link](http://slides.com)
- [Github repository Link](http://github.com)
- [Deployment Link](http://github.com)
