# Roxiller Assignment Solution

## Overview

This project is a full-stack application that manages product transactions. It allows users to view transactions, statistics, and visualizations of the data through pie and bar charts. The frontend is built with **React** using **Vite**, and the backend is developed using **Node.js** with **Express** and **MongoDB**.

## Features

- **View Transactions**: Paginated list of all transactions with search functionality.
- **Statistics**: Display total sales, sold items, and unsold items for a selected month.
- **Data Visualization**: Interactive pie and bar charts to represent product distribution and price ranges.

## Technologies Used

- **Frontend**: 
  - React
  - Vite
  - Tailwind CSS
  - Chart.js (for data visualization)
  
- **Backend**:
  - Node.js
  - Express
  - MongoDB (Mongoose)
  - Axios (for HTTP requests)

## Sample Screenshots

### Transactions Dashboard and Table

![Screenshot 2024-10-11 220414](https://github.com/user-attachments/assets/f29e8e36-77e1-44c3-8c21-0a59d53811d1)

### Statistics for Month

![Screenshot 2024-10-11 220428](https://github.com/user-attachments/assets/77896952-eddc-4e9a-ae85-2cdfc8775afc)

### Bar-Chart for Month

![Screenshot 2024-10-11 220442](https://github.com/user-attachments/assets/007edcad-ce63-41d3-97c0-54d065785aa3)

### Pie-Chart for Month

![Screenshot 2024-10-11 220455](https://github.com/user-attachments/assets/b2e19175-1817-47bc-9e3a-c9737f5f460b)



## Installation

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Steps to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/roxiller-assignment.git

2. Navigate to the Project Directory:

  ```cd roxiller-assignment```

3.Install backend dependencies:
  
  ```cd backend```
  
  ```npm install```

4.Set up the environment variables:

Create a .env file in the backend directory and add your MongoDB URI:

  ```MONGO_URI=mongodb://localhost:27017/your_db_name```

5.Seed the database with initial data:
  
  ```npx nodemon index.js```

6.Navigate back to the frontend directory:
  
  ```cd ../```

  `cd frontend`
  

7.Install frontend dependencies:

```npm install```

8.Run the application:

`npm run dev`

