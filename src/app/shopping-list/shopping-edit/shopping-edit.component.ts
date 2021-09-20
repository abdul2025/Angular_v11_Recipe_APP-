import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameinput') nameinput: ElementRef;
  @ViewChild('amountinput') amountinput: ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }


  onAdd(){
    const ingName = this.nameinput.nativeElement.value
    const ingamount = this.amountinput.nativeElement.value
    const newIngredient = new Ingredient(ingName, ingamount);
    this.ingredientAdded.emit(newIngredient)
  }

}
