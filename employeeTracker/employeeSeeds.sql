USE employee_tracker_db;

INSERT INTO department (name)
VALUES ("Executive Committee");

INSERT INTO department (name)
VALUES ("Rooms");

INSERT INTO department (name)
VALUES ("Sales & Marketing");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Food & Beverage");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marty", "Byrde", "1", "1"), ("Wendy", "Byrde", "2", "1"), ("Ruth", "Lagmore", "3", "1"), ("Jake", "Johnson", "4", "2"),
("Carmen", "Stricker", "5", "2");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", "250000", "1"), ("Front Office Director", "125000", "2"), ("Global Sales Leader", "100000", "3"), ("Accountant", "85000", "4"),
("Server", "45000", "5");


