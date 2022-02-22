import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private authService:AuthService, private storageService: StorageService) { }

  public ngOnInit():void {

    const token = this.route.snapshot.queryParamMap.get('access_token');
    var s = this.route.snapshot.fragment.split("&");
    var access_token = s[0].replace("access_token=","")
    var id_token = s[1].replace("id_token=","")
    var state_nonce = s[2].replace("state=","")
    
    var authData = this.storageService.get('authData');
    authData.accessToken = access_token;
    authData.idToken = id_token;
    this.storageService.store('authData',authData);
    var requestedPath = authData.requestedPath;
    this.authService.isAuth.next(true);
    this.router.navigate(['.'+requestedPath]);
    
    //clear state & redir
  }
}