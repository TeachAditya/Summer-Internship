import React from 'react';

export default function RecipeCard({ recipe, onViewDetails }) {
  const defaultImage = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="recipe-card">
      <div className="card-img-wrapper">
        <img
          src={recipe.image || defaultImage}
          alt={recipe.title}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        <span className="card-tag">{recipe.category || 'General'}</span>
      </div>
      <div className="card-content">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <div className="card-footer">
          <span className="cook-time">
            <i className="fa-regular fa-clock"></i> {recipe.cookTime || '20 min'}
          </span>
          <button className="view-btn" onClick={() => onViewDetails(recipe)}>
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
