# My Fullstack Application

This project is a fullstack application consisting of a React frontend and a Spring Boot backend.

## Project Structure

```
my-fullstack-app
├── backend
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com
│   │   │   │       └── example
│   │   │   │           └── app
│   │   │   │               └── Application.java
│   │   │   └── resources
│   │   │       └── application.properties
│   │   └── test
│   │       └── java
│   │           └── com
│   │               └── example
│   │                   └── app
│   │                       └── ApplicationTests.java
│   ├── build.gradle
│   └── README.md
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── App.js
│   │   ├── index.js
│   │   └── components
│   │       └── ExampleComponent.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites

- Java 11 or higher
- Node.js and npm

### Backend Setup

1. Navigate to the `backend` directory.
2. Build the project using Gradle:
   ```
   ./gradlew build
   ```
3. Run the Spring Boot application:
   ```
   ./gradlew bootRun
   ```

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install the dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Testing

- Backend tests can be run using:
  ```
  ./gradlew test
  ```

## License

This project is licensed under the MIT License.
