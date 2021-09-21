import { Recipe } from "./recipe.model";

export  class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('A test recipe', 'new recipe desc', 'https://www.seriouseats.com/thmb/GSqpVkulyUZu-D6sPijmbFV_f4s=/1500x1125/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__03__20200224-carretteira-pasta-vicky-wasik-21-ffe68515b25f4b348cbde845a59d6a62.jpg'),
        new Recipe('Another test recipe', 'new recipe desc', 'https://www.seriouseats.com/thmb/GSqpVkulyUZu-D6sPijmbFV_f4s=/1500x1125/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__03__20200224-carretteira-pasta-vicky-wasik-21-ffe68515b25f4b348cbde845a59d6a62.jpg')
      ];


    getRecipe() {
        return this.recipes.slice()
    }
}