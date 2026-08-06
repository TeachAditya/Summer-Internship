import { useEffect, useMemo, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'other', label: 'Other' }
];

const Explore = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('flavorshare-favorites') || '[]'));
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [view, setView] = useState('browse');
  const [statusMessage, setStatusMessage] = useState('Loading recipes…');
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    if (categoryParam) setCategory(categoryParam.toLowerCase());
  }, []);

  useEffect(() => {
    localStorage.setItem('flavorshare-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) throw new Error('Unable to fetch recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setStatusMessage('Unable to load recipes.');
      }
    };

    loadRecipes();
  }, []);

  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => {
        const recipeCategory = (recipe.category || 'Other').toLowerCase();
        const matchesCategory = category === 'all' || recipeCategory === category;
        const matchesSearch = `${recipe.title} ${recipe.description} ${recipe.category}`.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sort === 'az') return a.title.localeCompare(b.title);
        if (sort === 'newest') return Number(b.id || 0) - Number(a.id || 0);
        return 0;
      });
  }, [recipes, category, query, sort]);

  const toggleFavorite = (recipeId) => {
    setFavorites((current) =>
      current.includes(recipeId) ? current.filter((id) => id !== recipeId) : [...current, recipeId]
    );
  };

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeRecipeModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const handleSubmitRecipe = async (event) => {
    event.preventDefault();
    const payload = {
      title: event.target.recipeTitle.value.trim(),
      description: event.target.recipeDesc.value.trim(),
      category: event.target.recipeCategory.value,
      cookTime: event.target.cookTime.value.trim(),
      ingredients: event.target.ingredients.value.trim(),
      steps: event.target.steps.value.trim()
    };
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Unable to save recipe');
      event.target.reset();
      setView('browse');
      const data = await response.json();
      setRecipes((current) => [data, ...current]);
    } catch (error) {
      alert('There was a problem saving your recipe.');
    }
  };

  return (
    <div className="explore-wrapper">
      <aside className={`filter-sidebar ${view === 'browse' ? '' : 'is-hidden'}`} id="filter-sidebar">
        {['all', 'breakfast', 'lunch', 'dinner', 'dessert', 'other'].map((value) => (
          <button
            type="button"
            key={value}
            className={`filter-link ${category === value ? 'active' : ''}`}
            onClick={() => setCategory(value)}
          >
            {value === 'all' ? 'All' : value.charAt(0).toUpperCase() + value.slice(1)}
          </button>
        ))}
      </aside>
      <main>
        <div className="explore-header-controls">
          <div className="inner-search">
            <i className="fa-solid fa-search"></i>
            <input type="text" id="recipe-search" placeholder="Search recipes" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <div className="dropdowns-group">
            <select className="filter-dropdown" id="category-select" value={category} onChange={(event) => setCategory(event.target.value)}>
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select className="filter-dropdown" id="sort-select" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="default">Sort by</option>
              <option value="az">A-Z</option>
              <option value="newest">Newest</option>
            </select>
          </div>
          <button className="more-filters-btn" id="filter-toggle-btn" type="button" onClick={() => setView((current) => (current === 'browse' ? 'browse' : 'browse'))}>
            <i className="fa-solid fa-sliders"></i> Filters
          </button>
        </div>
        <div className="view-toggle">
          <button type="button" className={`view-toggle-btn ${view === 'browse' ? 'active' : ''}`} id="browse-btn" onClick={() => setView('browse')}>
            <i className="fa-solid fa-compass"></i> Browse Recipes
          </button>
          <button type="button" className={`view-toggle-btn ${view === 'share' ? 'active' : ''}`} id="share-btn" onClick={() => setView('share')}>
            <i className="fa-solid fa-plus"></i> Share Recipe
          </button>
        </div>
        {view === 'browse' ? (
          <section id="explore-view">
            <h2 className="page-title">EXPLORE RECIPES</h2>
            <div className="add-recipe-banner">
              <div>
                <h3>Share your own recipe</h3>
                <p>Add a new recipe and help the community discover your favorite dish.</p>
              </div>
              <button type="button" className="add-recipe-btn" onClick={() => setView('share')}>Share Your Recipe</button>
            </div>
            <div className="recipe-status">{filteredRecipes.length ? `${filteredRecipes.length} recipes found` : statusMessage}</div>
            <div className="explore-grid" id="recipe-grid">
              {filteredRecipes.length ? filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={{ ...recipe, isFavorite: favorites.includes(recipe.id) }}
                  onToggleFavorite={toggleFavorite}
                  onCardClick={() => openRecipeModal(recipe)}
                />
              )) : <div className="empty-state">No recipes match your filters or search terms.</div>}
            </div>
          </section>
        ) : (
          <section id="share-view">
            <div className="share-header">
              <button type="button" className="back-link-btn" onClick={() => setView('browse')}>
                <i className="fa-solid fa-arrow-left"></i> Back to Explore Recipes
              </button>
              <h2 className="share-page-title">Share Your Culinary Creation</h2>
              <p className="share-page-subtitle">Upload your recipe details, ingredients, and steps to inspire the community.</p>
            </div>
            <form className="recipe-form-card" id="recipe-form" onSubmit={handleSubmitRecipe}>
              <div className="form-section">
                <div className="section-title"><i className="fa-solid fa-utensils"></i> Basic Recipe Details</div>
                <div className="form-group">
                  <label htmlFor="recipe-title">Recipe Title *</label>
                  <input id="recipe-title" name="recipeTitle" type="text" placeholder="e.g. Creamy Garlic Pasta" required />
                </div>
                <div className="form-group">
                  <label htmlFor="recipe-desc">Short Description *</label>
                  <textarea id="recipe-desc" name="recipeDesc" rows="3" placeholder="Describe what makes this dish special..."></textarea>
                </div>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="recipe-category">Category *</label>
                    <select id="recipe-category" name="recipeCategory" required>
                      <option value="">Select Category</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dessert">Dessert</option>
                      <option value="dinner">Dinner</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cook-time">Cook Time</label>
                    <input id="cook-time" name="cookTime" type="text" placeholder="30 minutes" />
                  </div>
                </div>
              </div>
              <div className="form-section">
                <div className="section-title"><i className="fa-solid fa-list-check"></i> Ingredients</div>
                <div className="form-group">
                  <label htmlFor="ingredients">Ingredients *</label>
                  <textarea id="ingredients" name="ingredients" rows="4" placeholder="List ingredients, one per line"></textarea>
                </div>
              </div>
              <div className="form-section">
                <div className="section-title"><i className="fa-solid fa-pen-fancy"></i> Instructions</div>
                <div className="form-group">
                  <label htmlFor="steps">Step-by-Step Instructions *</label>
                  <textarea id="steps" name="steps" rows="5" placeholder="Write the cooking steps clearly..."></textarea>
                </div>
              </div>
              <div className="form-section">
                <div className="section-title"><i className="fa-solid fa-camera"></i> Photo Upload</div>
                <div className="form-group">
                  <label htmlFor="recipe-photo">Upload Recipe Photo</label>
                  <input id="recipe-photo" name="recipePhoto" type="file" />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setView('browse')}>Cancel</button>
                <button type="submit" className="btn-primary">Publish Recipe</button>
              </div>
            </form>
          </section>
        )}
      </main>
      {showModal && selectedRecipe && (
        <div className="recipe-modal-overlay" id="recipe-modal-overlay" role="dialog" aria-modal="true" onClick={(event) => {
          if (event.target.id === 'recipe-modal-overlay') {
            closeRecipeModal();
          }
        }}>
          <div className="recipe-modal" aria-labelledby="modal-title">
            <button type="button" className="modal-close" aria-label="Close recipe details" onClick={closeRecipeModal}>×</button>
            <div id="recipe-modal-content">
              <h2 id="modal-title">{selectedRecipe.title}</h2>
              <p className="modal-description">{selectedRecipe.description}</p>
              <div className="recipe-meta">
                <span>{selectedRecipe.category}</span>
                <span>{selectedRecipe.cookTime || 'N/A'}</span>
              </div>
              {selectedRecipe.ingredients && (
                <div className="modal-section">
                  <h3>Ingredients</h3>
                  <p>{selectedRecipe.ingredients}</p>
                </div>
              )}
              {selectedRecipe.steps && (
                <div className="modal-section">
                  <h3>Instructions</h3>
                  <p>{selectedRecipe.steps}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
