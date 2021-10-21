import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer'
import {Store} from '@ngrx/store'
import { map, switchMap } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions'


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})


@Injectable()


export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipesService: RecipeService, 
    private route: ActivatedRoute, 
    private router: Router,
    private store: Store<fromApp.AppState>
    ) { }

    ngOnInit() {
      this.route.params
        .pipe(
          map(params => {
            return +params['id'];
          }),
          switchMap(id => {
            this.id = id;
            return this.store.select('recipes');
          }),
          map(recipesState => {
            return recipesState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe(recipe => {
          this.recipe = recipe;
        });
    }


  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }


  ToShoppingList(){
    // console.log(this.recipe.ingredients)
    
    this.recipesService.addIngredientsFromRecipe(this.recipe.ingredients)
  }

  onDeleteRecipe() {
    // this.recipesService.deleteRecipe(this.id)
    this.store.dispatch(new RecipeActions.DeleteRecipes(this.id))
    this.router.navigate(['../recipes'])
  }


}
