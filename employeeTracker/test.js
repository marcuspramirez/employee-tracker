const inquirer = require('inquirer');
var mysql = require("mysql");
const data = [{ title: 'Yes', id: 3 }, { title: 'no', id: 1 }, { title: 'Maybe', id: 2 }];
const cleanedData = data.map(({ title: name, id: value }) => ({ name, value }));
// inquirer.prompt([{ type: 'list', name: 'id', message: 'Make your choice', choices: cleanedData }])
//     .then(({ id }) => console.log(id))

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    getRoles();

});

const promisifiedQuery = (query, options = []) => {
    return new Promise((reject, resolve) => {
        connection.query(query, options, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        })
    })
}

const get = (table) =>{
    try {
        return  await promisifiedQuery('SELECT * from ' + table);
    }
    catch (err) {
      console.log(err);
    }
}

const getRoles = async () => {
    return get('role');
}

getRoles();




