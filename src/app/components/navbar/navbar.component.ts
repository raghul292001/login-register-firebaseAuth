import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authSrv:AuthService){}

  ngOnInit(): void {
    
  }
  logout(){
    //remove token
    this.authSrv.removeToken();
    this.authSrv.canAccess();
  }

}
