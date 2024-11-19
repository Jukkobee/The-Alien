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

// On-screen keyboard functionality
document.addEventListener('DOMContentLoaded', () => {
    const onScreenKeyboard = document.getElementById('on-screen-keyboard');
    const currentMessageDisplay = document.getElementById('current-message');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    // Create keyboard layout (3 rows)
    const keyboardLayout = [
        'qwertyuiop',
        'asdfghjkl',
        'zxcvbnm'
    ];

    // Function to create keyboard
    function createKeyboard() {
        keyboardLayout.forEach((row, rowIndex) => {
            const keyboardRow = document.createElement('div');
            keyboardRow.classList.add('keyboard-row');
            
            // Add padding to middle and bottom rows
            if (rowIndex === 1) keyboardRow.classList.add('offset-row');
            
            for (let letter of row) {
                const keyButton = document.createElement('button');
                keyButton.textContent = letter;
                keyButton.classList.add('key-button');
                
                keyButton.addEventListener('click', () => {
                    // Add letter to current message
                    currentMessageDisplay.textContent += letter + ' ';
                    
                    // Enable send button if message is not empty
                    sendButton.disabled = false;
                });
                
                keyboardRow.appendChild(keyButton);
            }
            
            onScreenKeyboard.appendChild(keyboardRow);
        });

        // Add backspace button
        const backspaceButton = document.createElement('button');
        backspaceButton.textContent = '⌫';
        backspaceButton.classList.add('key-button', 'backspace-button');
        backspaceButton.addEventListener('click', () => {
            // Ensure we remove both the letter and the space after it
            currentMessageDisplay.textContent = currentMessageDisplay.textContent.slice(0, -2);
            
            // Disable send button if no message
            if (currentMessageDisplay.textContent.length === 0) {
                sendButton.disabled = true;
            }
        });
        onScreenKeyboard.lastChild.appendChild(backspaceButton);
    }

    // Function to add a message to the chat
    function addMessage(message, sender = 'player') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        
        if (sender === 'player') {
            messageElement.innerHTML = `
                <div class="message-content">
                    <strong>You:</strong> ${message}
                </div>
            `;
            messageElement.classList.add('message-player');
        } else {
            messageElement.innerHTML = `
                <div class="message-content">
                    <strong>Stranger:</strong> ${message}
                </div>
            `;
            messageElement.classList.add('message-npc');
        }

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message function
    function sendMessage() {
        const message = currentMessageDisplay.textContent.trim();
        if (message) {
            // Add player message
            addMessage(message);
            
            // Clear current message
            currentMessageDisplay.textContent = '';
            
            // Disable send button
            sendButton.disabled = true;

            // Simulate NPC response
            setTimeout(() => {
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

    // Event listener for send button
    sendButton.addEventListener('click', sendMessage);

    // Create keyboard when DOM is loaded
    createKeyboard();

    // Interaction with NPC (same as previous implementation)
    function handleNPCInteraction() {
        const npcMessages = [
            "You're close to the Stranger. Want to start a conversation?",
            "The Stranger seems interested in talking.",
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