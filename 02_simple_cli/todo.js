// Require in the 'readline' module and save it into a const 

// This variable will be used as a flag variable to 
// determine if you are in add item mode or not
let addItemMode = false;

// An object to hold our different prompt messages
const prompts = {
    'new': 'Enter a new to do item: ',
    'menu': 'What would you like to do: (N)ew, (L)ist, E(x)it > '
}

// This is where the to to items will be stored
const toDos = [];

// Use readline to create an interface. Save the 
// interface into a const named rl

// Displays a message to the user 
// welcoming them to the To Do List CLI
console.log('\n===== Welcome to the To Do CLI =====\n');

// Display the prompt to the user,
// it should be the menu prompt

// Create a readline event listener for the 'line'
// event. In the callback function do the following:
//
// In the event callback:
// remove any extra white space from the ends of 
// the input.
//
// if addItemMode is true call the handleAdd function
// and pass it the input from the user
//
// else call the handleMenu function
// and pass it the input from the user
//
// After the if statement
// display the prompt to the user


// Create a readline event listener for the 'close'
// event. In the callback function do the following:
//
// In the event callback display a message to the user
// Saying goodbye and thanks for using the CLI tool
//
// Exit the node process with a code of 0

/**
 * @description Takes in a single string parameter and adds it to the to do list array then sets the prompt back to the menu options. 
 * @param {string} newItem - An item to be added to the to do list
 * @returns {undefined}
 */
function handleAdd(newItem) {
    toDos.push(newItem);
    addItemMode = false;
    // Set the prompt to the 'menu' prompt
}

/**
 * @description Takes in the users input then performs an action based on given input
 * @param {String} menuChoice 
 * @returns {undefined}
 */
function handleMenu(menuChoice) {
    switch (menuChoice.toLowerCase()) {
        case 'x':
        case 'exit':
            return rl.close();
        case 'l':
        case 'list':
            console.log('Your to do items:', toDos);
            // Set the prompt to the 'menu' prompt
            break;
        case 'n':
        case 'new':
            addItemMode = true;
            // Set the prompt to the 'new' prompt
            break;
        default:
            console.log(`"${menuChoice}" is an unknown command. Valid commands: "New", "List", or "Exit"`);
            // Set the prompt to the 'menu' prompt
    }
}
