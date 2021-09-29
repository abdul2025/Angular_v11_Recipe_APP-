import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {


  constructor(private shoppingService: ShoppingService) { }

  ingredientsForm: FormGroup;



  ngOnInit(): void {

    this.ingredientsForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required),
    })
  }


  onSubmitIngre() {
    const ingName = this.ingredientsForm.value.name
    const ingamount = this.ingredientsForm.value.amount
    const newIngredient = new Ingredient(ingName, ingamount);
    this.shoppingService.addIngredient(newIngredient)
    this.ingredientsForm.reset()
  }

}
