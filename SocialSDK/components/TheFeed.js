import React, { useState, useEffect } from 'react';
import { getPosts } from '../api'; // Correct the import path as necessary

const FeedComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getPosts(undefined, platformId); // If platformId is available in this component's context
        setPosts(prevPosts => [...prevPosts, ...fetchedPosts]);
        setHasMore(fetchedPosts.length > 0);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setLoading(false);
      }
    };

    fetchAndSetPosts();
  }, [page]);

  // Detect when user scrolls to the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      setPage(prevPage => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          { post.contentType === 'text' && <p>{post.content}</p> }
          { post.contentType === 'photo' && <img src={post.content} alt="Post" /> }
          { post.contentType === 'video' && <video controls src={post.content}></video>}
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more posts to show.</p>}
    </div>
  );
};

export default FeedComponent;