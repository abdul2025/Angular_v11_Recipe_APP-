import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
// import { map, tap } from 'rxjs/operators';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";


@Injectable({providedIn: 'root'})

export class DataStorageService {
    constructor(private http: HttpClient, private recipeServ: RecipeService, private authService: AuthService) {}

    storeRecipe() {
        const recipes = this.recipeServ.getRecipe()
        this.http.put('https://recipeapp-2c302-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(res => {
            console.log(res)
        })        
    }


    fetchData() {
        // take and pipe >> Becouse i wanna only to a user once and immidit unsubscrbe
        // so next time i fetch with the same user will not get futue user, so no onging users
        // using exhaustMap where will replace the outter observable by the inner one
        // and apply the reset of the opeartors
        // so the acutal return observable is the HTTP one 
        
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