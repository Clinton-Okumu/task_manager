# Task Manager

A full-stack task management application built with Spring Boot for the backend and Angular for the frontend. Users can register, log in, and manage their personal tasks with features like creating, updating, and deleting tasks.

## Features

- User registration and authentication using JWT tokens
- Secure task management (CRUD operations)
- Task statuses: PENDING, IN_PROGRESS, COMPLETED
- Responsive Angular frontend with Tailwind CSS
- H2 in-memory database for development

## Tech Stack

### Backend
- **Spring Boot** 3.5.6
- **Java** 21
- **Spring Data JPA** for data persistence
- **Spring Security** for authentication
- **H2 Database** for in-memory storage
- **JWT** for token-based authentication

### Frontend
- **Angular** 20
- **TypeScript**
- **Tailwind CSS** for styling
- **RxJS** for reactive programming

## Prerequisites

- Java 21 or higher
- Node.js 18 or higher
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd task_manager
   ```

2. Backend setup:
   - Navigate to the Backend directory: `cd Backend`
   - The project uses Maven wrapper, so no need to install Maven separately.

3. Frontend setup:
   - Navigate to the frontend directory: `cd ../frontend`
   - Install dependencies: `npm install`

## Running the Application

### Backend
1. From the Backend directory, run:
   ```
   ./mvnw spring-boot:run
   ```
2. The backend will start on `http://localhost:8080`
3. Default admin credentials: username `admin`, password `admin123`

### Frontend
1. From the frontend directory, run:
   ```
   npm start
   ```
2. The frontend will start on `http://localhost:4200`

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
  - Body: `{ "username": "string", "password": "string" }`
- `POST /auth/login` - Login user
  - Body: `{ "username": "string", "password": "string" }`
  - Returns: `{ "token": "jwt-token" }`

### Tasks (Requires JWT token in Authorization header)
- `POST /api/tasks` - Create a new task
  - Body: `{ "title": "string", "description": "string" }`
- `GET /api/tasks` - Get all tasks for the authenticated user
- `GET /api/tasks/{id}` - Get a specific task by ID
- `PUT /api/tasks/{id}` - Update a task
  - Body: `{ "title": "string", "description": "string", "status": "PENDING|IN_PROGRESS|COMPLETED" }`
- `DELETE /api/tasks/{id}` - Delete a task

## Usage

1. Open the frontend at `http://localhost:4200`
2. Register a new account or login with existing credentials
3. Once logged in, you can:
   - View your tasks in the task list
   - Create new tasks using the task form
   - Edit existing tasks by clicking on them
   - Delete tasks as needed
   - Update task statuses

## Database Schema

The application uses H2 database with the following schema:

- **users** table: id, username, password
- **tasks** table: id, title, description, status, user_id (foreign key to users)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure code quality
5. Submit a pull request

## License

This project is licensed under the MIT License.