
# Health Insurance Project

## Overview

The Health Insurance Project is a web application built to manage health insurance policies. It uses React with Vite for the frontend, MySQL for the database, and Golang with GORM and Gin for the backend.

## Features

- User authentication and authorization.
- CRUD operations for health insurance policies.
- Database storage using MySQL.
- RESTful API endpoints for policy management.
- Frontend built with React and Vite for fast development and performance.

## Technologies Used

- Frontend:
  - React
  - Vite

- Backend:
  - Golang
  - Gin - A web framework for Golang
  - GORM - Object-relational mapping library

- Database:
  - MySQL

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm (for frontend development)
- Golang (for backend development)
- MySQL (for database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/health-insurance-project.git
   ```

2. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   go get ./...
   ```

4. Set up the database:
   - Create a MySQL database and update the database configuration in `backend/config/config.go` with your database credentials.

5. Start the backend server:

   ```bash
   go run main.go
   ```

6. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

7. Access the application in your web browser at `http://localhost:3000`.

## API Endpoints

- `GET /api/policies`: Get all health insurance policies.
- `GET /api/policies/:id`: Get a specific policy by ID.
- `POST /api/policies`: Create a new health insurance policy.
- `PUT /api/policies/:id`: Update an existing policy by ID.
- `DELETE /api/policies/:id`: Delete a policy by ID.

## Contributing

Contributions are welcome! If you would like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear and concise commit messages.
4. Push your branch to your fork.
5. Create a pull request to the `main` branch of this repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thank you to the open-source community for the tools and libraries used in this project.

## Contact

If you have any questions or need further assistance, feel free to contact us at [kishorework@email.com].
