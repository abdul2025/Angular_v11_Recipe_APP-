import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";
import * as ShoppingListActions from '../shopping-list/store/shopping-list-actions'




@Injectable({
  providedIn: 'root',
})
export  class RecipeService {


    addNewRecipes = new Subject<Recipe[]>();




    private recipes: Recipe[] = [];
    constructor(
    private store: Store<fromApp.AppState>
    ) { }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.addNewRecipes.next(this.recipes.slice())
    }
    getRecipe() {
        return this.recipes.slice()
    }

    getRecipeById(id: number){
        return this.recipes[id]
    }

    addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe)
        this.addNewRecipes.next(this.recipes)
    }
    updateRecipe (index: number, updatedRecipe: Recipe) {
        this.recipes[index] = updatedRecipe
        this.addNewRecipes.next(this.recipes)
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1)
        this.addNewRecipes.next(this.recipes)
    }


    addIngredientsFromRecipe(ingredients: Ingredient[]){
        // let found; 
        // ingredients.forEach(incomingIngr => {
        //     found = this.ingredients.some(existedIngr =>  existedIngr.name == incomingIngr.name)
        //     if (!found) this.ingredients.push(incomingIngr)
        // })
        
        
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
    }
}

