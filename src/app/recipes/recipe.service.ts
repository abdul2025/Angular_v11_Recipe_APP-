import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export  class RecipeService {






    private recipes: Recipe[] = [
        new Recipe('Homemade Pizza Dough',
         'Produces a soft homemade pizza crust',
          'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2019/01/homemade-pizza-dough-600x900.jpg',
          [ new Ingredient('Yeast',1),
          new Ingredient('Flour',2)]),
        new Recipe('Homemade Pasta',
         'Delicious fresh pasta', 
         'https://www.seriouseats.com/thmb/GSqpVkulyUZu-D6sPijmbFV_f4s=/1500x1125/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__03__20200224-carretteira-pasta-vicky-wasik-21-ffe68515b25f4b348cbde845a59d6a62.jpg',
         [ new Ingredient('Eggs',4),
          new Ingredient('Olive oil',3)])
      ];


    getRecipe() {
        return this.recipes.slice()
    }

    getRecipeById(id: number){
        return this.recipes[id]
    }
}

