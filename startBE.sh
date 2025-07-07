#!/bin/bash
clear

BE_PROJECT_DIR="Backend/organisation/"

cd "$pwd$BE_PROJECT_DIR"

mvn clean install
mvn spring-boot:run

