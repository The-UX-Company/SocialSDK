

# SocialSDK Documentation

SocialSDK enables the rapid development of social platforms by providing a comprehensive set of components and an API for handling common tasks such as user authentication, profile management, posts creation, and file uploads.

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Components](#components)
  - [LogInBox](#loginbox)
  - [ProfileComponent](#profilecomponent)
  - [FollowComponent](#followcomponent)
  - [FeedComponent](#feedcomponent)
  - [PostCreationForm](#postcreationform)
  - [UploadComponent](#uploadcomponent)
  - [RegistrationComponent](#registrationcomponent)
- [Context](#context)
  - [AuthProvider](#authprovider)
- [API Services](#api-services)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Getting Started
This guide assumes that you have a basic understanding of React and its ecosystem. SocialSDK is designed to work within React applications and utilizes state management, context, and hooks extensively.

## Installation
To incorporate SocialSDK into your project, clone the repository or copy the desired components directly into your project structure. Ensure that all dependencies, particularly `axios` for API requests and `jwt-decode` for handling JWT tokens, are installed in your project:

```bash
npm install axios jwt-decode
```

If you're using environment variables (recommended for sensitive information like API keys), ensure they're properly configured in your environment or `.env` file.

## 1. Setting Up Your Development Environment

### 1.1 Install Node.js and npm
If you haven't already, download and install Node.js from [nodejs.org](https://nodejs.org/). npm (Node Package Manager) comes bundled with Node.js.

### 1.2 Create a New Project Directory
Open your terminal or command prompt, navigate to your desired location, and create a new directory for your project:
```bash
mkdir my-social-app
cd my-social-app
```

### 1.3 Initialize Your Project
Initialize a new Node.js project by running:
```bash
npm init -y
```

## 2. Installing the SocialSDK Package

### 2.1 Install SocialSDK Package
Install the SocialSDK package using npm:
```bash
npm install socialsdk
```

## 3. Obtaining and Setting Up Your API Key

### 3.1 Sign Up for an Account
If you haven't already, sign up for an account on the Social platform.

### 3.2 Obtain Your API Key
After signing up, navigate to your account settings or developer dashboard to obtain your API key.

### 3.3 Store Your API Key
For security reasons, it's best practice to store your API key in environment variables. Create a new file named `.env` in the root of your project directory and add your API key:
```
REACT_APP_API_KEY=your_api_key_here
```

## 4. Writing Your First Code

### 4.1 Create a JavaScript File
Create a new JavaScript file in your project directory. Let's name it `app.js`.

### 4.2 Import SocialSDK Components
In your `app.js` file, import the necessary components from the SocialSDK package:
```javascript
import {
  LogInBox,
  ProfileComponent,
  FollowComponent,
  FeedComponent,
  PostCreationForm,
  UploadComponent,
  RegistrationComponent
} from 'socialsdk';
```

### 4.3 Initialize Your API Base URL
Define your API base URL and API key:
```javascript
const API_BASE_URL = 'http://[DOMAIN]/api';
const API_KEY = process.env.REACT_APP_API_KEY;
```

### 4.4 Making API Requests
Implement API requests using the provided functions:
```javascript
// Example API call to login
export const login = (email, password, platform_id) => makeRequest('/members/login', 'post', {email, password, platform_id});
// Other API request functions...
```

### 4.5 Run Your Code
To test your setup, run your JavaScript file using Node.js:
```bash
node app.js
```

## Components

### LogInBox
Handles user login.
```jsx
<LogInBox platformId="yourPlatformId" />
```

### ProfileComponent
Displays user profile information, their posts, and followed users.
```jsx
<ProfileComponent userId="userId" platformId="platformId" />
```

### FollowComponent
Allows current users to follow or unfollow other users.
```jsx
<FollowComponent />
```

### FeedComponent
Renders a feed of posts, supports infinite scrolling.
```jsx
<FeedComponent />
```

### PostCreationForm
Form for creating new posts with support for text, photos, and videos.
```jsx
<PostCreationForm />
```

### UploadComponent
Handles file uploads to the server.
```jsx
<UploadComponent platformId="platformId" apiKey="apiKey" />
```

### RegistrationComponent
Enables new users to register on the platform.
```jsx
<RegistrationComponent platformId="yourPlatformId" />
```

## Context

### AuthProvider
Manages authentication state and provides login and logout functionalities. Wrap your application's root component with AuthProvider:
```jsx
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}
```

## API Services
Your backend services should be structured to handle requests for user registration, login, post creation, following users, and managing files. Ensure your API endpoints are secured and validate inputs to prevent unauthorized access and data breaches.

More detailed information and usage examples for each API service are available in the project's `api.js` file.

## Best Practices
- Use environment variables for sensitive information like API keys.
- Secure API endpoints using authentication and validate inputs to prevent SQL injection or other security threats.
- Utilize AuthProvider context to manage user authentication state across your application.

## Troubleshooting
- **Issue:** Authentication state does not persist on page reload.
  **Solution:** Use local storage, session storage, or cookies to store authentication tokens and validate them on the application's mount.

For further support, consider consulting React documentation or reaching out on platforms like Stack Overflow or GitHub discussions.