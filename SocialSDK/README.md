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