let allRecipes = [];
let favorites = JSON.parse(localStorage.getItem('flavorshare-favorites') || '[]');
let activeCategory = 'all';
let activeQuery = '';
let activeSort = 'default';

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getCategoryLabel(category) {
    return String(category || 'Other').charAt(0).toUpperCase() + String(category || 'Other').slice(1);
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
    renderRecipes();
}

function getFilteredRecipes() {
    return allRecipes
        .filter((recipe) => {
            const matchesCategory = activeCategory === 'all' || (recipe.category || 'Other').toLowerCase() === activeCategory;
            const matchesQuery = `${recipe.title} ${recipe.description} ${recipe.category || ''}`.toLowerCase().includes(activeQuery);
            return matchesCategory && matchesQuery;
        })
        .sort((a, b) => {
            if (activeSort === 'az') {
                return a.title.localeCompare(b.title);
            }
            if (activeSort === 'newest') {
                return Number(b.id || 0) - Number(a.id || 0);
            }
            return 0;
        });
}

function renderRecipes() {
    const grid = document.getElementById('recipe-grid');
    const status = document.getElementById('recipe-status');
    if (!grid || !status) return;

    const recipes = getFilteredRecipes();

    if (!recipes.length) {
        grid.innerHTML = '<div class="empty-state">No recipes match your filters or search terms.</div>';
        return;
    }

    status.textContent = `${recipes.length} recipes found`;
    grid.innerHTML = recipes
        .map((recipe) => {
            const isFav = isFavorite(recipe.id);
            return `
                <article class="recipe-card">
                    <div class="card-media">
                        <img src="${recipe.image || '/images/recipe-placeholder.svg'}" alt="${escapeHtml(recipe.title)}">
                        <button class="fav-icon ${isFav ? 'active' : ''}" type="button" aria-label="Favorite ${escapeHtml(recipe.title)}">
                            <i class="${isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i>
                        </button>
                    </div>
                    <div class="card-body">
                        <h3>${escapeHtml(recipe.title)}</h3>
                        <p>${escapeHtml(recipe.description || 'A delicious recipe shared by the community.')}</p>
                        <div class="recipe-meta">
                            <span>${escapeHtml(getCategoryLabel(recipe.category))}</span>
                            <span>${escapeHtml(recipe.cookTime || 'N/A')}</span>
                        </div>
                    </div>
                </article>
            `;
        })
        .join('');

    grid.querySelectorAll('.recipe-card').forEach((card, index) => {
        const recipe = recipes[index];
        const favButton = card.querySelector('.fav-icon');
        if (favButton) {
            favButton.addEventListener('click', (event) => {
                event.stopPropagation();
                toggleFavorite(recipe.id);
            });
        }
    });
}

async function loadRecipes() {
    try {
        const response = await fetch('/api/recipes');
        if (!response.ok) throw new Error('Unable to fetch recipes');
        allRecipes = await response.json();
        renderRecipes();
    } catch (error) {
        document.getElementById('recipe-status').textContent = 'Unable to load recipes.';
        document.getElementById('recipe-grid').innerHTML = '<div class="empty-state">Please try again later.</div>';
    }
}

function setupFilterControls() {
    const searchInput = document.getElementById('recipe-search');
    const categorySelect = document.getElementById('category-select');
    const sortSelect = document.getElementById('sort-select');
    const filterLinks = document.querySelectorAll('.filter-link');
    const filterToggleBtn = document.getElementById('filter-toggle-btn');

    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
        activeCategory = categoryParam.toLowerCase();
        if (categorySelect) categorySelect.value = activeCategory;
        filterLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.category === activeCategory);
        });
    }

    searchInput?.addEventListener('input', (event) => {
        activeQuery = event.target.value.trim().toLowerCase();
        renderRecipes();
    });

    categorySelect?.addEventListener('change', (event) => {
        activeCategory = event.target.value;
        filterLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.category === activeCategory);
        });
        renderRecipes();
    });

    sortSelect?.addEventListener('change', (event) => {
        activeSort = event.target.value;
        renderRecipes();
    });

    filterLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            activeCategory = link.dataset.category || 'all';
            if (categorySelect) categorySelect.value = activeCategory;
            filterLinks.forEach((item) => item.classList.toggle('active', item.dataset.category === activeCategory));
            renderRecipes();
        });
    });

    filterToggleBtn?.addEventListener('click', () => {
        const sidebar = document.getElementById('filter-sidebar');
        sidebar?.classList.toggle('is-open');
    });
}

function showExploreView() {
    document.getElementById('explore-view').style.display = 'block';
    document.getElementById('share-view').style.display = 'none';
    document.getElementById('browse-btn').classList.add('active');
    document.getElementById('share-btn').classList.remove('active');
}

function showShareView() {
    document.getElementById('explore-view').style.display = 'none';
    document.getElementById('share-view').style.display = 'block';
    document.getElementById('browse-btn').classList.remove('active');
    document.getElementById('share-btn').classList.add('active');
}

function closeRecipeModal() {
    document.getElementById('recipe-modal-overlay').hidden = true;
}

function setupModalClose() {
    document.getElementById('modal-close')?.addEventListener('click', closeRecipeModal);
    document.getElementById('recipe-modal-overlay')?.addEventListener('click', (event) => {
        if (event.target.id === 'recipe-modal-overlay') {
            closeRecipeModal();
        }
    });
}

function setupKeyboardClose() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeRecipeModal();
        }
    });
}

function setupRecipeForm() {
    const form = document.getElementById('recipe-form');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const payload = {
            title: document.getElementById('recipe-title').value.trim(),
            description: document.getElementById('recipe-desc').value.trim(),
            category: document.getElementById('recipe-category').value,
            cookTime: document.getElementById('cook-time').value.trim(),
            ingredients: document.getElementById('ingredients').value.trim(),
            steps: document.getElementById('steps').value.trim()
        };

        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                form.reset();
                await loadRecipes();
                showExploreView();
                alert('Recipe Published Successfully!');
            } else {
                throw new Error('Unable to save recipe');
            }
        } catch (error) {
            console.error(error);
            alert('There was a problem saving your recipe.');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupFilterControls();
    loadRecipes();
    setupRecipeForm();
    setupModalClose();
    setupKeyboardClose();
});
