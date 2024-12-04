
export function initializeChat() {
    const onScreenKeyboard = document.getElementById('on-screen-keyboard');
    const currentMessageDisplay = document.getElementById('current-message');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    if (!onScreenKeyboard || !currentMessageDisplay || !sendButton || !chatMessages) {
        console.error("One or more chat-related DOM elements are missing.");
        return;
    }

    // Keyboard layout
    const keyboardLayout = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

    // Creates the keyboard so you can type
    function createKeyboard() {
        keyboardLayout.forEach((row) => {
            const keyboardRow = document.createElement('div');
            keyboardRow.classList.add('keyboard-row');

            for (let letter of row) {
                const keyButton = document.createElement('button');
                keyButton.textContent = letter;
                keyButton.classList.add('key-button');

                keyButton.addEventListener('click', () => {
                    currentMessageDisplay.textContent += letter + ' '; // Add letter + space
                    sendButton.disabled = false; // Enable Speak button
                });

                keyboardRow.appendChild(keyButton);
            }

            onScreenKeyboard.appendChild(keyboardRow);
        });

        const backspaceButton = document.createElement('button');
        backspaceButton.textContent = '⌫';
        backspaceButton.classList.add('key-button', 'backspace-button');
        backspaceButton.addEventListener('click', () => {
            const currentText = currentMessageDisplay.textContent;
            if (currentText.length > 0) {
                // Remove the last character and space
                currentMessageDisplay.textContent = currentText.slice(0, -2);
            }

            if (currentMessageDisplay.textContent.length === 0) {
                sendButton.disabled = true; // Disable Speak button if empty
            }
        });

        // Append backspace button to the last row of keys
        const lastRow = document.querySelector('.keyboard-row:last-child');
        lastRow.appendChild(backspaceButton);
    }

    // sets up the message so it can be sent
    function addMessage(message, sender) {
        if (!message) return;

        // Insert space after each letter in the message
        const spacedMessage = message.split('').join(' ');

        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender === 'player' ? 'message-player' : 'message-npc');
        messageElement.textContent = `${sender === 'player' ? 'You' : 'Stranger'}: ${spacedMessage}`;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
    }

    // sends the message so the NPC can respond
    function sendMessage() {
        const message = currentMessageDisplay.textContent.trim();
        if (!message) return;

        addMessage(message, 'player'); // Add player's message
        currentMessageDisplay.textContent = ''; // Clear input
        sendButton.disabled = true; // Disable Speak button

        // Simulate NPC response
        setTimeout(() => {
            const npcResponses = [
                "Hello there! How can I help you today?",
                "Interesting conversation...",
                "I'm listening.",
                "Is there something specific you'd like to discuss?"
            ];
            const response = npcResponses[Math.floor(Math.random() * npcResponses.length)];
            addMessage(response, 'npc'); // Add NPC's response
        }, 500);
    }

    // Attaches event listener to the "Speak" button
    sendButton.addEventListener('click', sendMessage);

    // Initializes keyboard
    createKeyboard();
}