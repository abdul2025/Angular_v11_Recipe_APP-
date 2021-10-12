import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import * as ShoppingListActions from '../store/shopping-list-actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {


  constructor(
    private shoppingService: ShoppingService, 
    private store: Store<{shoppingList: {ingredients: Ingredient[] } }>
    ) { }

  ingredientsForm: FormGroup;
  subscription : Subscription;
  editedItemIndex: number;
  editMode = false
  editedIngre: Ingredient;

  ngOnInit(): void {

    this.ingredientsForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required),
    })

    this.subscription = this.shoppingService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index
      this.editMode = true;
      this.editedIngre = this.shoppingService.getIngredient(index)
      
      this.ingredientsForm.setValue(
        {
          'name': this.editedIngre.name,
          'amount': this.editedIngre.amount
        },
        
        ) 
    })
  }


  onSubmitIngre() {
    const ingName = this.ingredientsForm.value.name
    const ingamount = this.ingredientsForm.value.amount
    const newIngredient = new Ingredient(ingName, ingamount);
    if (this.editMode) {
      this.shoppingService.editUpdateIngre(newIngredient, this.editedItemIndex)
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
    this.editMode = false
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editedItemIndex)
    this.onClear()

  }

}
