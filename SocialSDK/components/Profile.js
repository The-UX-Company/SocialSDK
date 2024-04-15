import React, { useState, useEffect } from 'react';
import { getPosts, getMembersOnPlatform, followUser, unfollowUser } from '../api';
import FollowComponent from './FollowComponent';

const ProfileComponent = ({ userId, platformId }) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]); // Assuming we have a function to get users the current user is following

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch profile information
        const members = await getMembersOnPlatform(platformId);
        const userInfo = members.find(member => member.id === userId);
        setProfileInfo(userInfo || {});

        // Fetch posts by the user
        const userPosts = await getPosts(userId, platformId);
        setPosts(userPosts || []);

        // TODO: Fetch followed users
      } catch (error) {
        console.error("Failed to fetch data for profile:", error);
      }
    };

    fetchAllData();
  }, [userId, platformId]);

  // This handleFollowChange could be used for both follow and unfollow actions, depending on the current state
  const handleFollowChange = async (targetUserId, willFollow) => {
    try {
      if (willFollow) {
        await followUser(userId, targetUserId);
      } else {
        await unfollowUser(userId, targetUserId);
      }
      // Ideally, you would re-fetch followed users or update the state to reflect the change here
      // fetchFollowedUsers(); or setFollowedUsers([...followedUsers, targetUserId] or similar logic)
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {/* Profile info section */}
      <div>
        <p>Name: {profileInfo.name}</p>
        <p>Email: {profileInfo.email}</p>
        {/* Additional profile fields could be displayed here */}
      </div>
      {/* Posts listing */}
      <div>
        <h3>Posts</h3>
        {posts.map(post => (
          <div key={post.id}>{post.content}</div>
        ))}
      </div>
      {/* Followed users listing (placeholder functionality not implemented due to missing API function) */}
      <div>
        <h3>Followed Users</h3>
        {/* Assuming 'getFollowedUsers' returns full profiles, adjust accordingly if it returns IDs */}
        { followedUsers.map(user => (
          <div key={user.id}>{user.name}</div> 
        ))}
      </div>
      {/* Follow/Unfollow button for each user or global follow/unfollow not specified, so integrating existing FollowComponent */}
      <FollowComponent onChange={handleFollowChange} />
    </div>
  );
};

export default ProfileComponent;