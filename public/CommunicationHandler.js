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
                response: 'n m n',
                description: 'The stranger looks around frantically, then relaxes when seeing no wolf.'
            },
            'c': {
                response: 'im-coming-my-lil-pog-champ',
                description: 'The stranger nods vigorously, indicating they need help.'
            },
            'j': {
                response: 'j h',
                description: 'The stranger nods appreciatively.'
            },
            'p': {
                response: 'q k c z c q',
                description: 'The stranger gestures to their bindings again.'
            },
            't': {
                response: 'd s s',
                description: 'The stranger tries to indicate a direction.'
            },
            'pt': {
                response: 't d s s x t',
                description: 'The stranger seems to be trying to describe a specific location.'
            },
            'qc': {
                response: 'h j z c q',
                description: 'The stranger excitedly indicates their bound hands.'
            },
            'zc': {
                response: 'h j j q k c',
                description: 'The stranger becomes very excited at your offer of help.'
            },
            'kc': {
                response: 'h q k c j',
                description: 'The stranger eagerly confirms they want help.'
            },
            'pn': {
                response: 'm n q k c',
                description: 'The stranger emphasizes there are no wolves, redirecting attention to their need for help.'
            },
            's': {
                response: 'h s d s f',
                description: 'The stranger encourages forward movement, indicating left and more.'
            },
            'w': {
                response: 'm w d s',
                description: 'The stranger discourages going backward, pointing left and forward instead.'
            },
            'v': {
                response: 'Jacob-why-you-so-cute?',
                description: 'The stranger seems to be trying to say something.'

            }
            
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
        if (input.includes('n') && input.includes('c')) {
            return {
                response: 'm n q k c',
                description: 'The stranger emphasizes there are no wolves, but urgently indicates they need help.'
            };
        }

        if (input.includes('c') && input.includes('j')) {
            return {
                response: 'h q k c j',
                description: 'The stranger eagerly acknowledges your offer of help.'
            };
        }

        // Default response if no patterns match
        return {
            response: 'p q m k',
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