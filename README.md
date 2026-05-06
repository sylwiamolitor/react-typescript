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
Define the following environment variables in a `.env` file (you can use `.env.example` as a reference):

- `DATABASE_HOST` — e.g. `postgres`
- `DATABASE_PORT` — e.g. `5432`
- `DATABASE_NAME` —  e.g. `postgres`
- `DATABASE_USERNAME` — e.g. `postgres`
- `DATABASE_PASSWORD` — e.g. `password`

Ensure the database is accessible and credentials are correct.

To build and start the services (run from the repository root):
```bash
docker compose --env-file .env up --build
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


