# Login Backend Project

## Overview
This project is a robust backend implementation for user authentication, built using **Node.js**, **Express.js**, and a **configurable database**. It provides essential functionalities such as user registration, login, and logout, with secure password hashing using **bcrypt** and **JSON Web Tokens (JWT)** (WIP) for session management. This backend can be seamlessly integrated into any web application requiring user authentication.

## Features
---

- **User Registration**: Allows users to create an account with a unique email address and a securely hashed password.
- **User Login**: Authenticates users using their email and password, with password hashing implemented using bcrypt.
- **JWT Authentication**: Provides secure user sessions using JSON Web Tokens.
- **Express Routing**: Organized routing system implemented using Express.js, separating functionality into dedicated routes for user signup and login.
- **Configurable Database**: Supports multiple databases. Easily switch between databases by updating the configuration. Currently available databases:
  - ✅ **Supabase**: Open-source Firebase alternative with PostgreSQL.
  - ❌ **PostgreSQL**: Powerful, open-source relational database.
  - ❌ **MySQL**: Popular open-source relational database.
  - ❌ **SQLite**: Lightweight, file-based database.
  - ❌ **MongoDB**: NoSQL database.

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js**
- **pnpm** (Package manager)
- **Postman** or **Insomnia** (for testing the API)
- A database of your choice (e.g., Supabase, PostgreSQL, MySQL, etc.)

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/deep-vinci/login-backend.git
   ```
2. **Install Dependencies**:
   ```bash
   pnpm install
   ```
3. **Set Up Database**:
   - Update the `.env` file with your database connection details (e.g., Supabase URL, API key, etc.) and JWT secret key.
4. **Start the Server**:
   ```bash
   pnpm start
   ```
<!-- 
## Supported Databases
This project is designed to work with the following databases:
- **Supabase**: Open-source Firebase alternative with PostgreSQL.
- **PostgreSQL**: Powerful, open-source relational database.
- **MySQL**: Popular open-source relational database.
- **SQLite**: Lightweight, file-based database.
- **MongoDB**: NoSQL database (optional, if configured). -->
<!-- 
To switch databases, update the configuration files and install the appropriate database driver (e.g., `pg` for PostgreSQL, `mysql2` for MySQL, etc.). -->

## API Endpoints
- **Signup**: `POST http://localhost:3000/signup`
  - Request Body: User data in JSON format (e.g., name, email, password).
  - Response: User details with hashed password.
- **Login**: `POST http://localhost:3000/login`
  - Request Body: User credentials (email and password).
  - Response: JWT token for authenticated session.
- **Logout**: `GET http://localhost:3000/logout`
  - Response: Success message.

## Testing
Use tools like **Insomnia** or **Postman** to test the API endpoints. Ensure you have the correct request body and headers for each endpoint.

## Technologies Used
- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express.js**: Web framework for Node.js.
- **Supabase**: Open-source Firebase alternative for database and authentication.
- **Bcrypt.js**: Library for hashing passwords.
<!-- - **Jsonwebtoken**: JSON Web Token generation and verification. -->
- **pnpm**: Fast, disk-space-efficient package manager.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## Contact
For any inquiries or feedback, please reach out to [Deepak Jha](https://github.com/deep-vinci).

---

This README provides a comprehensive guide to understanding, setting up, and contributing to the Login Backend project. For more detailed information, refer to the project repository and the linked resources. Happy coding!

---

Let me know if you need further adjustments!