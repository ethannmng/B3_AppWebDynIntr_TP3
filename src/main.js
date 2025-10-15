import { getRecipes, addRecipe } from "./utils.js";
const main = async () => {
    console.log("🚀 Lancement du programme...");
    const recipes = await getRecipes();
    console.log(`✅ ${recipes.length} recettes récupérées`);
    for (const recipe of recipes) {
        addRecipe(recipe, false);
    }
};
main();
