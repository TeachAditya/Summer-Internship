import React from 'react';

export default function Services() {
  const services = [
    {
      icon: 'fa-calendar-days',
      title: 'Custom Meal Planning',
      desc: 'Tailored weekly meal plans built specifically for your dietary preferences, calorie targets, and cooking style.'
    },
    {
      icon: 'fa-chalkboard-user',
      title: 'Interactive Masterclasses',
      desc: 'Live virtual cooking workshops led by professional chefs to master knife skills, pasta making, and international cuisines.'
    },
    {
      icon: 'fa-kitchen-set',
      title: 'Recipe Development',
      desc: 'Partner with our culinary experts to craft, test, and standardize original branded recipes for your product or restaurant.'
    },
    {
      icon: 'fa-user-group',
      title: 'Community Culinary Hub',
      desc: 'Engage with top food creators, share kitchen secrets, receive constructive feedback, and build your culinary audience.'
    }
  ];

  return (
    <div className="section-layout">
      <h1 className="section-title" style={{ fontSize: '32px', textAlign: 'center', marginBottom: '10px' }}>
        Our Culinary Services
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px', fontSize: '16px' }}>
        Empowering home cooks, food enthusiasts, and brands with elite culinary guidance and services.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
        {services.map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#ffffff',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div
              className="icon-wrapper"
              style={{ width: '56px', height: '56px', fontSize: '22px', marginBottom: '20px' }}
            >
              <i className={`fa-solid ${item.icon}`}></i>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>{item.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
