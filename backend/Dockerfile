FROM openjdk:17-jdk

RUN mkdir /app
WORKDIR /app

COPY ./target/WordAPI-0.0.1-SNAPSHOT.jar .
COPY ./src/main/java/dev/evanpolk/WordAPI/1-1000.txt /app/resources/

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "WordAPI-0.0.1-SNAPSHOT.jar"]