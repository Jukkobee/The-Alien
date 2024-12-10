import { handleAlienDialog } from './AlienDialog.js';

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
            return '#ff4d4d'; // Brighter red
        } else if (letterCategories.verbs.includes(letter)) {
            return '#4dff4d'; // Brighter green
        } else if (letterCategories.directionals.includes(letter)) {
            return '#4d94ff'; // Brighter blue
        } else if (letterCategories.miscellaneous.includes(letter)) {
            return '#ffffff'; // White for miscellaneous
        }
        return '#ffffff'; // Default to white if no category is matched
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
                keyButton.style.backgroundColor = getLetterColor(letter); // Set the key color

                keyButton.addEventListener('click', () => {
                    currentMessageDisplay.textContent += letter + ' '; // Add letter + space
                    sendButton.disabled = false; // Enable Speak button
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
                currentMessageDisplay.textContent = currentText.slice(0, -2); // Remove letter + space
            }

            if (currentMessageDisplay.textContent.length === 0) {
                sendButton.disabled = true; // Disable Speak button if empty
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
    function addMessage(message, sender, translation = '') {
        if (!message) return;

        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender === 'player' ? 'message-player' : 'message-npc');
        
        // Add the original message
        messageElement.textContent = `${sender === 'player' ? 'You' : 'Stranger'}: ${message}`;
        
        // Add translation for alien responses
        if (translation && sender === 'npc') {
            const translationElement = document.createElement('div');
            translationElement.classList.add('message-translation');
            translationElement.textContent = `(${translation})`;
            messageElement.appendChild(translationElement);
        }
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to send a message
    function sendMessage() {
        const message = currentMessageDisplay.textContent.trim();
        if (!message) return;

        addMessage(message, 'player');
        currentMessageDisplay.textContent = '';
        sendButton.disabled = true;

        // Get response from alien dialog system
        setTimeout(() => {
            const { response, translation } = handleAlienDialog(message);
            addMessage(response, 'npc', translation);
        }, 500);
    }

    // Attach event listener to the "Speak" button
    sendButton.addEventListener('click', sendMessage);

    // Initialize the keyboard
    createKeyboard();
}
