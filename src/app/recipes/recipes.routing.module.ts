import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuhtGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { ResipesResolverService } from "./recipes.resolver.service";

const router: Routes = [
    {path: '', 
    component: RecipesComponent,
    canActivate: [AuhtGuard],
    children: [
        {path: '', component: RecipeStartComponent },
        {path: 'new', component: RecipeEditComponent },
        {path: ':id', component: RecipeDetailComponent, resolve: [ResipesResolverService] },
        {path: ':id/edit', component: RecipeEditComponent, resolve: [ResipesResolverService]},
    ]},
];


@NgModule({
    imports: [RouterModule.forChild(router)],
    exports: [RouterModule]
})

export class RecipeRoutingModule {}