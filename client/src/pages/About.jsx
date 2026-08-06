const About = () => (
  <>
    <section className="about-hero">
      <h1>About Us</h1>
    </section>
    <main className="content-container">
      <div className="about-row">
        <div className="text-panel">
          <h2>Our Story</h2>
          <p>From our kitchen to yours, welcome to our growing family! We started as a simple idea to share cherished recipes, which blossomed into a vibrant network. Here, culinary enthusiasts from all backgrounds comes together to document, share, and discover.</p>
          <p>Our mission is to celebrate the diversity of home cooking and connect peoples through the common language of food.</p>
        </div>
        <div className="img-panel">
          <img src="https://plus.unsplash.com/premium_photo-1681998566758-87acec86e3c4?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Team collaborating" />
        </div>
      </div>
      <div className="about-row reverse">
        <div className="img-panel">
          <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80" alt="Cooking team" />
        </div>
        <div className="text-panel">
          <h2>Passion for Food</h2>
          <p>More than just a database, this is a living archive of shared meals and moments. Food is culture, tradition, and a way to share your care. Whether food-based discovery, every recipe here has a story.</p>
          <p>Whether it's your grandmother's secret recipe or a quick weeknight dinner, share your passion, find inspiration, and cook something amazing with us.</p>
        </div>
      </div>
      <section className="cta-banner">
        <h2>Empowering Home Cooks</h2>
        <p>We are on a mission to give you the tools, inspiration and community support needed to master any dish with confidence. From beginner kitchen basics to advanced culinary techniques, we believe everyone has the potential to create something extraordinary.</p>
        <Link to="/" className="cta-btn">Join Our Community</Link>
      </section>
    </main>
  </>
);

export default About;
