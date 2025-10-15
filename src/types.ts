
/**
 * Représente la structure d'une recette culinaire.
 * @param id - Identifiant unique de la recette.
 * @param name - Nom de la recette.
 * @param image - URL de l'image de la recette.
 * @param rating - Note moyenne de la recette.
 * @param reviewCount - Nombre d'avis sur la recette.
 * @param prepTimeMinutes - Temps de préparation en minutes.
 * @param cookTimeMinutes - Temps de cuisson en minutes.
 * @param mealType - Types de repas (ex: petit-déjeuner, déjeuner, dîner).
 * @param cuisine - FACULTATIF | Type de cuisine (ex: italienne, chinoise).
 */
export type Recipe = {
    id: number;
    name: string;
    image: string;
    rating: number;
    reviewCount: number;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    cuisine: string;
    tags?: string[];
}

/**
 * Représente la structure de la réponse de l'API pour une liste de recettes.
 * @param recipes - Liste des recettes.
 * @param total - Nombre total de recettes disponibles.
 * @param skip - Nombre de recettes ignorées (pour la pagination).
 * @param limit - Nombre maximum de recettes retournées dans cette réponse.
 */
export type RecipeResponse = {
    recipes: Recipe[];
    total: number;
    skip: number;
    limit: number;
}