# node-employee-salary

This Node.js command line program allows the user to perform employee salary management tasks. The features include:

Get the salary of an employee
Find the most similar employee name
Get sum, minimum and maximum salaries
Add new employees
Delete an existing employee
Save the updated employee data to a new file
The program parses an input CSV file containing employee names and salaries. It stores the data in a Map data structure mapping names to salaries.

The user is presented with a menu and can select an option to perform one of the tasks. For example, to get an employee salary, the user enters the employee name and the function gets the corresponding salary from the Map.

Functions are defined to implement each task, such as getSalary(), getSum(), addEmployee(), etc.

The string-similarity library is used to find the most similar employee name.

The fs library is used to read data from the input file, and also to save the updated employee data to an output file.

Overall this program demonstrates a command line Node.js application that uses various Node features and libraries to implement a useful employee salary management tool.


