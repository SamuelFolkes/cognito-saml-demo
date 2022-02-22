import { Injectable, OnDestroy } from '@angular/core';
    import { Subject } from 'rxjs';
    import { share } from 'rxjs/operators';
    
    @Injectable()
    export class StorageService implements OnDestroy {
      private onSubject = new Subject<{ key: string, value: any }>();
      public changes = this.onSubject.asObservable().pipe(share());
    
      constructor() {
        this.start();
      }
    
      ngOnDestroy() {
        this.stop();
      }
    
      public getStorage() {
        let s = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          s[sessionStorage.key(i)] = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)))
        }
        return s;
      }

      public get(key: string): any {
        return JSON.parse(sessionStorage.getItem(key));
      }
    
      public store(key: string, data: any): void {
        sessionStorage.setItem(key, JSON.stringify(data));
        //sessionStorage.setItem(key, data);
        this.onSubject.next({ key: key, value: data})
      }
    
      public clear(key) {
        sessionStorage.removeItem(key);
        this.onSubject.next({ key: key, value: null });
      }
    
    
      private start(): void {
        window.addEventListener("storage", this.storageEventListener.bind(this));
      }
    
      private storageEventListener(event: StorageEvent) {
        if (event.storageArea == sessionStorage) {
          let v;
          try { v = JSON.parse(event.newValue); }
          catch (e) { v = event.newValue; }
          this.onSubject.next({ key: event.key, value: v });
        }
      }
    
      private stop(): void {
        window.removeEventListener("storage", this.storageEventListener.bind(this));
        this.onSubject.complete();
      }
    }