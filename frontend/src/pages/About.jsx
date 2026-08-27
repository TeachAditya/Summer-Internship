import React from 'react';

export default function About() {
  return (
    <div className="section-layout" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 className="section-title" style={{ fontSize: '36px', textAlign: 'center', marginBottom: '16px' }}>
        About FlavorShare
      </h1>
      <p style={{ fontSize: '18px', textAlign: 'center', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '40px' }}>
        We are on a mission to ignite passion in home kitchens by making recipe discovery, culinary learning, and recipe sharing effortless and joyful.
      </p>

      <div style={{ backgroundColor: '#ffffff', padding: '36px', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: 'var(--primary)' }}>Our Vision</h2>
        <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--text-dark)' }}>
          Food brings people together across cultures and continents. FlavorShare was created to eliminate the clutter of traditional recipe sites and replace it with a clean, interactive, community-driven platform where everyone—from beginners to experienced cooks—can discover delicious recipes and share their own kitchen creations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
          <i className="fa-solid fa-fire" style={{ fontSize: '32px', color: 'var(--accent)', marginBottom: '12px' }}></i>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>5,000+</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Tested Recipes</p>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
          <i className="fa-solid fa-users" style={{ fontSize: '32px', color: 'var(--primary)', marginBottom: '12px' }}></i>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>10,000+</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Active Cooks</p>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
          <i className="fa-solid fa-earth-americas" style={{ fontSize: '32px', color: '#3b82f6', marginBottom: '12px' }}></i>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>40+</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Global Cuisines</p>
        </div>
      </div>
    </div>
  );
}
