import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CONSTANT } from '../constants/constant';
import { IToken, Login, LoginResponseModel, Register, RegisterResponseModel, UserResponseModel } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }

  isAuthenticated():boolean{
    if(sessionStorage.getItem('token')!==null){
      return true;
    }
    return false;
  }
  canAccess(){
    if(!this.isAuthenticated()){
      //redirect to login
      this.router.navigate(["/login"]);
    }
  }
  canAuthenticate(){
    if(this.isAuthenticated()){
      //redirect to login
      this.router.navigate(['/dashboard']);
    }
  }
  register(obj:Register):Observable<RegisterResponseModel>{
   return this.http.post<RegisterResponseModel>(environment.ApiEndPoint+CONSTANT.ENDPOINTS.REGISTER+"?key="+environment.Keys,obj);
  }
  storeToken(token:string){
    sessionStorage.setItem('token',token);
  }
  login(obj:Login):Observable<LoginResponseModel>{
    return this.http.post<LoginResponseModel>(environment.ApiEndPoint+CONSTANT.ENDPOINTS.LOGIN+"?key="+environment.Keys,obj);
  }
  getUserData():Observable<any>{
    let token = sessionStorage.getItem('token');
    return this.http.post<{users:Array<{localId:String,displayName:string}>}>(environment.ApiEndPoint+CONSTANT.ENDPOINTS.USERDATA+"?key="+environment.Keys,{idToken:token});
  }
  removeToken(){
    sessionStorage.removeItem('token');
  }
}
