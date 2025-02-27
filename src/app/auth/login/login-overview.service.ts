import { Injectable } from '@angular/core';
import { Login } from './login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginOverviewService {
loginData!: Login;
username!: string;

constructor() { }

  public setData(data: Login) {
    this.loginData = data;
  }

  public getData(): Login {
    return this.loginData;
  }

  public setUsername(data: string) {
    this.username = data;
  }

  public getUsername(): string {
    return this.username;
  }

}
