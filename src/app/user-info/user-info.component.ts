import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  tokenInfo:string;
  userInfo:string;

  constructor(private http: HttpClient,private route: ActivatedRoute,private jwtHelper: JwtHelperService,private storageService:StorageService,private authService:AuthService) { }

  ngOnInit() {
    this.readToken();
    this.storageService.changes.subscribe( value => {
      this.readToken();
    });
  }

  readToken() {
    if(this.authService.getAuthStatus()) {
      this.tokenInfo = JSON.stringify(this.jwtHelper.decodeToken(this.storageService.get('authData').accessToken))
    }
  }
}
