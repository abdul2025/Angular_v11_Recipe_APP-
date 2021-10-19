export const ADD_INGREDIENT = '[Shopping List] add Ingredient'
export const ADD_INGREDIENTS = '[Shopping List] add Ingredients'
export const UPDATE_INGREDIENTS = '[Shopping List] update Ingredient'
export const DELETE_INGREDIENTS = '[Shopping List] delete Ingredient'
export const START_EDIT = '[Shopping List] start edit'
export const STOP_EDIT = '[Shopping List] stop edit'

import {Action} from "@ngrx/store"
import { Ingredient } from "src/app/shared/ingredient.model";



export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) {}
}


export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) {}
}


export class UpdateIngredients implements Action {
    readonly type = UPDATE_INGREDIENTS;

    constructor(public payload:  Ingredient) {}
}
export class DeleteIngredients implements Action {
    readonly type = DELETE_INGREDIENTS;

}



export class StartEdit implements Action {
    readonly type = START_EDIT

    constructor(public payload: number) {}
}


export class StopEdit implements Action {
    readonly type = STOP_EDIT
}


export type ShoppingListActions = 
    | AddIngredient
    | AddIngredients
    | UpdateIngredients
    | DeleteIngredients
    | StartEdit
    | StopEdit