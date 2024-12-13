import { getPathToTarget } from './Grid.js';

// CommunicationHandler.js
export default class CommunicationHandler {
    constructor() {
        // Dictionary mapping letters to their meanings (kept as reference)
        this.vocabulary = {
            'q': 'I',
            'z': 'You',
            'm': 'No',
            'h': 'Yes',
            'k': 'Want',
            'a': 'Be', //useless so far
            'w': 'Give',
            'n': 'Wolf',
            'c': 'Help',
            'd': 'Freedom',
            'j': 'Please/Thanks/Sorry',
            'y': 'Left',
            'u': 'Right',
            't': 'Location',
            'p': 'What',
            's': 'Forward',
            'x': 'Backward',
        };

        // Response patterns with lowercase letters and no punctuation
        this.responsePatterns = {
            'n': {
                response: 'n? m n', // wolf? no wolf
                description: 'The stranger looks around panickedly and frantically, and then looks back at you confused and annoyed.'
            },
            'd': {
                response: 'd! h! q k d', // help! yes! i want help
                description: 'The stranger nods vigorously.'
            },
            'j': { //please/thanks/sorry
                response: '...j?',
                description: 'The stranger smiles at you, seemingly a bit confused.'
            },
            'p': { // what
                response: 'q k c', // i want help
                description: 'The stranger gestures to their bindings again.'
            },
            't': {
                response: () => getPathToTarget(), 
                description: 'The stranger tries to indicate a couple of directions.'
            },
            'pt': { // what location
                response: () => getPathToTarget(),
                description: 'The stranger seems to be trying to describe a specific location.'
            },
            'kd': { // want freedom
                response: 'h, q k d. z c q. z w d.', // yes, i want freedom. you help i.
                description: 'The stranger excitedly indicates their bound hands.'
            },
            'zkd': { // you want freedom
                response: 'h! q k d. z c q. z w d.', // yes! i want freedom. you help i.
                description: 'The stranger excitedly indicates their bound hands.'
            },
            'zc': { // you help
                response: 'm. q m c', // no. i no help.
                description: 'The stranger shakes their head, gesturing to his bounds.'
            },
            'jzc': { // please you help
                response: 'm. q m c', // no. i no help.
                description: 'The stranger shakes their head, gesturing to his bounds.'
            },
            'zjc': { // you please help
                response: 'm. q m c', // no. i no help.
                description: 'The stranger shakes their head, gesturing to his bounds.'
            },
            'zcj': { // you help please
                response: 'm. q m c', // no. i no help.
                description: 'The stranger shakes their head, gesturing to his bounds.'
            },
            'zmc': { // you no help
                response: 'h. q m c. j', //yes. you no help. sorry
                description: 'The stranger nods apologetically'
            },
            'cq': { // help i
                response: 'j. q m c', // sorry. i no help
                description: 'The stranger shrugs apologetically.'
            },
            'jcq': { // please help i
                response: 'j. q m c', // sorry. i no help
                description: 'The stranger shrugs apologetically.'
            },
            'cqj': { // help i please
                response: 'j. q m c', // sorry. i no help
                description: 'The stranger shrugs apologetically.'
            },
            'qcz': { // i help you
                response: 'h! j, c q', // yes! please, help i
                description: 'The stranger nods excitedly at you.'
            },
            'qc': { // help you
                response: 'h! j, c q',
                description: 'The stranger nods excitedly at you.'
            }
            
        };
    }

    processInput(input) {
        // Convert input to lowercase and remove any spaces
        input = input.toLowerCase().replace(/[^a-z]/g, '');
        
        if (this.responsePatterns[input]) {
            const pattern = this.responsePatterns[input];
            const response = typeof pattern.response === 'function' 
                ? pattern.response() // Call the function if it's a function
                : pattern.response; // Otherwise, use the static response

            return {
                response,
                description: pattern.description
            };
        }

        // Check for common patterns
        if (input.includes('n')) { //includes wolf
            return {
                response: 'n? m n', // wolf? no wolf
                description: 'The stranger looks around panickedly, and then looks back at you, seemingly annoyed, and says the above.'
            };
        }
        if (input.includes('d')) {
            return {
                response: 'd! h! q k d. z w d.', // freedom! yes! i want freedom
                description: 'Interrupting you after your mention of "c", the stranger nods eagerly and speaks.'
            };
        }
        if (input.includes('c')) {
            return {
                response: 'c! c! h, h! z c q', // help! help! yes, yes! you help me
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