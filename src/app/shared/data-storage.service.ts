import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";


@Injectable({providedIn: 'root'})

export class DataStorageService {
    constructor(private http: HttpClient, private recipeServ: RecipeService) {}

    storeRecipe() {
        const recipes = this.recipeServ.getRecipe()
        this.http.put('https://recipeapp-2c302-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(res => {
            console.log(res)
        })        
    }


    fetchData() {
        this.http.get<Recipe[]>('https://recipeapp-2c302-default-rtdb.firebaseio.com/recipes.json').subscribe(recipes => {
            this.recipeServ.setRecipes(recipes)
            console.log(recipes)
        })        
    }
}