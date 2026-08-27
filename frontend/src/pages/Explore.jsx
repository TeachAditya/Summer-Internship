import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchRecipes, addRecipe } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import RecipeDetailModal from '../components/RecipeDetailModal';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'breakfast',
    cookTime: '',
    ingredients: '',
    steps: '',
    image: ''
  });
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { id: 'all', label: 'All Recipes' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'dessert', label: 'Dessert' },
    { id: 'other', label: 'Other / Snacks' }
  ];

  useEffect(() => {
    loadRecipes();
  }, [selectedCategory, searchTerm]);

  async function loadRecipes() {
    setLoading(true);
    try {
      const data = await fetchRecipes(selectedCategory, searchTerm);
      setRecipes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSearchParams(cat === 'all' ? {} : { category: cat });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!formData.title || !formData.ingredients || !formData.steps) {
      setFormError('Please fill in Title, Ingredients, and Steps.');
      return;
    }

    setSubmitting(true);
    try {
      const created = await addRecipe(formData);
      setFormSuccess('Recipe shared successfully!');
      setRecipes([created, ...recipes]);
      setFormData({
        title: '',
        description: '',
        category: 'breakfast',
        cookTime: '',
        ingredients: '',
        steps: '',
        image: ''
      });
      setTimeout(() => {
        setShowFormModal(false);
        setFormSuccess('');
      }, 1500);
    } catch (err) {
      setFormError(err.message || 'Failed to post recipe');
    } finally {
      setSubmitting(false);
    }
  };

  // Sort recipes logic
  const displayedRecipes = [...recipes].sort((a, b) => {
    if (sortBy === 'az') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="explore-wrapper">
      {/* Category Sidebar */}
      <aside className="filter-sidebar">
        <h4>Filter Categories</h4>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`filter-link ${selectedCategory === cat.id ? 'active' : ''}`}
            style={{ border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer' }}
          >
            {cat.label}
          </button>
        ))}
      </aside>

      {/* Main Explore Content */}
      <main className="explore-main">
        {/* Banner */}
        <div className="add-recipe-banner">
          <div>
            <h3>Share Your Own Recipe</h3>
            <p>Add your culinary masterpiece and share it with home chefs worldwide.</p>
          </div>
          <button className="add-recipe-btn" onClick={() => setShowFormModal(true)}>
            + Share Recipe
          </button>
        </div>

        {/* Controls Bar */}
        <div className="explore-header-controls">
          <div className="inner-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search recipes or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="dropdowns-group">
            <select
              className="filter-dropdown"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>

            <select
              className="filter-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default Sort</option>
              <option value="az">A - Z</option>
            </select>
          </div>
        </div>

        {/* Recipe Grid */}
        {loading ? (
          <p style={{ color: 'var(--text-muted)', padding: '40px 0' }}>Loading delicious recipes...</p>
        ) : displayedRecipes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff', borderRadius: '16px' }}>
            <i className="fa-solid fa-utensils" style={{ fontSize: '40px', color: 'var(--primary)', marginBottom: '16px' }}></i>
            <h3>No recipes found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search query or selected category.</p>
          </div>
        ) : (
          <div className="recipe-grid">
            {displayedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onViewDetails={setSelectedRecipe}
              />
            ))}
          </div>
        )}
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {/* Add Recipe Form Modal */}
      {showFormModal && (
        <div className="modal-overlay" onClick={() => setShowFormModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Share Your Culinary Creation</h2>
              <button className="modal-close-btn" onClick={() => setShowFormModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="modal-body">
              {formError && <div className="alert-message alert-error">{formError}</div>}
              {formSuccess && <div className="alert-message alert-success">{formSuccess}</div>}

              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label>Recipe Title *</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Creamy Tuscan Garlic Chicken"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleFormChange}>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="dessert">Dessert</option>
                      <option value="other">Other / Snack</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Cook Time</label>
                    <input
                      type="text"
                      name="cookTime"
                      placeholder="e.g. 30 minutes"
                      value={formData.cookTime}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Short Description</label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Briefly describe what makes this recipe special"
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label>Image URL (Optional)</label>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label>Ingredients (comma separated) *</label>
                  <textarea
                    name="ingredients"
                    rows="3"
                    placeholder="2 chicken breasts, 1 cup cream, 2 cloves garlic, fresh spinach..."
                    value={formData.ingredients}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Preparation Steps *</label>
                  <textarea
                    name="steps"
                    rows="4"
                    placeholder="1. Season the chicken... 2. Heat oil in skillet..."
                    value={formData.steps}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? 'Publishing...' : 'Publish Recipe'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
