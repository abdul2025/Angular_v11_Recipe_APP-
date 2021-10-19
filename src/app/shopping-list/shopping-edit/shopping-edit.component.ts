import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list-actions';
import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {


  constructor(
    private store: Store<fromApp.AppState>
    ) { }

  ingredientsForm: FormGroup;
  subscription : Subscription;
  editedItemIndex: number;
  editMode = false
  editedIngre: Ingredient;

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateDate => {
      if (stateDate.editedIngreIndex > -1) {
        
        this.editedIngre = stateDate.editIngre
        this.ingredientsForm.setValue(
          {
            'name': this.editedIngre.name,
            'amount': this.editedIngre.amount
          })
        this.editMode = true
      }else {
        this.ingredientsForm = new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, Validators.required),
        })
        this.editMode = false
      }
    })
  }


  onSubmitIngre() {
    const ingName = this.ingredientsForm.value.name
    const ingamount = this.ingredientsForm.value.amount
    const newIngredient = new Ingredient(ingName, ingamount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredients(newIngredient))
      console.log('edit mode')
    }else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingService.addIngredient(newIngredient)
    }
    this.ingredientsForm.reset()
    this.editMode = false
  }

  onClear() {
    this.ingredientsForm.reset()
    this.store.dispatch(new ShoppingListActions.StopEdit())
    this.editMode = false
    console.log(this.editMode)
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredients());

    // this.shoppingService.deleteIngredient(this.editedItemIndex)
    this.onClear()

  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit())
    this.subscription.unsubscribe()
  }

}
