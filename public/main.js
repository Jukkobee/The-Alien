import { handlePlayerMovement } from './Grid.js';
import { initializeChat } from './Communication.js';

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', handlePlayerMovement);
    initializeChat();
});
