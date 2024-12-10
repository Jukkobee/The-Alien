import { handlePlayerMovement } from './Grid.js';
import { initializeChat } from './Communication.js';

// allows for player to move and then sets up communication
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', handlePlayerMovement);
    initializeChat();
});