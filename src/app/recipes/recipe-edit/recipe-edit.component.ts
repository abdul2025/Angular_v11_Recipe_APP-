import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer'
import {Store} from '@ngrx/store'
import { map } from 'rxjs/operators';

import * as RecipeActions from '../store/recipe.actions'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'] 
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;

  recipeForm: FormGroup;

  newRecipe: Recipe;

  newIngr: Ingredient[] = []

  private storeSub: Subscription;


  



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
      ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = +params['id']
      this.editMode = params['id'] != null
      console.log(this.editMode)
    })
    this.initForm()

    
  }

  ngOnDestroy(){
    if (this.storeSub){
      this.storeSub.unsubscribe()
    }
  }


  private initForm() {
    let recipeIngr = new FormArray([]);
    if (this.editMode) {
      // const recipe = this.recipeService.getRecipeById(this.id)
      this.storeSub = this.store.select('recipes').pipe(map(recipeState=>{
        return recipeState.recipes.find((recipe, index)=>{
          return index === this.id
        })
      })).subscribe(recipe => {
        if (recipe['ingredients']) {
          for (let ingredient of recipe.ingredients) {
            recipeIngr.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
              })
            )
          }
        }
        this.recipeForm = new FormGroup({
          'recipeFileds': new FormGroup({
            'name': new FormControl(recipe.name, Validators.required),
            'imageURL': new FormControl(recipe.imagePath, Validators.required),
            'description': new FormControl(recipe.description),
          }),
          'ingredients': recipeIngr
        })
      })
    } else {
      this.recipeForm = new FormGroup({
        'recipeFileds': new FormGroup({
          'name': new FormControl(null, Validators.required),
          'imageURL': new FormControl(null, Validators.required),
          'description': new FormControl(null),
        }),
        'ingredients': recipeIngr    
      })
    }

  }

  onSubmit() {
    const recipName = this.recipeForm.value.recipeFileds.name
    const recipimageURL = this.recipeForm.value.recipeFileds.imageURL
    const recipdescription = this.recipeForm.value.recipeFileds.description
    
    this.newRecipe = new Recipe(recipName, recipdescription, recipimageURL, this.recipeForm.value.ingredients)
    if (this.editMode){
      // this.recipeService.updateRecipe(this.id, this.newRecipe)
      this.store.dispatch(new RecipeActions.UpdateRecipes({index: this.id, newRecipe: this.recipeForm.value}))
      this.router.navigate([`recipes/${this.id}`])

    }else {
      // this.recipeService.addRecipe(this.newRecipe)
      this.store.dispatch(new RecipeActions.AddRecipes(this.recipeForm.value))
      this.router.navigate([`recipes/`])
      
    }

  }


  get controls() { // a getter!    
   return (this.recipeForm.get('ingredients') as FormArray).controls;
  }


  onAddNewIngre() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }

  onDeleteIngre(ingrIndex: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(ingrIndex);
  }

  onClearIngre() {
    (this.recipeForm.get('ingredients') as FormArray).clear();
  }


  onCancel() {
    this.router.navigate(['/recipes'])
  }


  
}
