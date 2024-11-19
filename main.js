// Modify grid settings to make map smaller
const gridSize = 40; // Reduced grid size
const mapCols = Math.floor(window.innerWidth * 0.75 / gridSize); // 75% of screen width
const mapRows = Math.floor(window.innerHeight / gridSize);
const mapWidth = mapCols * gridSize;
const mapHeight = mapRows * gridSize;

// Initialize the stage
const stage = new Konva.Stage({
    container: 'container',
    width: mapWidth,
    height: mapHeight
});

// Create a layer for the sprites and interactions
const layer = new Konva.Layer();
stage.add(layer);

// Draw the fence in the middle of the screen
function drawFence() {
    const fenceY = Math.floor(mapRows / 2) * gridSize + gridSize / 2 - 2; // Align and center on grid
    for (let i = 0; i < mapCols; i++) {
        const fenceTile = new Konva.Rect({
            x: i * gridSize,
            y: fenceY,
            width: gridSize,
            height: 4, // Thinner fence
            fill: '#D3D3D3' // Light grey
        });
        layer.add(fenceTile);
    }
}
drawFence();

// Create the player sprite (blue square, smaller size, centered)
const spriteSize = gridSize * 0.7; // 70% of grid size
const spriteOffset = (gridSize - spriteSize) / 2;

const player = new Konva.Rect({
    x: Math.floor(mapCols / 4) * gridSize + spriteOffset,
    y: Math.floor(mapRows / 2 - 2) * gridSize + spriteOffset, // Above the fence
    width: spriteSize,
    height: spriteSize,
    fill: 'blue'
});
layer.add(player);

// Create the NPC (red square, smaller size, centered)
const npc = new Konva.Rect({
    x: Math.floor((mapCols / 4) * 3) * gridSize + spriteOffset,
    y: Math.floor(mapRows / 2 + 1) * gridSize + spriteOffset, // Below the fence
    width: spriteSize,
    height: spriteSize,
    fill: 'red'
});
layer.add(npc);

// Movement speed (1 grid square)
const speed = gridSize;

// Snap to grid helper
function snapToGrid(value) {
    return Math.round(value / gridSize) * gridSize;
}

// Keyboard controls for player movement
document.addEventListener('keydown', (e) => {
    let newX = player.x();
    let newY = player.y();

    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            newY -= speed;
            break;
        case 'ArrowDown':
        case 's':
            newY += speed;
            break;
        case 'ArrowLeft':
        case 'a':
            newX -= speed;
            break;
        case 'ArrowRight':
        case 'd':
            newX += speed;
            break;
    }

    // Snap to grid and constrain within bounds
    newX = Math.min(Math.max(snapToGrid(newX - spriteOffset), 0), mapWidth - gridSize) + spriteOffset;
    newY = Math.min(Math.max(snapToGrid(newY - spriteOffset), 0), mapHeight - gridSize) + spriteOffset;

    // Collision detection: Prevent crossing the fence
    const fenceY = Math.floor(mapRows / 2) * gridSize + gridSize / 2 - 2;
    const isAboveFence = newY + spriteSize <= fenceY; // Player is fully above the fence
    const isBelowFence = newY >= fenceY + 4; // Player is fully below the fence

    if (!(isAboveFence || isBelowFence)) {
        return; // Block movement if the player overlaps with the fence
    }

    // Update player position
    player.position({ x: newX, y: newY });
    layer.batchDraw();
});

// Interaction logic
const interactionRange = gridSize;
function checkForInteraction() {
    const dx = Math.abs(player.x() - npc.x());
    const dy = Math.abs(player.y() - npc.y());

    if (dx <= interactionRange && dy <= interactionRange) {
        addChatMessage('You are near the NPC. Press E to interact!');
    }
}

// Listen for interaction key (E)
document.addEventListener('keydown', (e) => {
    if (e.key === 'e') {
        checkForInteraction();
    }
});

// Draw the layer
layer.draw();

// Chat functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    // Function to add a message to the chat
    function addMessage(message, sender = 'player') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        
        // Create timestamp
        const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        // Different styling for player and system messages
        if (sender === 'player') {
            messageElement.innerHTML = `
                <div class="message-content">
                    <strong>You:</strong> ${message}
                </div>
                <span class="timestamp">${timestamp}</span>
            `;
            messageElement.classList.add('message-player');
        } else {
            messageElement.innerHTML = `
                <div class="message-content">
                    <strong>NPC:</strong> ${message}
                </div>
                <span class="timestamp">${timestamp}</span>
            `;
            messageElement.classList.add('message-npc');
        }

        // Append the message and scroll to bottom
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add player message
            addMessage(message);
            
            // Clear input
            chatInput.value = '';

            // Simulate NPC response (you can replace this with more complex logic)
            setTimeout(() => {
                // Basic NPC responses based on interaction
                const npcResponses = [
                    "Hello there! How can I help you today?",
                    "Interesting conversation...",
                    "I'm listening.",
                    "Is there something specific you'd like to discuss?"
                ];
                const randomResponse = npcResponses[Math.floor(Math.random() * npcResponses.length)];
                addMessage(randomResponse, 'npc');
            }, 500);
        }
    }

    // Event listeners for sending messages
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Interaction with NPC
    function handleNPCInteraction() {
        const npcMessages = [
            "You're close to the NPC. Want to start a conversation?",
            "The NPC seems interested in talking.",
            "A mysterious figure awaits your interaction."
        ];
        const randomMessage = npcMessages[Math.floor(Math.random() * npcMessages.length)];
        addMessage(randomMessage, 'npc');
    }

    // Modify the existing interaction check to use chat
    function checkForInteraction() {
        const dx = Math.abs(player.x() - npc.x());
        const dy = Math.abs(player.y() - npc.y());

        if (dx <= interactionRange && dy <= interactionRange) {
            handleNPCInteraction();
        }
    }

    // Override the existing interaction listener to use the new chat-based interaction
    document.addEventListener('keydown', (e) => {
        if (e.key === 'e') {
            checkForInteraction();
        }
    });
});