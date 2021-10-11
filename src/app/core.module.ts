import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingService } from "./shopping-list/shopping.service";


@NgModule({
    providers: [RecipeService, ShoppingService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]
})

export class CoreModule {}