import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";




export class ShoppingService {

    ingredientAdded = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();


    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Orange', 2)
      ];

    
    getIngredients(){
        return this.ingredients
    }

    editUpdateIngre(ingredient: Ingredient, index: number) {
        this.ingredients[index] = ingredient
        this.ingredientAdded.next(this.ingredients.slice());
    }

    getIngredient(index: number) {
        return this.ingredients[index]
    }

    addIngredient(ingredient: Ingredient){
        
        this.ingredients.push(ingredient)
        this.ingredientAdded.next(this.ingredients.slice());
    }


    deleteIngredient(index: number){
        this.ingredients.splice(index, 1)
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