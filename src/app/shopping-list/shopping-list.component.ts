import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {Ingredient} from '../shared/ingredient.model'
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients : Ingredient[]}> ;


  constructor(
    private shoppingService: ShoppingService,
    private store: Store<{shoppingList: {ingredients: Ingredient[] } }>
    
    ) { }

  ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList');

    

    
  }
  
  onEditIngre(index: number) {
    this.shoppingService.startedEditing.next(index);
  }
  
  ngOnDestroy(): void {
  }
}
