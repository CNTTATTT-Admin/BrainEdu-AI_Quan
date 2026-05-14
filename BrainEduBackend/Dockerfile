# Giai đoạn 1: Build mã nguồn bằng Maven
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copy file cấu hình maven trước để tận dụng cache
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy toàn bộ code và build
COPY . .
RUN mvn clean package -DskipTests

# Giai đoạn 2: Chạy ứng dụng với image nhẹ
FROM amazoncorretto:17-alpine-jdk
WORKDIR /app

# Lấy file jar đã build từ giai đoạn 1 sang giai đoạn 2
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]