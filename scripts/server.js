const express = require('express');
const path = require('path');
const fs = require('fs');
const authRoutes = require('../auth/routes/authRoutes');

const app = express();
const port = process.env.PORT || 3001;
const projectRoot = path.join(__dirname, '..');
const recipesFilePath = path.join(projectRoot, 'data', 'recipes.json');

app.use(express.static(projectRoot));
app.use(express.json());
app.use('/api/auth', authRoutes);

function readRecipes() {
  try {
    const data = fs.readFileSync(recipesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeRecipes(recipes) {
  fs.writeFileSync(recipesFilePath, JSON.stringify(recipes, null, 2));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(projectRoot, 'main_home.html'));
});

app.get('/api/recipes', (req, res) => {
  res.json(readRecipes());
});

app.post('/api/recipes', (req, res) => {
  const recipes = readRecipes();
  const newRecipe = {
    id: Date.now().toString(),
    title: req.body.title || 'Untitled Recipe',
    description: req.body.description || '',
    category: req.body.category || 'Other',
    cookTime: req.body.cookTime || '',
    ingredients: req.body.ingredients || '',
    steps: req.body.steps || '',
    image: req.body.image || '/images/recipe-placeholder.svg'
  };

  recipes.unshift(newRecipe);
  writeRecipes(recipes);
  res.status(201).json(newRecipe);
});

app.get('/:page', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(projectRoot, `${page}.html`);

  if (page === 'styles.css' || page === 'package.json' || page === 'server.js') {
    res.status(404).send('Not found');
    return;
  }

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('Page not found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
