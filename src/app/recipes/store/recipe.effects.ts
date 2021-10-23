import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {
    incomingRecipes: Recipe [];
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
        return this.http.get<Recipe[]>(
            'https://recipeapp-2c302-default-rtdb.firebaseio.com/recipes.json'
        );
        }),
        map((recipes: Recipe []) => {
            
        return recipes.map(recipe => {
            return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
            };
        });
        }),
        map(recipes => {
        return new RecipesActions.SetRecipes(recipes);
        })
    );

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
        return this.http.put(
            'https://recipeapp-2c302-default-rtdb.firebaseio.com/recipes.json',
            recipesState.recipes
        );
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {}
}
