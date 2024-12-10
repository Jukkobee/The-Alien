// Dictionary of letter meanings
const LETTER_MEANINGS = {
    q: 'I',
    z: 'You',
    m: 'No',
    h: 'Yes',
    r: 'One',
    y: 'Two',
    f: 'More',
    k: 'Want',
    a: 'Be',
    x: 'Give',
    l: 'Take',
    n: 'Wolf',
    c: 'Help',
    j: 'Please/Thanks/Sorry',
    d: 'Left',
    u: 'Right',
    t: 'Location',
    p: 'What',
    s: 'Forward',
    w: 'Backward'
};

// Track conversation state
let dialogueState = {
    hasSeenWolf: false,
    hasAskedForHelp: false,
    hasIntroducedSelf: false
};

// Helper function to parse message into meaningful words
function parseMessage(message) {
    return message.toLowerCase().trim().split(' ').filter(letter => LETTER_MEANINGS[letter]);
}

// Function to generate alien responses
function generateResponse(message) {
    const words = parseMessage(message);
    
    // Handle empty or invalid messages
    if (!words.length) {
        return 'p z'; // "What you?"
    }

    // Check for specific patterns and generate responses
    
    // Wolf panic response
    if (words.includes('n')) {
        dialogueState.hasSeenWolf = true;
        return 'n? m n j'; // "Wolf? No wolf, thanks/sorry"
    }

    // Help request response
    if (words.includes('c')) {
        dialogueState.hasAskedForHelp = true;
        return 'h q c z j'; // "Yes I help you please"
    }

    // Self introduction (using 'q' - I)
    if (words.includes('q') && !dialogueState.hasIntroducedSelf) {
        dialogueState.hasIntroducedSelf = true;
        return 'q c z j'; // "I help you please"
    }

    // Location question
    if (words.includes('t')) {
        return 'q a t u'; // "I am location right"
    }

    // Want/Give/Take patterns
    if (words.includes('k') || words.includes('x') || words.includes('l')) {
        return 'p k z'; // "What want you?"
    }

    // Default curious response
    return 'p z'; // "What you?"
}

// Export function to handle sending messages
export function handleAlienDialog(message) {
    const response = generateResponse(message);
    
    // Return both the alien's response and its translation
    return {
        response,
        translation: translateToEnglish(response),
        state: { ...dialogueState }
    };
}

// Helper function to translate alien message to English
function translateToEnglish(message) {
    return message
        .split(' ')
        .map(letter => LETTER_MEANINGS[letter] || letter)
        .join(' ');
}
