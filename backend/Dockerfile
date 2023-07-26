FROM openjdk:17-oracle

WORKDIR app

ARG JAV_FILE=./build/libs/demo-0.0.1-SNAPSHOT.jar

COPY ${JAV_FILE} app.jar

ENTRYPOINT ["java","-jar","app.jar"]
