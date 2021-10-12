import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list-actions";
const initalState = {
    ingredients:  [
        new Ingredient('Apple', 5),
        new Ingredient('Orange', 2)
      ],
}


export function shoppingListReducer(state = initalState, action: ShoppingListActions.AddIngredient) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        default: 
            return state;

    }
}