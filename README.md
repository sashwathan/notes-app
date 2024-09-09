
# Notes App

This is a full-stack **Notes Application** built using **React** on the frontend and **Node.js** with **Express** on the backend. The app allows users to create, edit, delete, pin/unpin notes, and search for notes. It also includes user authentication and note management.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Backend API](#backend-api)
- [Frontend Components](#frontend-components)
- [License](#license)

## Features
- **User Authentication**: Secure login and user sessions.
- **Create/Edit Notes**: Users can add or edit their notes.
- **Delete Notes**: Ability to delete any note.
- **Pin/Unpin Notes**: Pin important notes to the top.
- **Search Notes**: Search for notes by title or content.
- **Responsive Design**: The app is designed to work on various screen sizes.

## Tech Stack
- **Frontend**:
  - React
  - Axios (for API requests)
  - React Icons (for icons)
  - Tailwind CSS (for styling)
  - Moment.js (for date formatting)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Database)
  - Mongoose (ORM)
  - JWT (for authentication)
  
## Setup and Installation

To get started with the project, follow these steps:

### Prerequisites
- **Node.js** (version 14 or higher)
- **MongoDB** (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/notes-app.git
   cd notes-app
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

#### Backend
1. Create a `.env` file in the `backend` folder and add the following environment variables:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

2. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

#### Frontend
1. Start the frontend React app:
   ```bash
   cd frontend
   npm start
   ```

2. The app should be running at:
   ```bash
   http://localhost:3000
   ```

### Backend API

The backend is a REST API built with Express. Below are some key endpoints.

- **GET /get-user**: Get the current authenticated user.
- **GET /get-notes**: Retrieve all notes of the logged-in user.
- **PUT /is-pinned/:noteId**: Pin/unpin a note.
- **POST /add-note**: Create a new note.
- **PUT /edit-note/:noteId**: Edit an existing note.
- **DELETE /delete-note/:noteId**: Delete a note by ID.
- **GET /search-notes?query=your-query**: Search notes by query.

### Frontend Components

#### Key Components:
- **Home.js**: The main dashboard where all notes are displayed, searched, and pinned/unpinned.
- **NoteCard.js**: Represents each note card with options to edit, delete, or pin/unpin.
- **Navbar.js**: Contains the search functionality and displays user info.
- **AddEditNotes.js**: Modal for adding or editing notes.
- **EmptyCard.js**: Displayed when there are no notes available.
  
### Pin/Unpin Functionality

The app allows users to pin or unpin a note by clicking on a pin icon. This action is handled by the following functions:
- **updateIsPinned** (Frontend): Sends an API request to toggle the `isPinned` state.
- **PUT /is-pinned/:noteId** (Backend): Handles the request to update the pin state in the database.

### Output
Login page:
![login page](https://github.com/user-attachments/assets/43f706fa-f10d-42e4-835a-cfc219954d6d)
Signup page:
![signu-](https://github.com/user-attachments/assets/3145be9c-df86-4f2d-9df8-1c3ca288bbb8)
Dashboard:
![dashboard](https://github.com/user-attachments/assets/de0fb654-7e67-4727-9091-b97e25df2882)
Adding notes modal:
![add](https://github.com/user-attachments/assets/b2b1bfb0-dc50-4889-b4c5-bcb50a8a2ae8)
Update notes modal:
![update](https://github.com/user-attachments/assets/b6bd5f30-8c1c-41c6-89ce-74b29eef8235)
delete notes:
![delete](https://github.com/user-attachments/assets/6a847988-04e4-4388-8ea6-70ad524b3c83)
search notes:
![search ](https://github.com/user-attachments/assets/dde50dc9-208c-4832-820f-79a67f1dfcc3)
