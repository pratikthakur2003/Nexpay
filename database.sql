-- Drop existing databases if they exist
DROP DATABASE IF EXISTS users_db;
DROP DATABASE IF EXISTS banks_db;
DROP DATABASE IF EXISTS othermodes_db;

-- Create new databases
CREATE DATABASE users_db;
CREATE DATABASE banks_db;
CREATE DATABASE othermodes_db;

-- Switch to users_db
USE users_db;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS merchant;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS ledger;

-- Create tables in users_db
CREATE TABLE merchant (
    merchantID INT AUTO_INCREMENT PRIMARY KEY,
    apiKey VARCHAR(255) NOT NULL UNIQUE,
    merchantName VARCHAR(255) NOT NULL,
    merchantEmail VARCHAR(255) NOT NULL,
    merchantPasswordHash VARCHAR(255) NOT NULL,
    merchantBalance DECIMAL(15, 2) NOT NULL,
    timeCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customer (
    customerID INT AUTO_INCREMENT PRIMARY KEY,
    customerName VARCHAR(255) NOT NULL,
    customerPhoneNo VARCHAR(20) NOT NULL,
    customerEmail VARCHAR(255) NOT NULL,
    timeCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    Sno INT AUTO_INCREMENT PRIMARY KEY,
    orderID VARCHAR(255) NOT NULL UNIQUE,
    apiKey VARCHAR(255) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(50) NOT NULL,
    callbackURL VARCHAR(255) NOT NULL,
    timeCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (apiKey) REFERENCES merchant(apiKey)
);

CREATE TABLE tokens (
    tokenID INT AUTO_INCREMENT PRIMARY KEY,
    orderID VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    timeCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expirationTime TIMESTAMP
);

CREATE TABLE ledger (
    transactionID INT AUTO_INCREMENT PRIMARY KEY,
    orderID VARCHAR(255) NOT NULL,
    merchantID INT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    mode VARCHAR(255) NOT NULL,
    status ENUM('pending', 'success', 'failed'),
    transactionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orderID) REFERENCES orders(orderID),
    FOREIGN KEY (merchantID) REFERENCES merchant(merchantID)
);

-- Switch to banks_db
USE banks_db;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS abc;
DROP TABLE IF EXISTS mno;
DROP TABLE IF EXISTS xyz;

-- Create tables in banks_db
CREATE TABLE abc (
    accountID INT AUTO_INCREMENT PRIMARY KEY,
    accountNo VARCHAR(20) NOT NULL UNIQUE,
    accountPassword VARCHAR(255) NOT NULL,
    transactionPassword VARCHAR(255) NOT NULL,
    accountName VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    creditCardNo VARCHAR(20),
    upiID VARCHAR(50),
    debitCardNo VARCHAR(20),
    accountBalance DECIMAL(15, 2) NOT NULL
);

CREATE TABLE mno (
    accountID INT AUTO_INCREMENT PRIMARY KEY,
    accountNo VARCHAR(20) NOT NULL UNIQUE,
    accountPassword VARCHAR(255) NOT NULL,
    transactionPassword VARCHAR(255) NOT NULL,
    accountName VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    creditCardNo VARCHAR(20),
    upiID VARCHAR(50),
    debitCardNo VARCHAR(20),
    accountBalance DECIMAL(15, 2) NOT NULL
);

CREATE TABLE xyz (
    accountID INT AUTO_INCREMENT PRIMARY KEY,
    accountNo VARCHAR(20) NOT NULL UNIQUE,
    accountPassword VARCHAR(255) NOT NULL,
    transactionPassword VARCHAR(255) NOT NULL,
    accountName VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    creditCardNo VARCHAR(20),
    upiID VARCHAR(50),
    debitCardNo VARCHAR(20),
    accountBalance DECIMAL(15, 2) NOT NULL
);

CREATE TABLE transactions (
    transactionID INT AUTO_INCREMENT PRIMARY KEY,
    orderID VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    username VARCHAR(255) NOT NULL,
    mode VARCHAR(255) NOT NULL,
    bankID VARCHAR(255) NOT NULL,
    bankName VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    transactionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data into banks_db tables
INSERT INTO abc (accountNo, accountPassword, transactionPassword, accountName, username, creditCardNo, upiID, debitCardNo, accountBalance) VALUES
('1234567890123456', 'alice@123', 'transPassAlice', 'Alice Johnson', 'alice_j', '4000123412341234', 'alice@upi', '4000123498761234', 10000.00),
('4567890123456789', 'david@123', 'transPassDavid', 'David Wilson', 'david_w', '4000123412347890', 'david@upi', '4000123498767890', 8000.00);

INSERT INTO mno (accountNo, accountPassword, transactionPassword, accountName, username, creditCardNo, upiID, debitCardNo, accountBalance) VALUES
('2345678901234567', 'bob@123', 'transPassBob', 'Bob Smith', 'bob_s', '4000123412345678', 'bob@upi', '4000123498765678', 15000.00),
('5678901234567890', 'eva@123', 'transPassEva', 'Eva Adams', 'eva_a', '4000123412348901', 'eva@upi', '4000123498768901', 20000.00);

INSERT INTO xyz (accountNo, accountPassword, transactionPassword, accountName, username, creditCardNo, upiID, debitCardNo, accountBalance) VALUES
('3456789012345678', 'charlie@123', 'transPassCharlie', 'Charlie Brown', 'charlie_b', '4000123412346789', 'charlie@upi', '4000123498766789', 12000.00);

-- Switch to othermodes_db
USE othermodes_db;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS upi;
DROP TABLE IF EXISTS creditCard;
DROP TABLE IF EXISTS debitCard;

-- Create tables in othermodes_db
CREATE TABLE upi (
    upiID VARCHAR(50) PRIMARY KEY,
    upiPin VARCHAR(10) NOT NULL,
    bankName VARCHAR(255) NOT NULL
);

CREATE TABLE creditCard (
    creditCardNo VARCHAR(20) PRIMARY KEY,
    expiryDate VARCHAR(5) NOT NULL,
    cvv VARCHAR(4) NOT NULL,
    creditBalance DECIMAL(15, 2) NOT NULL,
    bankName VARCHAR(255) NOT NULL
);

CREATE TABLE debitCard (
    debitCardNo VARCHAR(20) PRIMARY KEY,
    expiryDate VARCHAR(5) NOT NULL,
    cvv VARCHAR(4) NOT NULL,
    bankName VARCHAR(255) NOT NULL
);

-- Insert initial data into othermodes_db tables
INSERT INTO upi (upiID, upiPin, bankName) VALUES
('alice@upi', '1111', 'abc'),
('bob@upi', '2222', 'mno'),
('charlie@upi', '3333', 'xyz'),
('david@upi', '4444', 'abc'),
('eva@upi', '5555', 'mno');

INSERT INTO creditCard (creditCardNo, expiryDate, cvv, creditBalance, bankName) VALUES
('4000123412341234', '12/35', '123', 50000.00, 'abc'),
('4000123412345678', '01/26', '234', 100000.00,'mno'),
('4000123412346789', '02/26', '345', 50000.00, 'xyz'),
('4000123412347890', '03/25', '456', 100000.00,'abc'),
('4000123412348901', '04/27', '567', 50000.00, 'mno');

INSERT INTO debitCard (debitCardNo, expiryDate, cvv, bankName) VALUES
('4000123498761234', '12/25', '321', 'abc'),
('4000123498765678', '01/26', '432', 'mno'),
('4000123498766789', '02/26', '543', 'xyz'),
('4000123498767890', '03/25', '654', 'abc'),
('4000123498768901', '04/27', '765', 'mno');
