const fs = require('fs');
const path = require('path');

const recipesFilePath = path.join(__dirname, '..', 'data', 'recipes.json');

function ensureStore() {
  const dir = path.dirname(recipesFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(recipesFilePath)) {
    fs.writeFileSync(recipesFilePath, '[]', 'utf8');
  }
}

function readRecipes() {
  ensureStore();
  try {
    const data = fs.readFileSync(recipesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeRecipes(recipes) {
  ensureStore();
  fs.writeFileSync(recipesFilePath, JSON.stringify(recipes, null, 2), 'utf8');
}

function getRecipes(req, res) {
  try {
    const recipes = readRecipes();
    const { category, search } = req.query;

    let result = recipes;

    if (category && category !== 'all') {
      result = result.filter(
        (r) => r.category && r.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          (r.ingredients && r.ingredients.toLowerCase().includes(q))
      );
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
}

function getRecipeById(req, res) {
  try {
    const recipes = readRecipes();
    const recipe = recipes.find((r) => r.id === req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving recipe' });
  }
}

function createRecipe(req, res) {
  try {
    const { title, description, category, cookTime, ingredients, steps, image } = req.body;

    if (!title || !ingredients || !steps) {
      return res.status(400).json({ message: 'Title, ingredients, and steps are required' });
    }

    const recipes = readRecipes();
    const newRecipe = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description ? description.trim() : '',
      category: category ? category.toLowerCase().trim() : 'other',
      cookTime: cookTime ? cookTime.trim() : '20 minutes',
      ingredients: ingredients.trim(),
      steps: steps.trim(),
      image: image && image.trim() !== '' ? image.trim() : 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80'
    };

    recipes.unshift(newRecipe);
    writeRecipes(recipes);

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create recipe' });
  }
}

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe
};
