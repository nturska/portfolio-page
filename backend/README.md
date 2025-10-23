# Backend Documentation

This is the backend part of the fullstack application built using Spring Boot. 

## Project Structure

- `src/main/java/com/example/app/Application.java`: The main entry point of the Spring Boot application.
- `src/main/resources/application.properties`: Configuration properties for the application.
- `src/test/java/com/example/app/ApplicationTests.java`: Unit tests for the Application class.

## Getting Started

To run the backend application, ensure you have Java and Gradle installed. 

1. Clone the repository.
2. Navigate to the `backend` directory.
3. Run the application using the command:
   ```
   ./gradlew bootRun
   ```

## Testing

To run the unit tests, use the command:
```
./gradlew test
```

## Dependencies

The backend uses various dependencies defined in the `build.gradle` file. Make sure to check it for any additional libraries that may be required.

## Configuration

You can configure the application settings in the `application.properties` file. Adjust the server port and database connection settings as needed.