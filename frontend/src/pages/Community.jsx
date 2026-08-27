import React, { useState } from 'react';

export default function Community() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: 'Chef Sarah Jenkins',
      time: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      text: 'Just finished batch-baking sourdough focaccia with fresh rosemary and sea salt flakes! What is your go-to weekend bake?',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      likes: 24,
      liked: false
    },
    {
      id: 2,
      name: 'Marco Rossi',
      time: '5 hours ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      text: 'Pro tip for homemade pasta sauce: always save half a cup of starchy pasta water before draining! It creates an incredible silky emulsion with olive oil & parmesan.',
      likes: 58,
      liked: true
    }
  ]);

  const toggleLike = (id) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            liked: !p.liked,
            likes: p.liked ? p.likes - 1 : p.likes + 1
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="section-layout" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="section-title" style={{ fontSize: '32px', textAlign: 'center', marginBottom: '10px' }}>
        Community Feed
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px' }}>
        Connect, share kitchen tips, and view recent posts from home chefs around the globe.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {posts.map((post) => (
          <div key={post.id} className="community-card">
            <div className="user-info">
              <img src={post.avatar} alt={post.name} className="avatar-img" />
              <div>
                <div className="user-name">{post.name}</div>
                <div className="user-time">{post.time}</div>
              </div>
            </div>
            <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '12px' }}>{post.text}</p>
            {post.img && <img src={post.img} alt="Post asset" className="community-post-img" />}
            <div className="action-bar">
              <button
                className={`action-btn ${post.liked ? 'liked' : ''}`}
                onClick={() => toggleLike(post.id)}
              >
                <i className={`fa-${post.liked ? 'solid' : 'regular'} fa-heart`}></i>
                {post.likes} Likes
              </button>
              <button className="action-btn">
                <i className="fa-regular fa-comment"></i> Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
