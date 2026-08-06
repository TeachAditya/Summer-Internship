const Community = () => (
  <>
    <section className="community-banner">
      <h1>Welcome to the FlavorShare Hub</h1>
      <p>Connect with passionate home cooks, participate in seasonal cooking challenges, and discover authentic kitchen advice directly from the field.</p>
      <div className="community-metrics">
        <div className="metric-item">
          <span>12.5K</span>
          <label>Active Cooks</label>
        </div>
        <div className="metric-item">
          <span>45K</span>
          <label>Shared Recipes</label>
        </div>
        <div className="metric-item">
          <span>8.2K</span>
          <label>Daily Discussions</label>
        </div>
      </div>
    </section>
    <main className="community-container">
      <div>
        <h2 className="section-title">COMMUNITY STORIES & DISCUSSIONS</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-media">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" alt="Dish image" />
            </div>
            <div className="story-content">
              <div className="story-meta">10 min. Dinners</div>
              <h3>My Secret 3-Ingredient Quick Pantry Dinners</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="story-footer">
                <div className="author-info">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                  <span>Sarah Jenkins</span>
                </div>
                <div className="story-actions">
                  <span><i className="fa-regular fa-comment"></i> 24</span>
                  <span><i className="fa-regular fa-heart"></i> 142</span>
                </div>
              </div>
            </div>
          </div>
          <div className="story-card">
            <div className="story-media">
              <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80" alt="Bread image" />
            </div>
            <div className="story-content">
              <div className="story-meta">Master Sourdough</div>
              <h3>The Sourdough Troubleshooting Guide for Beginners</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="story-footer">
                <div className="author-info">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                  <span>David Miller</span>
                </div>
                <div className="story-actions">
                  <span><i className="fa-regular fa-comment"></i> 58</span>
                  <span><i className="fa-regular fa-heart"></i> 389</span>
                </div>
              </div>
            </div>
          </div>
          <div className="story-card">
            <div className="story-media">
              <img src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=500&q=80" alt="Baking image" />
            </div>
            <div className="story-content">
              <div className="story-meta">Baking Basics</div>
              <h3>Substituting Dairy in High-Altitude Pastries Successfully</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="story-footer">
                <div className="author-info">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
                  <span>Elena Rostova</span>
                </div>
                <div className="story-actions">
                  <span><i className="fa-regular fa-comment"></i> 19</span>
                  <span><i className="fa-regular fa-heart"></i> 95</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
);

export default Community;
