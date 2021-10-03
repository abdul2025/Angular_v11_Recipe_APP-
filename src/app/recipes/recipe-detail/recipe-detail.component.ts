import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private shoppingService: ShoppingService, 
    private recipesService: RecipeService, 
    private route: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id']
      this.recipe = this.recipesService.getRecipeById(this.id)
    })
  }


  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }


  ToShoppingList(){
    // console.log(this.recipe.ingredients)
    
    this.shoppingService.addIngredientsFromRecipe(this.recipe.ingredients)
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id)
    this.router.navigate(['../recipes'])
  }


}
