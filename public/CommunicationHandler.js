// CommunicationHandler.js
export default class CommunicationHandler {
    constructor() {
        // Dictionary mapping letters to their meanings (kept as reference)
        this.vocabulary = {
            'q': 'I',
            'z': 'You',
            'm': 'No',
            'h': 'Yes',
            'r': 'One',
            'y': 'Two',
            'f': 'More',
            'k': 'Want',
            'a': 'Be',
            'x': 'Give',
            'l': 'Take',
            'n': 'Wolf',
            'c': 'Help',
            'j': 'Please/Thanks/Sorry',
            'd': 'Left',
            'u': 'Right',
            't': 'Location',
            'p': 'What',
            's': 'Forward',
            'w': 'Backward',
            'v': 'Collin is a cutie'
        };

        // Response patterns with lowercase letters and no punctuation
        this.responsePatterns = {
            'n': {
                response: 'n? m n',
                description: 'The stranger looks around panickedly and frantically, and then looks back at you confused and annoyed.'
            },
            'c': {
                response: 'c! h! q k c',
                description: 'The stranger nods vigorously.'
            },
            'j': {
                response: '...j?',
                description: 'The stranger smiles at you, seemingly a bit confused.'
            },
            'p': {
                response: 'q k c',
                description: 'The stranger gestures to their bindings again.'
            },
            't': {
                response: 'd s s', // fix this. should be dependent on player location
                description: 'The stranger tries to indicate a couple of directions.'
            },
            'pt': {
                response: 't d s s', // fix this. should be dependent on player location
                description: 'The stranger seems to be trying to describe a specific location.'
            },
            'qc': {
                response: 'n! q k c. z c q', // yes! i want help. you help i.
                description: 'The stranger excitedly indicates their bound hands.'
            },
            'zc': { // you help
                response: 'm. q m c', // 
                description: 'The stranger shakes their head, gesturing to his bounds.'
            },
            'kc': {
                response: 'j. q k c', //
                description: 'The stranger shrugs apologetically.'
            },
            's': { //we're on this one now.
                response: 'h s d s f',
                description: 'The stranger encourages forward movement, indicating left and more.'
            },
            'w': {
                response: 'm w d s',
                description: 'The stranger discourages going backward, pointing left and forward instead.'
            },
            
        };
    }

    processInput(input) {
        // Convert input to lowercase and remove any spaces
        input = input.toLowerCase().replace(/[^a-z]/g, '');
        
        // Check if we have a specific response for this input
        if (this.responsePatterns[input]) {
            return this.responsePatterns[input];
        }

        // Check for common patterns
        if (input.includes('n')) { //includes wolf
            return {
                response: 'n? m n', // wolf? no wolf
                description: 'The stranger looks around panickedly, and then looks back at, seemingly annoyed, and says the above.'
            };
        }

        if (input.includes('c')) {
            return {
                response: 'c! c! h, h! q k c', // help! help! yes, yes! i want help
                description: 'Interrupting you after your mention of "c", the stranger nods eagerly and speaks.'
            };
        }

        // Default response if no patterns match
        return {
            response: 'p?',
            description: 'The stranger seems confused by your words.'
        };
    }

    addResponsePattern(trigger, response, description) {
        // Ensure trigger and response are lowercase and have no punctuation
        trigger = trigger.toLowerCase();
        response = response.toLowerCase();
        this.responsePatterns[trigger] = {
            response,
            description
        };
    }
}