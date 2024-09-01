const express = require('express');
// const { validator } = require('./middleware/validator');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = 8090;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let initialRecipe = [
    {
        name: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish.',
        preparationTime: '15 minutes',
        cookingTime: '15',
        // imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
        country: "India",
        veg: true,
        id: 1
    }
]

// GET Route: Welcome Message
app.get('/', (req, res) => {
    res.send("Welcome to the recipe api.");
})

// GET Route: Serve index.html
app.get('/recipe/all', (req, res) => {
    res.json(initialRecipe);
})

// GET Route: Serve all recipes
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

// GET Route: Serve recipe.html for adding new recipes
app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'recipe.html'));
});

// POST Route: Add a new recipe
app.post('/recipe/add', (req, res, next) => {
    const { name, description, preparationTime, cookingTime, country, veg } = req.body;

    if (!name || !description || !preparationTime || !cookingTime || !country || veg === undefined) {
        return res.status(400).send('All fields are required');
    }

    const newRecipe = {
        id: initialRecipe.length + 1,
        name,
        description,
        preparationTime,
        cookingTime,
        country,
        veg
    }
    initialRecipe.push(newRecipe);
    res.json(newRecipe);
});

// PATCH Route: Update a recipe
app.patch('/recipe/update/:id', (req, res) => {
    const { id } = req.params;
    const recipeIndex = initialRecipe.findIndex(recipe => recipe.id === id);

    if (recipeIndex !== -1) {
        initialRecipe[recipeIndex] = { ...initialRecipe[recipeIndex], ...req.body };
        return res.json(initialRecipe);
    }
    else {
        res.status(404).send('Recipe not found');
    }
});

// DELETE Route: Delete a recipe by ID
app.delete('/recipe/delete/:id', (req, res) => {
    const { id } = req.params;
    initialRecipe = initialRecipe.filter(recipe => recipe.id !== id);
    res.json(initialRecipe);
});

// GET Route: Filter recipes based on veg, country, and cooking time
app.get('/recipe/filter', (req, res) => {
    let { veg, sort, country } = req.query;
    let filteredRecipes = initialRecipe;

    if (veg !== undefined) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.veg == (veg === 'true'));
    }

    if (country) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.country === country);
    }

    if (sort) {
        if (sort === 'lth') {
            filteredRecipes.sort((a, b) => a.cookingTime - b.cookingTime);
        } else if (sort === 'htl') {
            filteredRecipes.sort((a, b) => b.cookingTime - a.cookingTime);
        }
    }

    res.json(filteredRecipes);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});