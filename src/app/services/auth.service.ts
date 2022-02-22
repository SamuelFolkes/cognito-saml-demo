import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
    public isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private storageService:StorageService) {
        if(this.getAuthStatus()) this.isAuth.next(true);
    }

    authenticate(path: string = "/") {
        var nonce = this.randomString(40);
        var clientId = environment.clientId;
        var authData = {clientId:clientId, state:nonce, requestedPath:path, idpIdentifier:"19833bb2-0701-447e-951e-43ef55990519"};
        this.storageService.store('authData',authData);
        window.location.href = environment.authServer+'oauth2/authorize?identity_provider='+environment.idpName+'&response_type=token&client_id='+clientId+'&redirect_uri='+environment.callbackUri+'&state='+nonce+'&scope=email+openid'
    }

    logout() {
        this.storageService.clear('authData');
        window.location.href = environment.authServer+'logout?client_id='+environment.clientId
    }

    getAuthStatus(): boolean {
        var authData = this.storageService.get('authData');
        if(authData) {
            if('accessToken' in authData) return true;
            return false;
        }
        return false;
    }

    randomString(length: number) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}