# List App

A simple React + TypeScript application for organizing and tracking tasks.

## Table of Contents
- [General Information](#general-information)
- [Technologies](#technologies)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)

## General Information
This application lets a user create a list of tasks, edit titles, delete tasks, mark them as done (cross out), and move tasks between lists using drag-and-drop.

## Technologies
- React
- TypeScript
- Docker (optional)

## Features
- Add a task
- Edit a task title
- Delete a task
- Mark a task as done (cross out)
- Drag and drop to change task status

## Screenshots
![Screenshot](https://github.com/sylwiamolitor/react-typescript/assets/43808701/74a465f5-8171-4523-b604-46dbd9aaf914)

## Setup

Without Docker:
1. Open a terminal and run:
   ```bash
   cd react-typescript
   npm install
   npm start
   ```
2. Open your browser and go to `http://localhost:3000`.

With Docker:
1. Open a terminal and run:
   ```bash
   cd react-typescript
   npm run build
   docker-compose up
   ```
2. Open your browser and go to `http://localhost:3000`.
3. To stop the application, run:
   ```bash
   docker-compose down
   ```

## Usage
- To add a task, enter the task name in the input field and click the "GO" button.
- To delete a task, click the trash icon next to the task.
- To edit a task title, click the edit icon (pencil) next to the task.
- To mark a task as done, click the check mark icon next to the task.
- To change a task's status, drag and drop the task between different lists.

## Project Status
Complete, dockerized.

## Room for Improvement
- Add user authentication
- Implement task due dates and reminders
- Allow task categorization and filtering
- Enhance the user interface and experience


