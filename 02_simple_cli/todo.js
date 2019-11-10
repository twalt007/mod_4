const readline = require("readline");
let addItemMode = false;
const prompts = {
    'new': 'Enter a new to do item: ',
    'menu': 'What would you like to do: (N)ew, (L)ist, E(x)it > '
}
const toDos = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



console.log('\n===== Welcome to the To Do CLI =====\n');

rl.setPrompt(prompts.menu);
rl.prompt();

rl.on('line',(input)=> {
    input = input.trim();
    if (addItemMode){
        handleAdd(input);
    }else{
        handleMenu(input);
    }
    rl.prompt();
});


rl.on('close',() => {
    console.log('\n===== Goodbye!  Thanks for using the To-Do List! =====\n');
    process.exit(0);
});

/**
 * @description Takes in a single string parameter and adds it to the to do list array then sets the prompt back to the menu options. 
 * @param {string} newItem - An item to be added to the to do list
 * @returns {undefined}
 */
function handleAdd(newItem) {
    toDos.push(newItem);
    addItemMode = false;
    rl.setPrompt(prompts.menu);
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
            rl.setPrompt(prompts.menu);
            break;
        case 'n':
        case 'new':
            addItemMode = true;
            rl.setPrompt(prompts.new);
            break;
        default:
            console.log(`"${menuChoice}" is an unknown command. Valid commands: "New", "List", or "Exit"`);
            rl.setPrompt(prompts.menu);
    }
}  
