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
    customerID INT NOT NULL,
    transactionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'success', 'failed'),
    FOREIGN KEY (orderID) REFERENCES orders(orderID),
    FOREIGN KEY (merchantID) REFERENCES merchant(merchantID),
    FOREIGN KEY (customerID) REFERENCES customer(customerID)
);

-- Switch to banks_db
USE banks_db;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS bob;
DROP TABLE IF EXISTS sbi;
DROP TABLE IF EXISTS hdfc;

-- Create tables in banks_db
CREATE TABLE bob (
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

CREATE TABLE sbi (
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

CREATE TABLE hdfc (
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
    transactionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(255) NOT NULL
);

-- Insert initial data into banks_db tables
INSERT INTO bob (accountNo, accountPassword, transactionPassword, accountName, username, creditCardNo, upiID, debitCardNo, accountBalance) VALUES
('1234567890123456', 'passAlice', 'transPassAlice', 'Alice Johnson', 'alice_j', '4000123412341234', 'alice@upi', '4000123498761234', 10000.00),
('4567890123456789', 'passDavid', 'transPassDavid', 'David Wilson', 'david_w', '4000123412347890', 'david@upi', '4000123498767890', 8000.00);

INSERT INTO sbi (accountNo, accountPassword, transactionPassword, accountName, username, creditCardNo, upiID, debitCardNo, accountBalance) VALUES
('2345678901234567', 'passBob', 'transPassBob', 'Bob Smith', 'bob_s', '4000123412345678', 'bob@upi', '4000123498765678', 15000.00),
('5678901234567890', 'passEva', 'transPassEva', 'Eva Adams', 'eva_a', '4000123412348901', 'eva@upi', '4000123498768901', 20000.00);

INSERT INTO hdfc (accountNo, accountPassword, transactionPassword, accountName, username, creditCardNo, upiID, debitCardNo, accountBalance) VALUES
('3456789012345678', 'passCharlie', 'transPassCharlie', 'Charlie Brown', 'charlie_b', '4000123412346789', 'charlie@upi', '4000123498766789', 12000.00);

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
    expiryDate DATE NOT NULL,
    cvv VARCHAR(4) NOT NULL,
    bankName VARCHAR(255) NOT NULL
);

CREATE TABLE debitCard (
    debitCardNo VARCHAR(20) PRIMARY KEY,
    expiryDate DATE NOT NULL,
    cvv VARCHAR(4) NOT NULL,
    bankName VARCHAR(255) NOT NULL
);

-- Insert initial data into othermodes_db tables
INSERT INTO upi (upiID, upiPin, bankName) VALUES
('alice@upi', '1111', 'BOB'),
('bob@upi', '2222', 'SBI'),
('charlie@upi', '3333', 'HDFC'),
('david@upi', '4444', 'BOB'),
('eva@upi', '5555', 'SBI');

INSERT INTO creditCard (creditCardNo, expiryDate, cvv, bankName) VALUES
('4000123412341234', '2025-12-31', '123', 'BOB'),
('4000123412345678', '2026-01-31', '234', 'SBI'),
('4000123412346789', '2026-02-28', '345', 'HDFC'),
('4000123412347890', '2025-03-31', '456', 'BOB'),
('4000123412348901', '2027-04-30', '567', 'SBI');

INSERT INTO debitCard (debitCardNo, expiryDate, cvv, bankName) VALUES
('4000123498761234', '2025-12-31', '321', 'BOB'),
('4000123498765678', '2026-01-31', '432', 'SBI'),
('4000123498766789', '2026-02-28', '543', 'HDFC'),
('4000123498767890', '2025-03-31', '654', 'BOB'),
('4000123498768901', '2027-04-30', '765', 'SBI');
