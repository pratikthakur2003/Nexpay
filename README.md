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

## Features

### Core Features
- **User Authentication**: 
  - Secure user signup and login process
  - Role-based access control
  - Session management
  - Password encryption and security

- **API Integration**:
  - API key generation and management
  - Secure endpoint access
  - Rate limiting
  - Webhook support for transaction notifications

- **Payment Processing**:
  - Multiple payment methods support:
    - Credit Card
    - Debit Card
    - Net Banking
  - Real-time transaction simulation
  - Custom success/failure scenarios
  - Transaction status tracking

- **Security Features**:
  - End-to-end encryption
  - Public/Private key infrastructure
  - Secure data transmission
  - PCI DSS compliance simulation

- **Dashboard & Analytics**:
  - Transaction history
  - Payment analytics
  - Success/failure metrics
  - Settlement reports

### Technical Features
- RESTful API architecture
- Modular codebase structure
- Comprehensive error handling
- Detailed logging system
- Database optimization
- Caching mechanisms

## Technologies Used

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- React.js for dynamic UI components
- Material-UI for component styling
- Redux for state management
- Axios for API requests

### Backend
- Python 3.8+
- Flask framework
- MySQL database
- SQLAlchemy ORM
- JWT for authentication
- Bcrypt for password hashing

### Development Tools
- Git for version control
- Docker for containerization
- pytest for unit testing
- Swagger for API documentation
- Black for code formatting

## Team Members

Our dedicated team of developers bringing NexPay to life:

- **Pratik Thakur (Team Leader)**
  - Backend architecture
  - API development
  - Database design
  - System integration

- **Ovilash Jalui**
  - UI/UX design
  - Dashboard implementation
  - User experience optimization

- **Aayush Singh**
  - E-commerce integration
  - Payment flow implementation
  - Testing and documentation

- **Anjali Daftari**
  - MERN stack development
  - Frontend optimization
  - Component architecture

- **Pratigna Hirani**
  - Landing page design
  - Frontend development
  - UI component creation

## Project Structure

```
NexPay/
├── .gitignore                # Git ignore configuration
├── api/                      # API implementation directory
│   ├── bank/                # Bank API simulation
│   │   ├── hash/            # Encryption/decryption utilities
│   │   ├── routes.py        # Bank API routes
│   │   ├── static/          # Static assets for bank interface
│   │   ├── templates/       # HTML templates for bank pages
│   │   └── utils.py         # Utility functions
│   └── nexpay/              # NexPay core API
│       ├── assets/          # Application assets
│       ├── hash/            # Security implementations
│       ├── routes.py        # Main API routes
│       ├── static/          # Static files
│       ├── templates/       # HTML templates
│       └── utils.py         # Helper functions
├── app/                      # Main application directory
│   ├── models.py            # Database models
│   ├── routes.py            # Application routes
│   └── __init__.py          # Application initialization
├── database.sql             # Database schema
├── requirements.txt         # Python dependencies
└── run.py                   # Application entry point
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/pratikthakur2003/NexPay.git
cd NexPay
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Initialize the database:
```bash
mysql -u your_username -p < database.sql
```

## Usage

1. Start the application:
```bash
python run.py
```


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
