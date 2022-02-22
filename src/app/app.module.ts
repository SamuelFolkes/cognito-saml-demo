import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductsComponent } from './products/products.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { UserInfoComponent } from './user-info/user-info.component';

export function tokenGetter() {
  var authData = JSON.parse(sessionStorage.getItem('authData'));
  if(authData) {
      if('accessToken' in authData) return JSON.parse(sessionStorage.getItem('authData')).accessToken;
      return "";
  }
  return "";
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    TopBarComponent,
    ProductsComponent,
    ReportsComponent,
    DashboardComponent,
    InfoBarComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:  tokenGetter
      }
    })
  ],
  providers: [
    AuthService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
