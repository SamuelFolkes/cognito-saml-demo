import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  isAuth:boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuth.subscribe( value => {
      this.isAuth = value;
    });
  }

  logout() {
    this.authService.logout();
  }

}
