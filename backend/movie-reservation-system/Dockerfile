# Use a JDK base image
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy JAR file (make sure it's built first with `mvn clean package`)
COPY target/*.jar app.jar

# Expose the backend port
EXPOSE 8080

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]