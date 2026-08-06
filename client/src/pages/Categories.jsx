const Categories = () => (
  <>
    <section className="category-hero">
      <h1>RECIPE CATEGORIES</h1>
      <p>Discover thousands of recipes compiled systematically by courses, methods, and specific flavor paths.</p>
    </section>
    <main className="categories-container">
      <div className="category-grid">
        <div className="category-card">
          <div className="icon-circle"><i className="fa-solid fa-egg"></i></div>
          <h3>Breakfast</h3>
          <p>Energizing morning starters and classic brunch delights.</p>
          <span className="recipe-counter">120 Recipes</span>
        </div>
        <div className="category-card">
          <div className="icon-circle"><i className="fa-solid fa-hamburger"></i></div>
          <h3>Lunch</h3>
          <p>Quick, healthy wraps, crisp salads, and afternoon meals.</p>
          <span className="recipe-counter">85 Recipes</span>
        </div>
        <div className="category-card">
          <div className="icon-circle"><i className="fa-solid fa-utensils"></i></div>
          <h3>Dinner</h3>
          <p>Hearty main courses, slow roasts, and artisan dinners.</p>
          <span className="recipe-counter">240 Recipes</span>
        </div>
        <div className="category-card">
          <div className="icon-circle"><i className="fa-solid fa-ice-cream"></i></div>
          <h3>Dessert</h3>
          <p>Sweet baked confections, pastries, and ice creams.</p>
          <span className="recipe-counter">195 Recipes</span>
        </div>
        <div className="category-card">
          <div className="icon-circle"><i className="fa-solid fa-seedling"></i></div>
          <h3>Vegetarian</h3>
          <p>Plant-based proteins and vitamin-dense organic fuel solutions.</p>
          <span className="recipe-counter">310 Recipes</span>
        </div>
        <div className="category-card">
          <div className="icon-circle"><i className="fa-solid fa-stopwatch"></i></div>
          <h3>Quick & Easy</h3>
          <p>Express recipes prepared flawlessly under 15 minutes.</p>
          <span className="recipe-counter">150 Recipes</span>
        </div>
        <div className="category-card">
          <div className="icon-circle"><i className="fa-solid fa-fish"></i></div>
          <h3>Seafood</h3>
          <p>Fresh marine proteins, dynamic baked fish, and seasonal options.</p>
          <span className="recipe-counter">95 Recipes</span>
        </div>
        <div className="category-card">
          <div className="icon-circle"><i className="fa-solid fa-mug-hot"></i></div>
          <h3>Drinks</h3>
          <p>Artisan hot brews, blended refreshing shakes, and mocktails.</p>
          <span className="recipe-counter">60 Recipes</span>
        </div>
      </div>
    </main>
  </>
);

export default Categories;
