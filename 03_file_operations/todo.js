const readline = require('readline');
// require in the 'fs' module

// Create a const to hold the file path to
// the json file where you want to store
// the to do list data

let mode = 'menu';
const prompts = {
    menu: 'What would you like to do: (N)ew, (L)ist, (R)emove, (H)elp, E(x)it: ',
    new: 'Enter a new to do item: ',
    remove: ({length}) => `Which item would you like to remove (1${length > 1 ? ` - ${length}` : ''}): `
}

// Check if the json file exists
// If the file does not exist
// create the file with an empty 
// array inside of it

// Read the todos.json file and save the contents
// into the toDos const. Don't forget to parse the JSON
const toDos = []; // Replace empty array with the file contents

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: prompts.menu
});

console.log('\n===== Welcome to the Persistent To Do CLI =====\n');

rl.prompt();

rl.on('line', input => {
    input = input.trim();

    if(mode === 'new'){
        handleAddItem(input);
    } else if(mode === 'remove') {
        handleRemoveItem(input);
    } else {
        handleMenuAction(input);
    }

    rl.prompt();
});

rl.on('close', () => {
    // Write the contents of the toDos array
    // to the JSON file. Don't forget to 
    // stringify the array

    console.log('\n\n===== Goodbye, Thank you for using the Persistent To Do CLI! =====\n');

    process.exit(0);
});

function displayList(list){
    if(Array.isArray(list) && list.length){
        console.log('\n');
        
        list.forEach((item, index) => {
            console.log(`\t${index + 1}. ${item}`);
        });

        return console.log('\n');
    }

    return console.log('\n\tNo to do items\n');
}

function displayHelp(){
    const help = `=== To Do List Help ===

    Available Menu Options:
    N           Shortcut for "New"
    New         Create a new to do item to be added to the to do list.
                Enter "C" to cancel adding a new item and return to 
                main menu.

    L           Shortcut for "List"
    List        Lists out all current to do items.

    R           Shortcut for "Remove"
    Remove      Removes a to do item from the current list of items.
                Once prompted enter in the numerical number of the item
                you wish to remove. Enter "C" to cancel removing item and
                return to main menu.

    H           Shortcut for "Help"
    Help        Displays this help message

    X           Shortcut for "Exit"
    Exit        Saves your to do list to a file then exits the app. You can 
                also safely exit the app by pressing "Ctrl + c" 
                on the keyboard.
    `;

    console.log(help);
}

function handleAddItem(item){
    mode = 'menu';
    rl.setPrompt(prompts.menu);
    
    if(item.toLowerCase() === 'c'){
        return console.log('Add item canceled');
    }

    toDos.push(item);
    console.log('Item Added: ' + item);
}

function handleMenuAction(action){
    switch (action.toLowerCase()) {
        case 'x':
        case 'exit':
            return rl.close();
        case 'h':
        case 'help':
            displayHelp();
            rl.setPrompt(prompts.menu);
            break;
        case 'l':
        case 'list':
            console.log('Your to do items:');
            displayList(toDos);
            rl.setPrompt(prompts.menu);
            break;
        case 'n':
        case 'new':
            mode = 'new';
            rl.setPrompt(prompts.new);
            break;
        case 'r':
        case 'remove':
            displayList(toDos);
            if(toDos.length){
                mode = 'remove';
                rl.setPrompt(prompts.remove(toDos));
            }
            break;
        default:
            console.log(`"${action}" is an unknown command. Enter "H" for help.`);
            rl.setPrompt(prompts.menu);
    }
}

function handleRemoveItem(itemNumber){
    if (itemNumber.toLowerCase() === 'c') {
        mode = 'menu';
        rl.setPrompt(prompts.menu);
        console.log('Remove item canceled');
        
        return false;
    }
    if (isNaN(itemNumber) || itemNumber < 1 || itemNumber > toDos.length) {
        console.log('Please enter a number between 1 and ' + toDos.length + ' or "C" to cancel');
        
        return false;
    }

    const removedItem = toDos.splice(itemNumber - 1, 1);
    console.log(`Removed Item: ${itemNumber}. ${removedItem}`);
    mode = 'menu';
    rl.setPrompt(prompts.menu);

    return true;
}
