import { Component, OnInit } from '@angular/core';
import { Register, RegisterResponseModel } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formData:Register = {
    displayName:"",
    email:"",
    password:""
  };
  submit=false;
  errorMessage="";
  loading=false;
   constructor(private auth:AuthService){}
   ngOnInit(): void {
    this.auth.canAuthenticate();     
   }
   onSubmit(){
    this.loading=true;
    this.auth.register(this.formData).subscribe({
     next:data=>{
      //store token from response data
      this.auth.storeToken(data.idToken);
      this.auth.canAuthenticate();
     },
     error:data=>{
      if(data.error.error.message=="INVALID_EMAIL"){
        this.errorMessage="Invalid Email";
      }else if(data.error.error.message=="EMAIL_EXISTS"){
        this.errorMessage="Already Email Exist";
      }else{
        this.errorMessage=data.error.error.message
      }
     }
    }).add(()=>{
      this.loading =false;
      console.log("Register Completed")
    })

    
   }

}
