CREATE DATABASE IF NOT EXISTS expense_db;
USE expense_db;

CREATE TABLE IF NOT EXISTS expenses (
                                        id INT PRIMARY KEY AUTO_INCREMENT,
                                        title VARCHAR(200) NOT NULL,
    amount DOUBLE NOT NULL,
    category VARCHAR(100) NOT NULL,
    date DATE NOT NULL
    );