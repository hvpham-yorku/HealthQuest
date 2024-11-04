# HealthQuest Setup Guide

---

## 1. Frontend Setup

The frontend is the view layer of our application, where users interact with the interface. We will create a React application that allows users to input data (e.g., calorie and water intake) and submit it to the backend.

### Steps

1. **Initialize the React Application**  
   Open the terminal, navigate to your project directory, and run the following command to create a new React application:

   ```bash
   npx create-react-app health-quest-frontend
   ```

   This will create a folder named `health-quest-frontend` with the necessary files and directories for a basic React app.

2. **Set Up Folder Structure**  
In the `frontend/src` folder, restructure it to separate reusable components, main pages, and service functions as outlined:

```
frontend/
└── src/
    ├── components/         # For reusable components (e.g., forms, buttons)
    │   └── Header.js
    ├── pages/              # For main application pages
    │   ├── Dashboard.js
    │   ├── UserProfile.js
    │   └── HealthStats.js
    └── services/           # For API call functions
        └── userService.js
```

3. **Install Dependencies**  
   Install `axios` for making HTTP requests (read more on [HTTP requests with Axios](https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/#:~:text=Making%20an%20HTTP%20request%20is,post()%20.)):

   ```bash
   npm install axios
   ```

4. **Create a Form Component**  
   In the `components` folder, create `CalorieForm.js` to contain input fields for calorie and water intake.

5. **Run the Frontend Application**  
   Start the React application to ensure it’s working:

   ```bash
   npm start
   ```

   You should see the form component, allowing users to enter data and click "Submit."

---

## 2. Backend Setup

The backend is the controller and logic layer that processes user requests and interacts with the database. We’ll use Node.js and Express to handle incoming requests from the frontend.

### Steps

1. **Initialize the Backend Project**  
   In the main project directory, create a folder for the backend, navigate to it, and initialize a new Node.js project:

   ```bash
   mkdir health-quest-backend
   cd health-quest-backend
   npm init -y
   ```

2. **Install Required Packages**  
   Install `express` for setting up the server and `mongoose` for MongoDB interactions:

   ```bash
   npm install express mongoose dotenv
   ```

3. **Set Up Folder Structure**  
   Organize the `backend` code into folders for models, routes, and controllers:

```
backend/
├── models/            # MongoDB schemas
│   └── Data.js        # Example model for storing data
├── routes/            # API routes
│   └── dataRoutes.js  # Example route file
├── controllers/       # Request handling logic
│   └── dataController.js
└── .env               # Environment variables (e.g., database URL)
```

4. **Create a Basic Server in server.js**  
   In the `health-quest-backend` folder, create `server.js` to define the server’s structure.

5. **Create a Route and Controller**  
   Define a route and a controller to handle form submissions from the frontend in `routes/dataRoutes.js` and `controllers/dataController.js`.

---

## 3. Database Setup

The database serves as the model layer where data is stored. We’ll use MongoDB to store user data.

### Steps

1. **Create a MongoDB Account and Database**  
   Use MongoDB Atlas (a cloud-hosted MongoDB service). Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), set up a cluster, and obtain the connection URI.

2. **Configure Environment Variables**  
   Create a `.env` file in the `health-quest-backend` directory and add the database URI:

   ```plaintext
   DATABASE_URL=your_mongo_db_connection_uri
   ```

3. **Define the Data Model**  
   In `models/Data.js`, define a schema for storing calorie and water intake:

   ```javascript
   const mongoose = require('mongoose');

   const dataSchema = new mongoose.Schema({
     calorieIntake: Number,
     waterIntake: Number,
     date: {
       type: Date,
       default: Date.now,
     },
   });

   module.exports = mongoose.model('Data', dataSchema);
   ```

---

## Testing the Setup: Full MVC Connectivity

### Steps

1. **Start the Backend Server**  
   Run `server.js` to start the backend server:

   ```bash
   node server.js
   ```

2. **Submit Data from the Frontend**  
   Open the frontend in the browser by running `npm start` for React. Enter data in the form fields and submit. This should trigger a POST request to the backend.

3. **Verify Data in Database**  
   Open MongoDB (e.g., MongoDB Atlas or Compass) to confirm that the submitted data is correctly stored.

---

## Definition of Done for Setup

- **Frontend**: A functional React form that connects to the backend to submit data.
- **Backend**: An Express server that receives data from the frontend and saves it to MongoDB.
- **Database**: MongoDB is connected, and data is stored in the specified collection.

This setup ensures a connected MVC structure, allowing a user to submit information from the frontend, process it in the backend, and save it in the database, setting a strong foundation for Sprint 1. 

---
