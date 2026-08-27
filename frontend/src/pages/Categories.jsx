import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Categories() {
  const navigate = useNavigate();

  const categoryList = [
    {
      id: 'breakfast',
      title: 'Breakfast & Brunch',
      desc: 'Bright morning dishes, fluffy pancakes, egg bowls & fresh smoothies.',
      icon: 'fa-egg',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'lunch',
      title: 'Lunch Specialties',
      desc: 'Healthy salads, savory pasta bowls, gourmet sandwiches & soups.',
      icon: 'fa-burger',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'dinner',
      title: 'Hearty Dinners',
      desc: 'Glazed salmon, creamy garlic pasta, roasted meats & curry bowls.',
      icon: 'fa-utensils',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'dessert',
      title: 'Decadent Desserts',
      desc: 'Warm molten lava cakes, fruit tarts, cookies & sweet baked goods.',
      icon: 'fa-ice-cream',
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'other',
      title: 'Snacks & Breads',
      desc: 'Garden herb focaccia, flatbread bites, dips, appetizers & snacks.',
      icon: 'fa-cookie',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="section-layout">
      <h1 className="section-title" style={{ fontSize: '32px', textAlign: 'center', marginBottom: '10px' }}>
        Recipe Categories
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px', fontSize: '16px' }}>
        Browse our curated collection of recipes organized by meal time and craving.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {categoryList.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/explore?category=${cat.id}`)}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-light)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            className="recipe-card"
          >
            <div style={{ height: '180px', overflow: 'hidden' }}>
              <img src={cat.image} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div className="icon-wrapper" style={{ width: '36px', height: '36px', fontSize: '15px' }}>
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700' }}>{cat.title}</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                {cat.desc}
              </p>
              <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px' }}>
                Explore Category &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
