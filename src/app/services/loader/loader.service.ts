import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

constructor() { }
private loadingSubject = new BehaviorSubject<boolean>(false);
private loaderTimer: any;

  public start(): void {
    clearTimeout(this.loaderTimer);
    this.loaderTimer = setTimeout(() => {
      this.loadingSubject.next(true);
    }, 0);
  }

  public end(): void {
    clearTimeout(this.loaderTimer);
    this.loadingSubject.next(false);
  }

  public getLoader(): Observable<boolean>  {
    return this.loadingSubject.asObservable();
  }
}
