import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import RecipeDetailModal from '../components/RecipeDetailModal';

export default function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const recipes = await fetchRecipes();
        setFeaturedRecipes(recipes.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  const cooks = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-content">
          <h1>SHARE YOUR FLAVOR.<br />DISCOVER & CREATE.</h1>
          <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '28px' }}>
            Join thousands of passionate home chefs sharing their favorite recipes daily.
          </p>
          <Link to="/explore" className="hero-btn">
            Explore Recipes Now
          </Link>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="section-layout">
        <h2 className="section-title">FEATURED RECIPES</h2>
        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading featured recipes...</p>
        ) : (
          <div className="recipe-grid">
            {featuredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onViewDetails={setSelectedRecipe}
              />
            ))}
          </div>
        )}
      </section>

      {/* Categories Quick Bar */}
      <section className="categories-strip">
        <h2 className="section-title" style={{ marginBottom: '20px' }}>POPULAR CATEGORIES</h2>
        <div className="categories-flex">
          <Link className="category-node" to="/explore?category=breakfast">
            <div className="icon-wrapper"><i className="fa-solid fa-egg"></i></div>
            <span>Breakfast</span>
          </Link>
          <Link className="category-node" to="/explore?category=lunch">
            <div className="icon-wrapper"><i className="fa-solid fa-burger"></i></div>
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
            <span>Snacks</span>
          </Link>
        </div>
      </section>

      {/* Trending Community Cooks */}
      <section className="section-layout">
        <h2 className="section-title">TRENDING COMMUNITY COOKS</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          {cooks.map((src, i) => (
            <div key={i} style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--primary)' }}>
              <img src={src} alt="Chef" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
          <div style={{ marginLeft: '10px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: '700' }}>Join 10,000+ Food Enthusiasts</h4>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Share your own kitchen creations and connect with culinary artists.</p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
