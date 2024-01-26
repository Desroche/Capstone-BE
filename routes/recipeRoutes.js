require("dotenv").config();
const express = require('express');
const router = express.Router();
const spoonAPIKey = process.env.SPOON_API_KEY;


router.get('/api/searchRecipes', async (req, res) => {
  try {
    const { diet, number } = req.query;
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${diet}&number=${number}&sort=random&addRecipeInformation=true&apiKey=${spoonAPIKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send('Error fetching recipes');
  }
});







module.exports = router;
