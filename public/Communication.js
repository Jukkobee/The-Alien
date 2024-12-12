import CommunicationHandler from './CommunicationHandler.js';

export function initializeChat() {
    const communicationHandler = new CommunicationHandler();
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

    // Define the categories for each letter
    const letterCategories = {
        nouns: ['q', 'z', 'n'],
        verbs: ['k', 'a', 'x', 'l', 'c'],
        directionals: ['d', 'u', 't', 'p', 's', 'w'],
        miscellaneous: ['m', 'h', 'r', 'y', 'f', 'o', 'j', 'b', 'v', 'i', 'g', 'e']
    };

    // Function to get the color based on the letter category
    function getLetterColor(letter) {
        if (letterCategories.nouns.includes(letter)) {
            return '#ff4d4d'; // Red for nouns
        } else if (letterCategories.verbs.includes(letter)) {
            return '#4dff4d'; // Green for verbs
        } else if (letterCategories.directionals.includes(letter)) {
            return '#4d94ff'; // Blue for directionals
        } else if (letterCategories.miscellaneous.includes(letter)) {
            return '#ffffff'; // White for miscellaneous
        }
        return '#ffffff'; // Default to white
    }

    // Create the keyboard with color-coded keys
    function createKeyboard() {
        keyboardLayout.forEach((row) => {
            const keyboardRow = document.createElement('div');
            keyboardRow.classList.add('keyboard-row');

            for (let letter of row) {
                const keyButton = document.createElement('button');
                keyButton.textContent = letter;
                keyButton.classList.add('key-button');
                keyButton.style.backgroundColor = getLetterColor(letter);

                keyButton.addEventListener('click', () => {
                    currentMessageDisplay.textContent += letter;
                    sendButton.disabled = false;
                });

                keyboardRow.appendChild(keyButton);
            }

            onScreenKeyboard.appendChild(keyboardRow);

        });

        // Create and append the backspace button
        const backspaceButton = document.createElement('button');
        backspaceButton.textContent = '⌫';
        backspaceButton.classList.add('key-button', 'backspace-button');
        backspaceButton.addEventListener('click', () => {
            const currentText = currentMessageDisplay.textContent;
            if (currentText.length > 0) {
                currentMessageDisplay.textContent = currentText.slice(0, -1);
            }

            if (currentMessageDisplay.textContent.length === 0) {
                sendButton.disabled = true;
            }
        });

        const lastRow = document.querySelector('.keyboard-row:last-child');
        lastRow.appendChild(backspaceButton);

        // Add the horizontal legend below the keyboard
        const legend = document.createElement('div');
        legend.style.color = 'white';
        legend.style.fontSize = '12px'; // Smaller font size
        legend.style.display = 'flex'; // Display in a row
        legend.style.justifyContent = 'center'; // Center the items
        legend.style.gap = '10px'; // Add some space between items
        legend.innerHTML = `
            <span><span style="color: #ff4d4d;">●</span> Nouns</span>
            <span><span style="color: #4dff4d;">●</span> Verbs</span>
            <span><span style="color: #4d94ff;">●</span> Directionals</span>
            <span><span style="color: #ffffff;">●</span> Miscellaneous</span>
        `;
        onScreenKeyboard.appendChild(legend);
    }

    // Function to add a message to the chat log
    function addMessage(message, sender) {
        if (!message) return;

        // Create message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender === 'player' ? 'message-player' : 'message-npc');
        
        // Format message with spaces between letters
        const spacedMessage = message.toLowerCase().split('').join(' ');
        messageElement.textContent = `${sender === 'player' ? 'You' : 'Stranger'}: ${spacedMessage}`;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to send a message
    function sendMessage() {
        const message = currentMessageDisplay.textContent.trim().toLowerCase();
        if (!message) return;

        addMessage(message, 'player');
        currentMessageDisplay.textContent = '';
        sendButton.disabled = true;

        // Get response from CommunicationHandler
        setTimeout(() => {
            const response = communicationHandler.processInput(message);
            
            // Add the alien's response
            addMessage(response.response, 'npc');
            
            // Add description of the stranger's reaction
            const descriptionElement = document.createElement('div');
            descriptionElement.classList.add('message', 'message-description');
            descriptionElement.textContent = response.description;
            chatMessages.appendChild(descriptionElement);
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
    }

    // Event listener for the send button
    sendButton.addEventListener('click', sendMessage);

    // Initialize the keyboard
    createKeyboard();
}