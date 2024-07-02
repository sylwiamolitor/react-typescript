# List App
Application for organizing the fulfillment of duties.

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)


## General Information
The application allows the user to create a list of uncompleted tasks. The user can then delete them or promote them to a completed category by dragging and dropping. It is possible to change the name of the task or delete it.

## Technologies Used
React, Typescript, Docker.

## Features
* Addition of a task
* Deletion of a task
* Change of a task name
* Setting the task to "done" phrase
* Crossing out task

## Screenshots
![pic1](https://github.com/sylwiamolitor/react-typescript/assets/43808701/74a465f5-8171-4523-b604-46dbd9aaf914)


## Setup
Withour docker: use command `cd react-typescript` to move to the react-typescript directory and `npm start` to start the application. The application will be at the localhost:3000. If the application shows an error then run `npm install` before `npm start`.
Using docker: use command `cd react-typescript` to move to the react-typescript directory and `npm run build` to build the application, then `docker-compose up` to start. The application will be at the localhost:3000. The application can be stopped with the command `docker-compose down`.


## Usage
Enter a task name and click "GO" to add it. Click the trash icon to delete it. Click the edit icon to edit the task title. Click the check mark to cross out the task. Drag and drop a task to change its status.

## Project Status
Complete, dockerized.


## Room for Improvement
Add other modules.


