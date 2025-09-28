# Fogis 2.0

| Name | github username |
|----------|----------|
| John Molin    | mojo0224   |
| Samuel Yousef    | SamuelAmsih   |
| Filip Yousif   | Itachi-nika   |
| Elias Dovkrans    | Dampish0  |


> **Important:** A zipped file in this directory contains a full local build, including the .env file required by the backend.

## Quick start

### Run frontend only
1. Open a terminal and run (RUN ONE BY ONE PLEASE):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Follow the link shown in the terminal to open the app in your browser. and voila you should see the beautiful frontend.

### Run backend only
1. Open a terminal and run (RUN ONE BY ONE PLEASE):
    ```bash
    cd backend
    npm run dev
    ```
2. The backend server will start and listen for requests. port 5001 is going to be used here.

### Run frontend and backend
#### The backend expects the fronted to be on port 5173.
1. In one terminal (RUN ONE BY ONE PLEASE):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. In a second terminal:
   ```bash
   cd backend
   npm run dev
   ```
   
Note: the backend only has implemented authentication (users, login, reset password, etc.).
However authentication is NOT enforced in each route so that you can test code and ui.
