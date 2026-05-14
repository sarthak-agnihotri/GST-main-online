# GST Software
This project consists of a Node.js/Express backend and a React frontend.

## Prerequisites
Node.js installed
MongoDB installed and running

## Setup and Running


##Backend
1. Navigate to the backend directory:

```bash
    cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

 - Ensure `.env` file exists in `backend/` with the following content:
 ```env
      NODE_ENV=development
      PORT=5000
      MONGO_URI=mongodb://localhost:27017/gst_software
      JWT_SECRET=your_jwt_secret_key_here
 ```
4. Start the server:

```bash
npm start
```
The server will run on [http://localhost:5000](http://localhost:5000).

### Frontend

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the application:
    ```bash
    npm start
    ```

    The application will open in your browser at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `backend/`: Contains the Express server, API routes, controllers, and database models.
- `frontend/`: Contains the React application.
