import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formDataLogin:Login = {
    email:"",
    password:""
  }
  submit=false;
  errorMessage="";
  loading=false;

   
  constructor(private auth:AuthService,private router:Router){}

  ngOnInit(): void {
    this.auth.canAuthenticate();    
  }
  onSubmitLogin(){
    console.log(this.formDataLogin);
    this.loading=true;
    //call login service
    this.auth.login(this.formDataLogin).subscribe({
      next:data=>{
        //store token
        this.auth.storeToken(data.idToken);
        this.auth.canAuthenticate();
      },error:data=>{
        if(data.error.error.message=="INVALID_PASSWORD" || data.error.error.message=="INVALID_EMAIL"){
          this.errorMessage = "Invalid Credentials";
        }else{
          this.errorMessage="Unknown error when logging into this account"
        }
        
      }
    }).add(()=>{
      this.loading=false;
      console.log("login process completed");
      console.log()
    })

  }

}
