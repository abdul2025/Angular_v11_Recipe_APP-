import { Injectable, OnDestroy } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom, exhaustMap } from 'rxjs/operators';
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Injectable()
export class RecipeEffects implements  OnDestroy {
    incomingRecipes: Recipe[]
    userID : string
    authSub: Subscription



    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        map(()=>{
            this.authSub = this.store.select('auth').subscribe(authDate => {
                console.log(authDate)
                if (authDate){
                    this.userID = authDate.user.id
                }
            })
            }),
        switchMap(() => {
            console.log(this.userID)
        return this.http.get<Recipe[]>(
            `https://recipeapp-2c302-default-rtdb.firebaseio.com/${this.userID}.json`
        );
        }),
        map((recipes: Recipe []) => {
            if (recipes){
                return recipes.map(recipe => {
                    return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            } else {return []}
        }),
        map(recipes => {
        return new RecipesActions.SetRecipes(recipes);
        })
    );

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        // map(()=>{
        //     this.authSub = this.store.select('recipes').subscribe(recipes => {
        //         console.log(recipes)
        //         this.incomingRecipes = recipes.recipes
        //     })
        //     }),
        withLatestFrom(
            this.store.select('recipes'),
            this.store.select('auth')
        ),
        switchMap(([actionDate, recipes, authUser]) => {
            console.log(recipes)
            console.log(authUser.user.id)
            return this.http.put(
                `https://recipeapp-2c302-default-rtdb.firebaseio.com/${authUser.user.id}.json`,
                recipes.recipes
            );
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {}


    ngOnDestroy () {
        this.authSub.unsubscribe()
    }
}
