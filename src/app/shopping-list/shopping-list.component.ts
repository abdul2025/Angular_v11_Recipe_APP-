import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {Ingredient} from '../shared/ingredient.model'
import * as shoppingListActions from '../shopping-list/store/shopping-list-actions'
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients : Ingredient[]}> ;


  constructor(
    private store: Store<fromApp.AppState>, 

    
    ) { }

  ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList');

    
  }
  
  onEditIngre(index: number) {
    this.store.dispatch( new shoppingListActions.StartEdit(index))
    // this.shoppingService.startedEditing.next(index);
  }
  
  ngOnDestroy(): void {
  }
}
