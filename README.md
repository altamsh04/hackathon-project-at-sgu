# SGU Hackathon Project

## Problem Statement - Collaborative Project Management Tools for Remote Teams 

## Technologies Used

This project is built using the **MERN** stack:

- **MongoDB**: A NoSQL database for storing application data.
- **Express.js**: A web application framework for Node.js.
- **React**: A JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime environment that executes JavaScript code outside a web browser.

## Prerequisites

Before setting up the project, ensure that you have the following software installed on your machine:

- **Node.js** (version 14 or higher is recommended)
- **npm** (comes with Node.js) or **Yarn**

## Getting Started

Follow the steps below to set up and run the project.

### 1. Clone the Repository

If you haven't cloned the repository yet, you can do so with the following command:

```bash
git clone https://github.com/altamsh04/hackathon-project-at-sgu.git
cd hackathon-project-at-sgu
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies using npm or Yarn:

```bash
# Using npm
npm install
```

This command installs all the necessary packages listed in the `package.json` file.

### 3. Run the Development Server

To start the development server, use the following command:

```bash
# Using npm
npm run dev
```


## Project Structure

```
hackathon-project-at-sgu/
├── public/                # Static assets like images and icons
├── server/                # Server backend
├── src/
│   ├── assets/            # Local image files, fonts, etc.
│   ├── components/        # Reusable React components
│   ├── pages/             # Page-level components or views
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point for the React app
│   └── index.css          # Global styles
├── index.html             # Main HTML template
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration file
└── README.md              # Project documentation
```

### Key Files

- **`src/main.jsx`**: This is the entry point for your React application.
- **`src/App.jsx`**: The root component that contains the application's main layout.
- **`vite.config.js`**: Configuration file for Vite, where you can customize build and development settings.
- **`index.html`**: The HTML template used by Vite to serve your React application.
