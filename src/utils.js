// Récupération des éléments du DOM
const recipesContainer = document.getElementById('recipes-container');
const recipeTemplate = document.getElementById('recipe-template');
const tagTemplate = document.getElementById('recipe-tag-template');
/**
 * Récupère la liste des recettes depuis l'API.
 * @returns {Promise<Recipe[]>} - Une promesse qui résout un tableau de recettes.
 */
export const getRecipes = async () => {
    try {
        // Appel de l'API
        const response = await fetch('https://dummyjson.com/recipes');
        // Vérification de la requête
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        // On récupère la réponse au format JSON
        const data = await response.json();
        // On retourne la liste des recettes
        return data.recipes;
    }
    catch (error) {
        console.error('Erreur lors de la récupération des recettes:', error);
        return [];
    }
};
/**
 * Ajoute une recette à la liste des recettes.
 * @param recipe La recette à ajouter.
 * @param addToStart Indique si la recette doit être ajoutée au début ou à la fin de la liste.
 */
export const addRecipe = (recipe, addToStart) => {
    // On clone le template
    const recipeNode = document.importNode(recipeTemplate.content, true);
    // On remplit les données
    const imageElement = recipeNode.querySelector('img');
    imageElement.src = recipe.image;
    imageElement.alt = 'Photo de ' + recipe.name;
    // On indique "!" pour l'assertion non nulle car TypeScript ne sait pas que le template contient bien ces éléments
    recipeNode.querySelector('.recipe-name').textContent = recipe.name;
    recipeNode.querySelector('.recipe-rating').textContent = recipe.rating.toString();
    recipeNode.querySelector('.recipe-rating-count').textContent = recipe.reviewCount.toString();
    recipeNode.querySelector('.recipe-cuisine-type').textContent = recipe.cuisine;
    recipeNode.querySelector('.recipe-prep-time').textContent = `${recipe.prepTimeMinutes} min`;
    recipeNode.querySelector('.recipe-cooking-time').textContent = `${recipe.cookTimeMinutes} min`;
    // Gestion des tags
    const tagsContainer = recipeNode.querySelector('.recipe-tags-container');
    if (recipe.tags && recipe.tags.length > 0) {
        recipe.tags.forEach(tag => {
            const tagNode = document.importNode(tagTemplate.content, true);
            tagNode.querySelector('.recipe-tag').textContent = tag;
            tagsContainer.appendChild(tagNode);
        });
    }
    // On ajoute la recette au début ou à la fin
    if (addToStart) {
        recipesContainer.prepend(recipeNode);
    }
    else {
        recipesContainer.appendChild(recipeNode);
    }
};
