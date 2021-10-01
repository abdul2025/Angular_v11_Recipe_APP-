import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;

  recipeForm: FormGroup;

  newRecipe: Recipe;

  newIngr: Ingredient[] = []


  



  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = +params['id']
      this.editMode = params['id'] != null
      console.log(this.editMode)
    })
    this.initForm()

    
  }


  private initForm() {
    let recipeIngr = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id)
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
    } else {
      this.recipeForm = new FormGroup({
        'recipeFileds': new FormGroup({
          'name': new FormControl(null, Validators.required),
          'imageURL': new FormControl(null, Validators.required),
          'description': new FormControl(null),
        }),
        'ingredients': recipeIngr
          // 'name': new FormControl(null, Validators.required),
          // 'amount': new FormControl(null, Validators.required)
        
      })
    }
  }

  onSubmit() {
    const recipName = this.recipeForm.value.recipeFileds.name
    const recipimageURL = this.recipeForm.value.recipeFileds.imageURL
    const recipdescription = this.recipeForm.value.recipeFileds.description
    

    this.newRecipe = new Recipe(recipName, recipdescription, recipimageURL, this.recipeForm.value.ingredients)
    if (this.editMode){
      this.recipeService.updateRecipe(this.id, this.newRecipe)
    }else {
      this.recipeService.addRecipe(this.newRecipe)
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

  onDeleteIngre(index: number) {
    console.log(index)
    // (this.recipeForm.get('ingredients') as FormArray)[index];
  }

}
