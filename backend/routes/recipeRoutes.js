const express = require('express');
const { getRecipes, getRecipeById, createRecipe } = require('../controllers/recipeController');

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.post('/', createRecipe);

module.exports = router;
