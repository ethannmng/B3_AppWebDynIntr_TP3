import { getRecipes, addRecipe, createNewRecipe } from "./utils.js";
const addRecipeForm = document.querySelector('#add-recipe');
const main = async () => {
    console.log("🚀 Lancement du programme...");
    const recipes = await getRecipes();
    console.log(`✅ ${recipes.length} recettes récupérées`);
    for (const recipe of recipes) {
        addRecipe(recipe, false);
    }
};
addRecipeForm.addEventListener('submit', (event) => {
    event.preventDefault(); // On empêche le rechargement de la page
    createNewRecipe();
    addRecipeForm.reset(); // On réinitialise le formulaire
});
main();
