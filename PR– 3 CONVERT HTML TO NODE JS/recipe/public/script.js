document.getElementById('recipeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const recipe = Object.fromEntries(formData);

    const response = await fetch('/recipe/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    });

    if (response.ok) {
        alert('Recipe added successfully!');
        window.location.href = '/index';
    } else {
        alert({message : 'Recipe added failed!'});
    }
});


async function fetchRecipes() {
    const response = await fetch('/recipe/all');
    const recipes = await response.json();

    const parent = document.getElementById('parent');
    parent.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.innerHTML = `
            <h2>${recipe.name}</h2>
            <p>${recipe.description}</p>
            <p>Preparation Time: ${recipe.preparationTime}</p>
            <p>Cooking Time: ${recipe.cookingTime}</p>
            <p>Country: ${recipe.country}</p>
            <p>Vegetarian: ${recipe.veg ? 'Yes' : 'No'}</p>
            <hr>
        `;
        parent.appendChild(recipeDiv);
    });
}

fetchRecipes();