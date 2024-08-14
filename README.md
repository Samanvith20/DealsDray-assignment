# DealsDray Employee Management System

## Project Overview

DealsDray Employee Management System is a full-stack web application designed to streamline employee data management. It provides a user-friendly interface for administrators to perform CRUD (Create, Read, Update, Delete) operations on employee records, along with authentication and authorization features.

## Features

- User Authentication (Login/Register)
- Dashboard with overview statistics
- Employee List with search functionality
- Create new employee records
- Edit existing employee information
- Delete employee records
- Image upload for employee profiles
- Responsive design for various screen sizes

## Technology Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB for database
- Mongoose ODM
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js 
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Samanvith20/DealsDray-assignment.git
   cd dealsdray-employee-management
   ```

2. Install dependencies for backend
   ```
   cd backend
   npm install
   ```

3. Install dependencies for frontend
   ```
   cd ../frontend
   npm install
   ```

4. Set up environment variables
   Create a `.env` file in the backend directory with the following:
   ```
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server
   ```
   cd backend
   npm start
   ```

6. Start the frontend application
   ```
   cd frontend
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Register a new account or log in with existing credentials.
2. Use the dashboard to navigate through different sections.
3. View the list of employees on the Employee List page.
4. Use the search functionality to find specific employees.
5. Click on 'Create Employee' to add a new employee record.
6. Edit or delete employee records as needed.

## API Endpoints

- POST `/api/v1/users/register` - Register a new user
- POST `/api/v1/users/login` - User login
- GET `/api/v1/users/getEmployee` - Get all employees
- POST `/api/v1/users/employees` - Create a new employee
- PUT `/api/v1/users/employees/:id` - Update an employee
- DELETE `/api/v1/users/employees/:id` - Delete an employee

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
