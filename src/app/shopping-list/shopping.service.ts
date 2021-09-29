import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";




export class ShoppingService {

    ingredientAdded = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Orange', 2)
      ];

    
    getIngredients(){
        return this.ingredients
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientAdded.next(this.ingredients.slice());
    }

    addIngredientsFromRecipe(ingredients: Ingredient[]){
        let found; 
        ingredients.forEach(incomingIngr => {
            found = this.ingredients.some(existedIngr =>  existedIngr.name == incomingIngr.name)
            if (!found) this.ingredients.push(incomingIngr)
        })
        
        
        this.ingredientAdded.next(this.ingredients.slice());
    }
}