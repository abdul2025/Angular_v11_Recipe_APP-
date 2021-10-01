import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {Recipe} from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];


  subscription: Subscription;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipe()
    this.subscription = this.recipeService.addNewRecipes.subscribe((newRecipe: Recipe[])=>{
      this.recipes = newRecipe
    })
  }


  newRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }


}
