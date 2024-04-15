import axios from 'axios';

const API_BASE_URL = 'http://[DOMAIN]/api';
const API_KEY = process.env.REACT_APP_API_KEY; // Accessing the API key from an environment variable

// Helper function to make API requests, now including the API key in the headers
const makeRequest = async (endpoint, method, data) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${API_KEY}`, // Including the API key in the headers
    };
    const response = await axios({ url, method, data, headers });
    return response.data;
  } catch (error) {
    console.error(`${endpoint} error:`, error.response && error.response.data ? error.response.data : error);
    throw error;
  }
};

import LogInBox from './SocialSDK/components/LogInBox';
import ProfileComponent from './SocialSDK/components/Profile';
import FollowComponent from './SocialSDK/components/FollowButton';
import FeedComponent from './SocialSDK/components/TheFeed';
import PostCreationForm from './SocialSDK/components/CreatePostForm';
import UploadComponent from './SocialSDK/components/UploadFile';
import RegistrationComponent from './SocialSDK/components/Register';
export {
  LogInBox,
  ProfileComponent,
  FollowComponent,
  FeedComponent,
  PostCreationForm,
  UploadComponent,
  RegistrationComponent
};

// Example API call to login
export const login = (email, password, platform_id) => makeRequest('/members/login', 'post', {email, password, platform_id});

// Register a new platform member
export const registerMember = (name, email, user_id, password, platform_id) => makeRequest('/members/register', 'post', {name, email, user_id, password, platform_id});

// Upload a file
// TODO: Write a front end implementation for file uploading
// TODO: Check member's ID + platform ID before uploading
export const uploadFile = (file, platform_id) => {
  const formData = new FormData();
  formData.append('file', file);
  // Include platform_id or any other data as needed
  formData.append('platform_id', platform_id);
  return makeRequest('/upload', 'post', formData, {headers: {'Content-Type': 'multipart/form-data'}});
};

// Create a platform
export const createPlatform = (name) => makeRequest('/platforms/create', 'post', {name});

// Add a member to a platform
export const addMemberToPlatform = (platform_id, userId) => makeRequest(`/platforms/${platform_id}/members/add`, 'post', {userId});

// Create a post
export const createPost = (platform_id, memberId, contentType, content) => makeRequest(`/platforms/${platform_id}/posts/create`, 'post', {memberId, contentType, content});

// Follow a user/member
export const followUser = (follower_id, followed_id) => makeRequest('/follow', 'post', {follower_id, followed_id});

// Unfollow a user/member
export const unfollowUser = (follower_id, followed_id) => makeRequest('/unfollow', 'post', {follower_id, followed_id});

export const setPermissions = (platform_id, contentType, allowed) => makeRequest(`/platforms/${platform_id}/permissions/set`, 'post', {contentType, allowed});

// Delete a platform
export const deletePlatform = (platform_id) => makeRequest(`/platforms/${platform_id}/delete`, 'delete');

// Get all posts, optionally filtered by member id or platform id
export const getPosts = (member_id, platform_id) => {
  let query = '';
  if (member_id) query += `?memberId=${member_id}`;
  if (platform_id) query += `${query ? '&' : '?'}platformId=${platform_id}`;
  return makeRequest(`/posts${query}`, 'get');
};

// Get all members on a platform
export const getMembersOnPlatform = (platform_id) => makeRequest(`/platforms/${platform_id}/members`, 'get');