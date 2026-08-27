import React from 'react';

export default function RecipeDetailModal({ recipe, onClose }) {
  if (!recipe) return null;

  const defaultImage = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';

  const ingredientsList = recipe.ingredients
    ? recipe.ingredients.split(',').map((item) => item.trim())
    : [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{recipe.title}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="modal-body">
          <img
            src={recipe.image || defaultImage}
            alt={recipe.title}
            className="modal-recipe-img"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />

          <div className="recipe-meta-row">
            <span className="meta-badge">
              <i className="fa-solid fa-utensils"></i> {recipe.category}
            </span>
            <span className="meta-badge">
              <i className="fa-regular fa-clock"></i> {recipe.cookTime || '20 mins'}
            </span>
          </div>

          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
            {recipe.description}
          </p>

          <h3 className="modal-section-title">Ingredients</h3>
          {ingredientsList.length > 0 ? (
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', marginBottom: '20px', color: 'var(--text-dark)' }}>
              {ingredientsList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>{recipe.ingredients}</p>
          )}

          <h3 className="modal-section-title">Instructions / Steps</h3>
          <p style={{ lineHeight: '1.8', color: 'var(--text-dark)', whiteSpace: 'pre-line' }}>
            {recipe.steps}
          </p>
        </div>
      </div>
    </div>
  );
}
