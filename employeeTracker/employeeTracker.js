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
      name: "add",
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
      switch (answer.add) {
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
        message: "What is the employee's role title?",

      },
      {
        name: "roleSalary",
        type: "input",
        message: "What is the employee's role salary?",

      },
      {

        name: "roleDepartmentID",
        type: "input",
        message: "What is the employee's department ID?",

      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new role into the db with that info
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.roleTitle,
          salary: answer.roleSalary,
          department_id: answer.roleDepartmentID
          
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee role was created successfully!");
          // re-prompt to the beginning question, "What do you want to do?"
          start();
        }
      );
    });

}





function addDepartment() {
  inquirer
    .prompt({
      name: "deptName",
      type: "input",
      message: "What is the name of the department which you are adding?",

    })
    .then(function(answer) {
      // when finished prompting, insert a new department into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          
          name: answer.deptName
          
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
          // re-prompt to the beginning question, "What do you want to do?"
          start();
        }
      );
    });
}




function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",

      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",

      },
      {

        name: "roleID",
        type: "input",
        message: "What is the employee's role ID?",

      },
      {

        name: "managerID",
        type: "input",
        message: "What is the employee's manager's ID?",

      }

    ])
    .then(function(answer) {
      // when finished prompting, insert a new employee info into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleID,
          manager_id: answer.managerID
          
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
          // re-prompt to the beginning question, "What do you want to do?"
          start();
        }
      );
    });

}

function view() {
  inquirer
    .prompt({
      name: "view",
      type: "list",
      message: "What would you like to view?",
      choices: [
        "View all employees",
        "View all employees by roles",
        "View all employees by departments",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.view) {
        case "View all employees":
          viewEmployees();
          break;

        case "View all employees by departments":
          viewDepartments();

          break;

        case "View all employees by roles":
          viewRoles();
          break;

        case "Exit":
          connection.end();
          break;
      }

    });
}

function viewEmployees() {

}

function viewDepartments() {

}

function viewRoles() {

}

function update() {
  inquirer
  .prompt({
    name: "updateRole",
    type: "input",
    message: "What is the employee's new role?",

  })
}


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
