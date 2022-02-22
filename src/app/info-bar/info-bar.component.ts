import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit {
  authData:any;

  constructor(private storageService: StorageService ) { }

  ngOnInit() {
    this.setValues();
    this.storageService.changes.subscribe( value => {
      this.setValues();
    }); 
  }

  setValues():void {
    this.authData = JSON.stringify(this.storageService.get('authData'),null,4);
  }

}
