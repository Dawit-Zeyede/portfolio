# ALX Portfolio Project

This is a simple portfolio project created as part of my learning at ALX. It consists of a backend and a frontend to display a portfolio.

## Features
- **Backend:** Handles APIs and services like email and Twilio.
- **Frontend:** Simple and responsive interface built using React.

## How to Run the Project

### 1. Clone the Project
Run this command to clone the project:
git clone https://github.com/Dawit-Zeyede/portfolio.git

Then navigate into the project folder:
cd portfolio


### 2. Setup the Backend
- Go to the backend folder:
cd backend
- Install dependencies:
npm install

- Create a `.env` file inside the backend folder with the following details:
MONGO_URI=your_mongo_uri JWT_SECRET=your_jwt_secret TWILIO_SID=your_twilio_sid TWILIO_AUTH_TOKEN=your_twilio_auth_token TWILIO_PHONE_NUMBER=your_twilio_phone_number EMAIL_USER=your_email EMAIL_PASS=your_email_password PORT=5000

- Start the backend:
npm start

### 3. Setup the Frontend
- Navigate to the frontend folder:
cd ../frontend

- Install dependencies:
yarn install

- Start the frontend:
yarn start


### 4. View the Project
Open your browser and go to:
http://localhost:3000

## Project Structure
- **Backend:** Contains API logic, routes, and services.
- **Frontend:** React code for the portfolio UI.

## Usage
1. Start the backend first by running `npm start` in the backend folder.
2. Then start the frontend with `yarn start` in the frontend folder.
3. Open the browser to see the portfolio at `http://localhost:3000`.

