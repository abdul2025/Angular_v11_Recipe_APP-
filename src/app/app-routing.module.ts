import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCompnent } from './auth/auth.component';
import { AuhtGuard } from './auth/auth.guard';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ResipesResolverService } from './recipes/recipes.resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRouters: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', 
  component: RecipesComponent,
  canActivate: [AuhtGuard],
  children: [
    {path: '', component: RecipeStartComponent },
    {path: 'new', component: RecipeEditComponent },
    {path: ':id', component: RecipeDetailComponent, resolve: [ResipesResolverService] },
    {path: ':id/edit', component: RecipeEditComponent, resolve: [ResipesResolverService] },
  ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthCompnent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRouters)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}