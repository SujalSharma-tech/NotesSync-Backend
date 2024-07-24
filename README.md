
# 📝 NotesSync - Collaborative Note-Taking App

Welcome to **NotesSync**, a powerful and user-friendly note-taking app designed for seamless collaboration! 🚀

## Features

- 🗒️ **Create and Manage Notes**: Easily create, edit, and delete notes.
- 📂 **Organize with Folders**: Group your notes into folders for better organization.
- 📌 **Pin Notes**: Pin important notes to keep them at the top.
- 📅 **Date Range Selector**: Filter notes by a selected date range.
- 🗃️ **Archive Notes**: Archive notes that you want to access later.
- 🚮 **Trash Bin**: Recover deleted notes from the trash bin.
- 👫 **Collaborative Notes**: Share notes with other users by email and allow them to edit.
- 📜 **Shared Notes Management**: View and manage notes shared with others.

## Live Website

Check out the live version of the app: [NotesSync](https://notessync.netlify.app) 🌐

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas Account

### Installation

#### Frontend

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/SujalSharma-tech/NotesSync-Frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd NotesSync-Frontend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file and add your environment variables:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:4000
   ```

#### Backend

1. Clone the backend repository:
   ```bash
   git clone https://github.com/SujalSharma-tech/NotesSync-Backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd NotesSync-Backend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file and add your MongoDB Atlas connection string and other environment variables:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=4000
   ```

### Running the App

#### Backend

1. Start the backend server:
   ```bash
   npm start
   ```

#### Frontend

1. Start the frontend development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:1234`.

## API Endpoints

### User

- **Register**: `POST /api/v1/user/register`
- **Login**: `POST /api/v1/user/login`
- **Logout**: `GET /api/v1/user/logout`
- **Get Profile**: `GET /api/v1/user/getmyprofile`

### Notes

- **Create Note**: `POST /api/v1/note`
- **Get My Notes**: `GET /api/v1/note/mynotes`
- **Share Note**: `POST /api/v1/note/sharenote`
- **Remove User from Shared Note**: `POST /api/v1/note/removeshare`
- **Get Notes Shared With Me**: `GET /api/v1/note/sharedwithme`

### Folders

- **Create Folder**: `POST /api/v1/folder`
- **Get My Folders**: `GET /api/v1/folder/myfolders`

## Usage

### Creating a Note

1. Navigate to the home page.
2. Click on the "Add Note" button.
3. Enter the title and content of your note.
4. Save the note.

### Pinning a Note

1. Select a Note.
2. Click on the "Pin" button to pin the note.

### Archiving a Note

1. Select a Note.
2. Click on the "Archive" button to archive the note.

### Filtering Notes by Date Range

1. Use the date range selector on the home page.
2. Select the desired date range to filter the notes.

### Sharing a Note

1. Select a Note.
2. Click on the "Share" button.
3. Enter the email address of the user you want to share the note with and click Search.
4. Click "Share".

### Removing a User from a Shared Note

1. Open the shared note.
2. Click the "Remove" button next to the user's email address.

## Contributing

I welcome contributions! 🎉 Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

## License

This project is licensed under the ISC License. 📄

---

Made with ❤️ by [Sujal](https://github.com/SujalSharma-tech)
