import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub: Subscription;

  isAuth = false

  constructor(
    private dataStorgeService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
   this.userSub = this.store.select('auth').pipe(map(authState => {
     return authState.user
   })).subscribe(user =>  {
     console.log(user)
    // opposite and reverse the status of the user exists
     this.isAuth = !!user
   })
    
  }

  onSaveData() {
    this.dataStorgeService.storeRecipe()
  }


  onFetchData(){
    this.dataStorgeService.fetchData().subscribe();
  }



  onLogout() {
    this.store.dispatch(new AuthActions.Logout())

  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
