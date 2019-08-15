// Require in the 'readline' module and save it into a const 

// Create a let named addItemMode set to false
// This variable will be used as a flag variable to 
// determine if you are in add item mode or not

// Create a const named prompts set to an object with
// 2 properties: 'new' and 'menu' set to a string of what
// you want each prompt to say

// Creat a const named toDos set to an empty
// array. This is where you will store your 
// to do items

// Use readline to create an interface. Save the 
// interface into a const named rl

// Display a message to the user welcoming them to the
// To Do List CLI

// Display the prompt to the user,
// it should be the menu prompt

// Create a readline event listener for the 'line'
// event. In the callback function do the following:

// In the event callback:
// remove any extra white space from the ends of 
// the input.
//
// if in add item mode add the input to the 
// to dos array
//
// else create a switch statement to handle
// the menu options
//
// After the if statement display the next prompt to
// the user


// Create a readline event listener for the 'close'
// event. In the callback function do the following:
//
// In the event callback display a message to the user
// Saying goodbye and thanks for using the CLI tool
//
// Exit the node process with a code of 0
