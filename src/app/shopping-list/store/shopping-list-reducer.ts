import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list-actions";



export interface State {
    ingredients: Ingredient[];
    editIngre: Ingredient | any;
    editedIngreIndex: number;
}


const initialState: State = {
    ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
    editIngre: null,
    editedIngreIndex: -1
  };




export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            // Make sure the added Ingre is uniqe 
            // let found; 
            // state.ingredients.forEach(incomingIngr => {
            //     found = this.ingredients.some(existedIngr =>  existedIngr.name == incomingIngr.name)
            //     if (!found) this.ingredients.push(incomingIngr)
            // })
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENTS:
            const ingredient = state.ingredients[state.editedIngreIndex]
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            }
            const updatedIngredients = [...state.ingredients]
            updatedIngredients[state.editedIngreIndex] = updatedIngredient
            
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngreIndex: -1,
                editIngre: null
            };
        case ShoppingListActions.DELETE_INGREDIENTS:

            return {
                ...state,
                ingredients: state.ingredients.filter((ig, index) => {
                    return index !== state.editedIngreIndex
                }),
                editedIngreIndex: -1,
                editIngre: null
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngreIndex: action.payload,
                editIngre: {...state.ingredients[action.payload]}

            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngreIndex: -1,
                editIngre: null
                
            }

        default: 
            return state;

    }
}