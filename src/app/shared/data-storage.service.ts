import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
// import { map, tap } from 'rxjs/operators';
import { map, tap } from 'rxjs/operators';


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
        return this.http.get<Recipe[]>('https://recipeapp-2c302-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
            map(recipe => {
                
            // To ensure ingredients filed are added to Firebase API, whether empy or exsited 
                return recipe.map(recipe => {
                    return {
                        ...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []
                    };
                });
            }),
            tap(recipe=> {
                console.log(recipe)
                this.recipeServ.setRecipes(recipe)
            })
        )
        
    }
}