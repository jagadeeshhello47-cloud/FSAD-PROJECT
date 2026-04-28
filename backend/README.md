# FSAD Backend - Spring Boot

This is the Spring Boot backend for the FSAD Mutual Fund Project.

## Project Structure

```
backend/
├── src/
│   └── main/
│       ├── java/com/fsad/backend/
│       │   ├── BackendApplication.java    # Main application class
│       │   ├── config/
│       │   │   └── SecurityConfig.java     # Security & CORS configuration
│       │   ├── controller/
│       │   │   ├── AuthController.java     # Authentication endpoints
│       │   │   └── MutualFundController.java # Mutual fund endpoints
│       │   ├── entity/
│       │   │   ├── User.java                # User entity
│       │   │   ├── MutualFund.java         # Mutual fund entity
│       │   │   └── MutualFundNav.java       # NAV history entity
│       │   ├── repository/
│       │   │   ├── UserRepository.java
│       │   │   ├── MutualFundRepository.java
│       │   │   └── MutualFundNavRepository.java
│       │   └── service/
│       │       ├── UserService.java
│       │       └── MutualFundService.java
│       └── resources/
│           └── application.properties      # Application configuration
└── pom.xml                                  # Maven dependencies
```

## Prerequisites

- Java 17 or higher
- Maven 3.8+
- MySQL Database

## Configuration

Before running the application, update the database configuration in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/YOUR_DATABASE_NAME?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
```

## Running the Application

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/users` - Get all users
- `GET /api/auth/user/{userName}` - Get user by username

### Mutual Funds
- `GET /api/mf/funds` - Get all mutual funds
- `GET /api/mf/fund/{schemeCode}` - Get fund by scheme code
- `GET /api/mf/search?name={name}` - Search funds by name
- `GET /api/mf/fund-house/{fundHouse}` - Get funds by fund house
- `GET /api/mf/category/{category}` - Get funds by category
- `POST /api/mf/fund` - Save a mutual fund
- `DELETE /api/mf/fund/{id}` - Delete a fund

### NAV (Net Asset Value)
- `GET /api/mf/nav/{schemeCode}` - Get NAV history
- `GET /api/mf/nav/latest/{schemeCode}` - Get latest NAV
- `GET /api/mf/nav/range/{schemeCode}?startDate={date}&endDate={date}` - Get NAV by date range
- `POST /api/mf/nav` - Save NAV data

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (React dev server)

To add more origins, update the `SecurityConfig.java` file.

## Database Tables

The application will automatically create the following tables:
- `users` - User accounts
- `mutual_funds` - Mutual fund information
- `mutual_fund_nav` - NAV history data