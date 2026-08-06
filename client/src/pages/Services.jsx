const Services = () => (
  <>
    <section className="services-hero">
      <h1>Services</h1>
    </section>
    <main className="services-container">
      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon-box"><i className="fa-solid fa-pen-to-square"></i></div>
          <h3>Recipe Hosting</h3>
          <p>Share recipes, create profile hubs, and organize customized recipe slots effortlessly.</p>
        </div>
        <div className="service-card">
          <div className="service-icon-box"><i className="fa-solid fa-graduation-cap"></i></div>
          <h3>Cooking Classes</h3>
          <p>Online culinary workshops, real-time interactive mentoring, and beginner pathways.</p>
        </div>
        <div className="service-card">
          <div className="service-icon-box"><i className="fa-solid fa-gem"></i></div>
          <h3>Premium Features</h3>
          <p>Ad-free execution framework, customized dietary metrics, and smart automated meal planners.</p>
        </div>
        <div className="service-card">
          <div className="service-icon-box"><i className="fa-solid fa-comments"></i></div>
          <h3>Community Hub</h3>
          <p>Interactive cooking challenge forums, global network spaces, and shared critique rooms.</p>
        </div>
      </div>
      <div className="secondary-features-row">
        <div className="service-card">
          <div className="service-icon-box"><i className="fa-solid fa-user-shield"></i></div>
          <h3>Vegetarian Hub</h3>
          <p>Dedicated curated frameworks strictly tracking organic verification pipelines, green validation, and clean meat alternatives.</p>
        </div>
        <div className="service-card">
          <div className="service-icon-box"><i className="fa-solid fa-bolt"></i></div>
          <h3>Quick & Easy</h3>
          <p>Fast track cooking frameworks engineered specifically for micro-window timelines, express prep steps, and minimum cleanups.</p>
        </div>
      </div>
    </main>
  </>
);

export default Services;
