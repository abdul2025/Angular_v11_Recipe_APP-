import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Ingredient} from '../shared/ingredient.model'
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;


  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients()
    this.subscription = this.shoppingService.ingredientAdded.subscribe((ingredient: Ingredient[])=>{
      this.ingredients = ingredient; 
      
    })

    
  }
  
  onEditIngre(index: number) {
    this.shoppingService.startedEditing.next(index);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
