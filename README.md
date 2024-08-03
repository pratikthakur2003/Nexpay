# NexPay – A Payment Gateway Simulator

## Project Overview

NexPay is a comprehensive payment gateway simulator designed to replicate the functionality of real-world payment systems. It allows developers to integrate a simulated payment process into their websites, providing an environment for testing and development without the need for real financial transactions.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Team Members](#team-members)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## Features

- **User Authentication**: Secure user signup and login process.
- **API Key Generation**: Developers can generate API keys for integrating NexPay with their websites.
- **Payment Modes**: Supports net banking, debit card, and credit card payment modes.
- **Transaction Processing**: Simulates transaction processing and redirects users to success or failure pages based on transaction outcomes.
- **Dashboard**: Provides a dashboard for users to view transaction history and statuses.
- **Encryption**: Ensures data security through encryption.
- **API Abstraction**: Separates Nexpay API and Bank API for modularity and security.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, React.js
- **Backend**: Flask, MySQL
- **Others**: MERN Stack (MongoDB, Express.js, React.js, Node.js)

## Team Members

- **Pratik Thakur (Team Leader)**: Backend development, Nexpay API, Bank API, Database schema.
- **Ovilash Jalui**: UI/UX design, Nexpay Dashboard development.
- **Aayush Singh**: E-commerce website development, Nexpay integration.
- **Anjali Daftari**: E-commerce website creation (MERN stack).
- **Pratigna Hirani**: Nexpay landing page design and development, e-commerce contributions.

## Project Structure
        NexPay/
        ├── .gitignore
        ├── api
        │ ├── bank
        │ │ ├── hash
        │ │ │ ├── decrypt.py
        │ │ │ ├── private.pem
        │ │ ├── routes.py
        │ │ ├── static
        │ │ │ ├── css
        │ │ │ │ ├── bankLogin.css
        │ │ │ │ ├── bankMain.css
        │ │ │ │ ├── card.css
        │ │ │ ├── js
        │ │ │ ├── bankLogin.js
        │ │ │ ├── bankMain.js
        │ │ │ ├── card.js
        │ │ ├── templates
        │ │ │ ├── bankLogin.html
        │ │ │ ├── bankMain.html
        │ │ │ ├── card.html
        │ │ ├── utils.py
        │ │ └── init.py
        │ ├── nexpay
        │ │ ├── assets
        │ │ │ └── favicon.png
        │ │ ├── hash
        │ │ │ ├── encrypt.py
        │ │ │ ├── public.pem
        │ │ ├── routes.py
        │ │ ├── static
        │ │ │ ├── css
        │ │ │ │ ├── paymentFailure.css
        │ │ │ │ ├── paymentForm.css
        │ │ │ │ ├── paymentSuccess.css
        │ │ │ ├── js
        │ │ │ └── paymentForm.js
        │ │ ├── templates
        │ │ │ ├── allTables.html
        │ │ │ ├── paymentFailure.html
        │ │ │ ├── paymentForm.html
        │ │ │ ├── paymentSuccess.html
        │ │ ├── utils.py
        │ │ └── init.py
        ├── app
        │ ├── models.py
        │ ├── routes.py
        │ └── init.py
        ├── database.sql
        ├── requirements.txt
        └── run.py
