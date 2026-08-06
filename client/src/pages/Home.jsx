import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loadFeaturedRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) throw new Error('Unable to fetch recipes');
        const data = await response.json();
        setRecipes(data.slice(0, 6));
      } catch (error) {
        setRecipes([]);
      }
    };

    loadFeaturedRecipes();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>SHARE YOUR FLAVOR.<br />DISCOVER & CREATE.</h1>
          <Link to="/explore" className="hero-btn">Join the Community</Link>
        </div>
      </section>

      <section className="section-layout">
        <h2 className="section-title">FEATURED RECIPES</h2>
        <div className="recipe-grid" id="featured-recipes-grid">
          {recipes.length ? recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          )) : (
            <div className="empty-state">Recipes are not available right now. Please refresh the page.</div>
          )}
        </div>
      </section>

      <section className="categories-strip">
        <h2 className="section-title">EXPLORE CATEGORIES</h2>
        <div className="categories-flex">
          <Link className="category-node" to="/explore?category=breakfast">
            <div className="icon-wrapper"><i className="fa-solid fa-egg"></i></div>
            <span>Breakfast</span>
          </Link>
          <Link className="category-node" to="/explore?category=lunch">
            <div className="icon-wrapper"><i className="fa-solid fa-hamburger"></i></div>
            <span>Lunch</span>
          </Link>
          <Link className="category-node" to="/explore?category=dinner">
            <div className="icon-wrapper"><i className="fa-solid fa-utensils"></i></div>
            <span>Dinner</span>
          </Link>
          <Link className="category-node" to="/explore?category=dessert">
            <div className="icon-wrapper"><i className="fa-solid fa-ice-cream"></i></div>
            <span>Dessert</span>
          </Link>
          <Link className="category-node" to="/explore?category=other">
            <div className="icon-wrapper"><i className="fa-solid fa-cookie"></i></div>
            <span>Community</span>
          </Link>
          <Link className="category-node" to="/explore?category=breakfast">
            <div className="icon-wrapper"><i className="fa-solid fa-seedling"></i></div>
            <span>Vegetarian</span>
          </Link>
          <Link className="category-node" to="/explore?category=breakfast">
            <div className="icon-wrapper"><i className="fa-solid fa-stopwatch"></i></div>
            <span>Quick & Easy</span>
          </Link>
        </div>
      </section>

      <section className="section-layout">
        <div className="split-grid">
          <div>
            <h2 className="section-title">TRENDING COOKS</h2>
            <div className="cooks-list">
              <div className="cook-profile">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Cook" />
              </div>
              <div className="cook-profile">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2f?auto=format&fit=crop&w=200&q=80" alt="Cook" />
              </div>
              <div className="cook-profile">
                <img src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=80" alt="Cook" />
              </div>
              <div className="cook-profile">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" alt="Cook" />
              </div>
              <div className="cook-profile">
                <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80" alt="Cook" />
              </div>
              <div className="cook-profile">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" alt="Cook" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="section-title">COMMUNITY STORIES</h2>
            <div className="stories-flex">
              <div className="story-block">
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" alt="Story Meal" />
                <div className="story-meta">10 min. Dinners</div>
                <h4>Lorem ipsum dolor</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
              </div>
              <div className="story-block">
                <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80" alt="Story Bread" />
                <div className="story-meta">Master Sourdough</div>
                <h4>Lorem ipsum dolor</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
