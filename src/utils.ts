import { Recipe, RecipeResponse } from './types.js';

// Récupération des éléments du DOM
const recipesContainer = document.getElementById('recipes-container') as HTMLElement;
const recipeTemplate = document.getElementById('recipe-template') as HTMLTemplateElement;
const tagTemplate = document.getElementById('recipe-tag-template') as HTMLTemplateElement;

/**
 * Récupère la liste des recettes depuis l'API.
 * @returns {Promise<Recipe[]>} - Une promesse qui résout un tableau de recettes.
 */
export const getRecipes = async (): Promise<Recipe[]> => {
    try {
        // Appel de l'API
        const response = await fetch('https://dummyjson.com/recipes');

        // Vérification de la requête
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        // On récupère la réponse au format JSON
        const data: RecipeResponse = await response.json();

        // On retourne la liste des recettes
        return data.recipes;
    } catch (error) {
        console.error('Erreur lors de la récupération des recettes:', error);
        return [];
    }
}

/**
 * Ajoute une recette à la liste des recettes.
 * @param recipe La recette à ajouter.
 * @param addToStart Indique si la recette doit être ajoutée au début ou à la fin de la liste.
 */
export const addRecipe = (recipe: Recipe, addToStart: boolean) : void => {
    // On clone le template
    const recipeNode = document.importNode(recipeTemplate.content, true);

    // On remplit les données
    const imageElement = recipeNode.querySelector('img') as HTMLImageElement;
    imageElement.src = recipe.image;
    imageElement.alt = 'Photo de ' + recipe.name;

    // On indique "!" pour l'assertion non nulle car TypeScript ne sait pas que le template contient bien ces éléments
    recipeNode.querySelector('.recipe-name')!.textContent = recipe.name;
    recipeNode.querySelector('.recipe-rating')!.textContent = recipe.rating.toString();
    recipeNode.querySelector('.recipe-rating-count')!.textContent = recipe.reviewCount.toString();
    recipeNode.querySelector('.recipe-cuisine-type')!.textContent = recipe.cuisine;
    recipeNode.querySelector('.recipe-prep-time')!.textContent = `${recipe.prepTimeMinutes} min`;
    recipeNode.querySelector('.recipe-cooking-time')!.textContent = `${recipe.cookTimeMinutes} min`;

    // Gestion des tags
    const tagsContainer = recipeNode.querySelector('.recipe-tags-container') as HTMLElement;
    if (recipe.tags && recipe.tags.length > 0) {
        recipe.tags.forEach(tag => {
            const tagNode = document.importNode(tagTemplate.content, true);
            tagNode.querySelector('.recipe-tag')!.textContent = tag;
            tagsContainer.appendChild(tagNode);
        });
    }

    // On ajoute la recette au début ou à la fin
    if (addToStart) {
        recipesContainer.prepend(recipeNode);
    } else {
        recipesContainer.appendChild(recipeNode);
    }
}

/**
 * Crée une nouvelle recette en envoyant une requête POST à l'API.
 */
export const createNewRecipe = async () : Promise<void> => {
    try {
        // On récupère les valeurs du formulaire
        const name (document.querySelector('#name') as HTMLInputElement).value;
        const rating = (document.querySelector('#rating') as HTMLInputElement).value;
        const reviewCount = (document.querySelector('#reviewCount') as HTMLInputElement).value;
        const prepTime = (document.querySelector('#prepTime') as HTMLInputElement).value
        const cookTime = (document.querySelector('#cookTime') as HTMLInputElement).value
        const cuisine = (document.querySelector('#cuisine') as HTMLInputElement).value;

        // Création de l'objet recette
        // On créer une recette sans l'id car l'API le génère automatiquement (d'où le Omit)
        const newRecipe : Omit<Recipe, 'id'> = {
            name: name,
            rating: parseInt(rating, 10),
            reviewCount: parseInt(reviewCount, 10),
            prepTimeMinutes: parseInt(prepTime, 10),
            cookTimeMinutes: parseInt(cookTime, 10),
            cuisine: cuisine,
            image: 'https://cdn.dummyjson.com/recipe-images/3.webp'
        };

        // Envoi de la requête POST à l'API
        const response = await fetch('https://dummyjson.com/recipes/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
        });

        // Vérification de la requête
        if (!response.ok) {
            throw new Error(`Erreur lors de l'ajout de la recette: ${response.status}`);
        }

        const createdRecipe : Recipe = await response.json();

        console.log('✅ Recette ajoutée avec succès:', createdRecipe);
    } catch (error) {
        console.error('❌ Erreur lors de la création de la recette:', error);
    }
}