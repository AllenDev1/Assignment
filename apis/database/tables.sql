
USE mydb;


CREATE TABLE IF NOT EXISTS Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS Teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS Assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    detail TEXT NOT NULL,
    due_date DATE NOT NULL
);


CREATE TABLE IF NOT EXISTS Submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    assignment_id INT NOT NULL,
    user_id INT NOT NULL,
    file VARCHAR(255) NOT NULL
);


ALTER TABLE Submissions
    ADD FOREIGN KEY (assignment_id) REFERENCES Assignments(id),
    ADD FOREIGN KEY (user_id) REFERENCES Students(id);
