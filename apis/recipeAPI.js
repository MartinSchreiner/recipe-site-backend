const express = require('express')
const router = express.Router();

const ctrlRecipes = require('../controllers/recipe.controller');
const jwtHelper = require('../config/jwtHelper');

//methods requiring authentication
router.post('/newRecipe', jwtHelper.verifyJWTToken, ctrlRecipes.newRecipe);
router.get('/getRecipes', jwtHelper.verifyJWTToken, ctrlRecipes.getRecipes);
router.post('/deleteRecipe', jwtHelper.verifyJWTToken, ctrlRecipes.deleteRecipe);
router.post('/updateRecipe', jwtHelper.verifyJWTToken, ctrlRecipes.updateRecipe);

//methods for everyone
router.post('/search', ctrlRecipes.search);


module.exports = router;