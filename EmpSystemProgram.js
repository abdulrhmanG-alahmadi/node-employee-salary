/*
   IN ORDER TO RUN THE PROGRAM IN NODE.JS SERVER
   YOU MUST TO INSTALL THE FOLLOWING LIBRARIES AND PACKAGES:
   
   - Install node.js 
   - install npm 
   - install string-similarity
   - install prompt-sync
   
*/



// initilize the fs object(short for file system) module to enable file interaction(reading and writing)
const fs = require('fs');

// this variable will store the input file text data 
let dataStr = ''

// try and catch, to manage errors that may occur if the input file doesn't exit

try {
    // begin to read from the file, by using a readFileSync() method inside the fs object.
    const data = fs.readFileSync('input.txt');

    // if we reach here, it means the file exist and we store the data into data variable.
    // invoking toString method to get the text content of the input file
    // then store into dataStr 
    dataStr = data.toString();
} catch(error) {
    // if the file doesnt exits, we terminate the program
    console.error('File doesnt exit!'); // print message to console
    process.exit(1) // terminate program
}

// convert the file text content into array, based on the delimeter \n (new line)
let employeesArr = dataStr.split('\n');
// initilize a new map, that will map every name to a salary
let employeesMap = new Map();



// a loop to fill the map 
for(let i = 0; i < employeesArr.length; i++) {
    // split each line on the file text content into an array, based on the delimeter ','
    // therefore, first element = name, and second element = salary
    let currentEmp = employeesArr[i].split(',');
    
    // in order to fill a map, we use the set method, that takes the key as first parameter
    // and the value as a second parameter.
    // the mapped value will be converted into a integer
    employeesMap.set(currentEmp[0], parseInt(currentEmp[1]));
}

// a function the will return the menu string
function printMenu() {
    return `
    -------------------------------------------------------
    | 1: Get the salary of an employee:                   |
    | 2: Get the most similar name:                       |
    | 3: Get the sum, minimum and maximum of salaries     |
    | 4: Add new employee                                 |
    | 5: Delete an existing employee                      |
    | 6: Save the newer collection into a new file        |
    | 7: Exit application                                 |
    -------------------------------------------------------
    ** Choose an option: 
    `;
}

// inilizing an input scanner, from this object we would be able to inputs from the user.
// sigint: true object would allow the user to quit
let prompt = require('prompt-sync')({sigint: true});

// a flag to control the while loop
let exitProgram = false;

// while loop would keep printing the menu, and taking inputs from user.
while(!exitProgram) {

    // print the menu
    console.log(printMenu());

    // take an input from the user, using prompt method
    let option = prompt('> ');

    // based on the user input, we would do the following tasks:
    switch(Number(option)) { 
        
        case 1: { // find the salary of the selected employee

            // print new line
            console.log('\n');
            // get the employee name from the user, will be used to get the salary
            let empName = prompt('Enter Employee Name: ');
            // get salary
            getSalary(employeesMap, getNameSimilar(employeesMap, empName));
            
            break;
        }
        
        case 2: { // find the similar employee name

            // new line
            console.log('\n');
            // get employee name from the user
            let empName = prompt('Enter Employee Name: ');

            // get the similar one. if employee doesnt exist, the function will return -1
            console.log('\n' + getNameSimilar(employeesMap, empName));
            break;

        }
        case 3: { // print sum, min and max of salaries

            // new line
            console.log('\n');
            getSum(employeesMap); // sum
            getMin(employeesMap); // min
            getMax(employeesMap); // max
            break;
        }
        case 4: { // add new employee

            // new line
            console.log('\n');
            // get the employee name from user
            let empName = prompt('Enter New Employee Name: ');
            // get employee salary from user
            let empSalary = Number(prompt('Enter New Employee Salary: '));

            // add employee to the map, if employee already exists, 
            //this function will print an erro msg to the console   
            addEmployee(employeesMap, empName, empSalary);
            break;

        }
        case 5: { // delete employee
            // new line
            console.log('\n');
            
            // get employee name from user
            let empName = prompt('Enter Employee Name to delete: ');

            // delete employee, if employee doesnt exist, then print an error msg to the console.
            deleteEmployee(employeesMap, getNameSimilar(employeesMap, empName));
            break;

        }
        case 6: { // save the new collection into a new output file

            // first parameter is employee map and the second parameter is the file path to save into
            saveToFile(employeesMap, 'output.txt');
            break;

        }
        case 7: {
            // will terminate the while loop
            exitProgram = true;
            break;
        }
        default:
            // if the user selected a number outside the range, or from different type
            console.log('Select a number between 1 - 7');
            break;
    }
}


function getSalary(employeesMap, name) { 
    // first parameter is the employee map, second parameter is the name
    // this method will check of the employee exist, if yes then it will get the employee salary

    if(employeesMap.has(name)) // has() method that takes a key to check for existence

        // print the salary using get() method that takes the name as a key
        console.log(`\nSalary is: ${employeesMap.get(name)}`) 
    else 
        // employee not found
        console.log("\nEmployee doesn't exist!");
    
}

function getSum(employeesMap) {

    // inilize sum, it will be incremented later
    let sum = 0;

    // every map has a key and a value, we will use the enhanced loop to get these element speretaly 
    for (const [key, value] of employeesMap) { // [key = ahmed, value = 23];
        // for each iteration, key = name, value = salary

        // sum all the salaries
        sum += value;
    }
    // print the sum
    console.log(`\nSum is: ${sum}`);

}



function getMin(employeesMap) {

    // in order to calculate the minimum, we need to get all the values(salaries) of the map
    // into an array so that we can take the first element as the minimum, and thats what values()
    // function does. 
    // using destructing techinque, [min] = map.values() will gives the first value(salary)
    
    let [min] = employeesMap.values();


    for (const [key, value] of employeesMap) {
        // check for the minium value, 
        if(value < min) min = value;
    }
    // print minimum salary
    console.log(`\nMinimum is: ${min}`);

}

function getMax(employeesMap) {

    // same as getMin(), but here will comparing based on the bigger value.
    // using destructing tech to get the get first salary of the map.
    let [max] = employeesMap.values();

    for (const [key, value] of employeesMap) {
        // check for the bigger value
        if(value > max) max = value;
    }
    // print max
    console.log(`\nMaximum is: ${max}`);
}

function addEmployee(employeesMap, name, salary) {
    // using Has() to check if the employee exist
    // if yes, then dont add him into the map
    // if no, then use set method to add new emp in the map

    
    // check emp exist
    if(employeesMap.has(name)) 
        console.log('\nEmployee Already exist!');
    
    else if(isNaN(salary) || Number(salary) < 0) { 
        // check if the salary(type of string) is numeric using NaN(short for Not A Number)
        // or less than 0
        console.log("\nPlease write appropriate salary!");
        return;
    }
    else {
        // set() method to map a new new to a salary
        employeesMap.set(name, parseInt(salary));
        console.log("\nEmployee Added Successfully!");
    }
}

function deleteEmployee(employeesMap, name) {

    // using Has() to check if the employee exist
    // if yes, then delete him
    // if no, print error msg

    if(employeesMap.has(name)) {
        // delete() method which takes a key as a parameter and will delete it from map
        employeesMap.delete(name);
        
        console.log("\nEmployee Deleted Successfully!");
    }
    else 
        // employee not found
        console.log("\nEmployee Doesn't Exist");
}

function getNameSimilar(employeesMap, namePassed) {

    // using stringSimilarity library to check for string similiarity
    var stringSimilarity = require("string-similarity");
    
    // a loop for every pair of key and value(name and slary)
    // we will check the passed name, with the existed names inside the map
    for (const [key, value] of employeesMap) {
        // check similairty using compareTwoString() that will return a percentage number between 0,1
        // we compare a the current key with the passed parameter name.

        // compare the first name of the current emp that exists in the map, with the first name
        // of the inputed name, and the last name of current emp with the last name 
        // inputed name, so basically we divide the names into first and last and 
        // then compare
        
        let fNEmp = key.substring(0, key.indexOf(' ')); // curr emp F name
        let lNEmp = key.substring(key.indexOf(' '), key.length); // curr emp l name
        let fNpassed = namePassed.substring(0, key.indexOf(' ')); // f name of passed name
        let lNpassed = namePassed.substring(key.indexOf(' '), namePassed.length); // l n of passed name


        let EmpSmilarityPercent = stringSimilarity.compareTwoStrings(fNEmp.toLowerCase(), fNpassed.toLowerCase());
        let PassedNSimilarityPercent = stringSimilarity.compareTwoStrings(lNEmp.toLowerCase(), lNpassed.toLowerCase());

        // if similarity percentage is 50% and above return the current key.
        if (EmpSmilarityPercent >= 0.5 && PassedNSimilarityPercent >= 0.5) return key;
    }
    // no key has a similaruty of 50% and above, so return -1.
    return -1;
}


function saveToFile(employeesMap, fileSrc) {
    // here we will convert the map into a string, then we will using the fs object
    // to store the string into a new file.

    // the var that will store the data
    let employeeInfoStr = '';

    // looping 
    for (const [key, value] of employeesMap) {
        // store each name, and salary according the original format CSV
        employeeInfoStr += `${key}, ${value}\n`
    }
    // regex to remove the empty new lines, a way to trim the string.
    employeeInfoStr = employeeInfoStr.replace(/\n*$/, "");

    // finally, writing the string into a new file
    // try and catch to manage the errors.
    try {
        // fileSrc is the path of file, and the second parameter is the data to store.
        fs.writeFileSync(fileSrc, employeeInfoStr);

        // print a msg if no error happens
        console.log("\nFile has been saved");
    } 
    catch (error) {
        console.error("\nSomething went wrong, Cant write a new file!");
    } 
}