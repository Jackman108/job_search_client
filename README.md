# Job Search

## Description
This project is a full-stack web application built with React, TypeScript, and a variety of tools to facilitate a user-friendly interface for job seekers, recruiters, and subscription management. The project enables users to view job vacancies, submit feedback, manage resumes, handle payments, and manage subscriptions.

### Features:
- Job vacancy listings
- Feedback system for users
- Resume management
- Subscription management
- Payment tracking

## Technologies Used
- **React** (Frontend framework)
- **TypeScript** (Type-safe JavaScript)
- **React Router** (Routing)
- **Axios** (API requests)
- **React Query** (Data fetching and caching)
- **JWT** (Authentication)

## Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Environment Setup:
```bash
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8080

NODE_ENV === 'development'
```

### 4. Running the Application:
```bash
npm start
```

### 5. Build for Production:
```bash
npm run build
```

### 6. Run Tests:
```bash
npm test
```

### 7. Eject (Optional):
```bash
npm run eject
```

## File Structure
```bash
/src
    /api          - Contains API request helpers using Axios
    /components   - Reusable UI components
    /features     - Individual feature modules (e.g., Feedback, Vacancy, Resume)
    /providers    - React Context Providers for global state management
    /routes       - Defines application routes
    /services     - Business logic and service functions
    /widgets      - Generic layout and presentation components
    App.tsx       - Main application file
    index.tsx     - Entry point for React application
    /assets       - Static assets like images, styles, and fonts
```


## Dependencies
#### @tanstack/react-query: Data fetching and caching.
#### axios: HTTP client for making requests to the backend API.
#### jwt-decode: Decoding JWT tokens.
#### react-router-dom: Routing library for React.
#### typescript: TypeScript for type safety.

## License

This project is licensed under the **Proprietary License**. Please contact the repository owner for more details.

## Contributing

If you would like to contribute to this project, feel free to fork it and create a pull request. Make sure to follow the project's coding standards and include relevant tests for any new features or bug fixes.

---

This `README.md` is designed to give new developers and users a comprehensive overview of the project, its setup, and the folder structure. If you need to adjust or add any other details, feel free to customize it further!

Let me know if you need any changes or additions!
