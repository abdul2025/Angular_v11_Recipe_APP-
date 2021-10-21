import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import {  map, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import * as fromApp from '../store/app.reducer'
import * as RecipeActions from '../recipes/store/recipe.actions'
import { Store } from "@ngrx/store";
import { Ingredient } from "./ingredient.model";


@Injectable({providedIn: 'root'})

export class DataStorageService {
    constructor(private http: HttpClient, private recipeServ: RecipeService,
        private store: Store<fromApp.AppState>,
        private authService: AuthService) {}

    storeRecipe() {
        const recipes = new Recipe(
            'test',
            'test',
            'https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2017/09/23/999216-213334383.jpg?itok=ofqNCPqO',
            [
                new Ingredient('math',1)
            ]

        )
        //  this.recipeServ.getRecipe()
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
        
        // .pipe(
        //     tap(recipe=> {
        //         console.log(recipe)
        //         this.store.dispatch(new RecipeActions.SetRecipes(recipe))
        //         // this.recipeServ.setRecipes(recipe)
        //     })
        // )   
    }
}