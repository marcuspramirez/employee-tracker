// Dependencies
var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_tracker_db"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add a Role, Department or Employee",
        "View a Role, Department or Employee",
        "Update Employee Roles",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add a Role, Department or Employee":
          add();
          break;

        case "View a Role, Department or Employee":
          view();
          break;

        case "Update Employee Roles":
          update();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function add() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to add?",
      choices: [
        "Role",
        "Department",
        "Employee",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Role":
          addRole();
          break;

        case "Department":
          addDepartment();
          break;

        case "Employee":
          addEmployee();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "What is the role title?",
        
      },
      {
        name: "roleSalary",
        type: "input",
        message: "What is the role salary?",
        
      },
      {

        name: "roleDepartmentID",
        type: "input",
        message: "What is the role's department ID?",
      
      }
    ])

}

// function addDepartment() {
//   inquirer
//     .prompt([
//       {
//         name: "roleTitle",
//         type: "input",
//         message: "What is the role title?",
        
//       },
//       {
//         name: "roleSalary",
//         type: "input",
//         message: "What is the role salary?",
        
//       },
//       {

//         name: "roleDepartmentID",
//         type: "input",
//         message: "What is the role's department ID?",
      
//       }
//     ])

// }


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
