import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub: Subscription;

  isAuth = false

  constructor(private dataStorgeService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
   this.userSub = this.authService.user.subscribe(user =>  {
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
    this.authService.logout()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
