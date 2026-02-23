## Use a JDK base image
#FROM eclipse-temurin:25
#
## Set working directory
#WORKDIR /app
#
## Copy JAR file (make sure it's built first with `mvn clean package`)
#COPY target/*.jar app.jar
#
## Expose the backend port
#EXPOSE 8080
#
## Run the JAR
#ENTRYPOINT ["java", "-jar", "app.jar"]


# ---------- Stage 1: Build the app ----------
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /build

# Copy pom first (better caching)
COPY pom.xml .
RUN mvn -B -q -e -DskipTests dependency:go-offline

# Copy source
COPY src ./src

# Build jar
RUN mvn clean package -DskipTests


# ---------- Stage 2: Run the app ----------
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

# Copy jar from builder stage
COPY --from=builder /build/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
