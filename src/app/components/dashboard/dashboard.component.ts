import { Component, OnInit } from '@angular/core';
import { IToken, User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  token:IToken={
    idToken:"something"
  }
  user={
    displayName:"",
    localId:""
  };
  errorMessage=""
  constructor(private authSrv:AuthService){}
  ngOnInit(): void {
    this.authSrv.canAccess();
    const userToken:string = (sessionStorage.getItem('token')!);
    console.log("userToken from dashboard:"+userToken);   
    this.token.idToken=userToken; 
    this.getUser();
  }
  getUser(){
    if(this.authSrv.isAuthenticated()){
      this.authSrv.getUserData().subscribe({
        next:data=>{
         this.user.localId= data.users[0].localId;
         this.user.displayName= data.users[0].displayName;      
  
        },error:data=>{
          this.errorMessage=data.error.error.message;
          console.log(this.errorMessage);  
        }
      })
    }
  }

}
