let favorites = JSON.parse(localStorage.getItem('flavorshare-favorites') || '[]');

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function isFavorite(recipeId) {
    return favorites.includes(recipeId);
}

function saveFavorites() {
    localStorage.setItem('flavorshare-favorites', JSON.stringify(favorites));
}

function toggleFavorite(recipeId) {
    if (favorites.includes(recipeId)) {
        favorites = favorites.filter((id) => id !== recipeId);
    } else {
        favorites.push(recipeId);
    }
    saveFavorites();
    renderFeaturedRecipes();
}

async function loadFeaturedRecipes() {
    try {
        const response = await fetch('/api/recipes');
        if (!response.ok) throw new Error('Unable to fetch recipes');
        const recipes = await response.json();
        const featured = recipes.slice(0, 6);
        renderFeaturedRecipes(featured);
    } catch (error) {
        console.error('Unable to load featured recipes', error);
        renderFeaturedRecipes([]);
    }
}

function renderFeaturedRecipes(recipes = []) {
    const grid = document.getElementById('featured-recipes-grid');
    if (!grid) return;

    if (!recipes.length) {
        grid.innerHTML = '<div class="empty-state">Recipes are not available right now. Please refresh the page.</div>';
        return;
    }

    grid.innerHTML = '';
    recipes.forEach((recipe) => {
        const card = document.createElement('article');
        card.className = 'recipe-card';
        const imageSrc = recipe.image || '/images/recipe-placeholder.svg';
        const favoriteClass = isFavorite(recipe.id) ? 'fav-icon active' : 'fav-icon';
        card.innerHTML = `
            <div class="card-media">
                <img src="${imageSrc}" alt="${escapeHtml(recipe.title)}">
                <button class="${favoriteClass}" type="button" aria-label="Favorite ${escapeHtml(recipe.title)}">
                    <i class="${isFavorite(recipe.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i>
                </button>
            </div>
            <div class="card-body">
                <h3>${escapeHtml(recipe.title)}</h3>
                <p>${escapeHtml(recipe.description || 'A delicious recipe shared by the community.')}</p>
                <div class="rating-stars">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                </div>
            </div>
        `;

        const favoriteButton = card.querySelector('.fav-icon');
        favoriteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleFavorite(recipe.id);
        });
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedRecipes();
});
