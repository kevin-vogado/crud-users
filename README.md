# User Management System

This is a **React** application for managing users, built with **Material-UI** for design and **localStorage** for storing user data. The application allows you to **create**, **edit**, **delete**, and **view users** in a straightforward and user-friendly interface.

## Features

- **User CRUD Operations**: Create, Read, Update, Delete users.
- **Form Validation**: Input fields are validated to ensure that the user data is accurate and complete.
- **Local Storage Persistence**: User data is saved locally using the browser's localStorage.
- **Snackbar Notifications**: Popup messages provide feedback to users when an action is completed successfully or when an error occurs.
- **Modular Structure**: Well-organized components, services, and hooks for better maintainability.

## Getting Started

### Prerequisites

To run this project, you need to have **Node.js** and **npm** installed on your machine. If you don't have them, you can download them from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/user-management-app.git
   cd user-management-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:

```bash
npm start
```

The application will be available at **`http://localhost:3000`**.

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

This command will run all the unit tests defined for this project using **Jest** and **React Testing Library**.

## Project Structure

The project is organized in a modular manner to ensure scalability and maintainability:

```
├── src
│   ├── assets
│   ├── components
│   │   ├── UserForm
│   │   │   ├── UserForm.js
│   │   │   └── UserForm.test.js
│   │   ├── UserTable
│   │   │   ├── UserTable.js
│   │   │   └── UserTable.styles.js
│   ├── services
│   │   └── userService.js
│   ├── hooks
│   ├── App.js
│   ├── index.js
│   └── setupTests.js
```

### Key Directories

- **`components/`**: Contains all the reusable UI components, such as `UserForm` and `UserTable`.
- **`services/`**: Contains logic related to managing user data. The `userService.js` file provides functions to interact with `localStorage` for storing and retrieving user information.
- **`hooks/`**: Contains custom hooks to handle application state and side effects.
- **`assets/`**: Holds images, styles, and other assets.

## Available Scripts

- **`npm start`**: Runs the app in development mode.
- **`npm test`**: Launches the test runner.
- **`npm run build`**: Builds the app for production to the `build` folder.

## Features in Detail

### 1. **CRUD Operations**
- **Create**: Add a new user using the "Cadastrar Usuário" button.
- **Edit**: Modify user details by clicking on the "Consultar" button in the UserTable.
- **Delete**: Remove a user by clicking the "Deletar" button.

### 2. **Snackbar Feedback**
- **Real-time Notifications**: Added **Snackbar notifications** using Material-UI to provide feedback when an action succeeds or fails (e.g., saving, editing, or deleting a user).

### 3. **Form Validation**
- Implemented form validation for each user field, including **name, email, phone number**, and **birth date**. Users are notified when fields are missing or invalid.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Material-UI**: Used for component styling and providing a consistent design.
- **Jest** & **React Testing Library**: Used for testing components and ensuring application stability.
- **Day.js**: A lightweight library for date handling and formatting.

## Contributing

Contributions are welcome! To get started:

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a pull request**.
