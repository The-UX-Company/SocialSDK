import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { followUser, unfollowUser } from '../api'; // Adjust the import path as necessary

const getCurrentUserId = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken.userId; // Assuming the token contains the user ID in a 'userId' field
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

const FollowComponent = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [targetUserId, setTargetUserId] = useState(null);
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    // Find the nearest parent element with a data-member-id attribute
    // This could be from a post, profile, or another component that embeds the FollowComponent
    const memberElement = document.querySelector('[data-member-id]');
    if (memberElement) {
      const memberId = memberElement.getAttribute('data-member-id');
      setTargetUserId(memberId);
      // Optionally, here you can add a check to see if the current user is already following the target user
    }
  }, [currentUserId]);

  const handleFollowClick = async () => {
    if (!targetUserId || !currentUserId) {
      console.log("Missing user ID information.");
      return;
    }

    if (isFollowing) {
      await unfollowUser(currentUserId, targetUserId);
      setIsFollowing(false);
    } else {
      await followUser(currentUserId, targetUserId);
      setIsFollowing(true);
    }
  };

  return (
    <button onClick={handleFollowClick} disabled={!targetUserId || !currentUserId}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowComponent;