import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

constructor() { }
  private loading = false;

  public start(): void {
    this.loading = true;
  }

  public end(): void {
    this.loading = false;
  }

  public getLoader(): boolean {
    return this.loading;
  }
}
