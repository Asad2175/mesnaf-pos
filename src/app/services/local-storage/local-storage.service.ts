import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public add<T>(key: string, value: T): void {  
    localStorage.setItem(key, JSON.stringify(value))
  }

  public get<T = string>(key: string): T {  
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  
  public remove(...keys: string[]): void {
    keys.forEach((key: string) => {
      localStorage.removeItem(key);
    })
  }

  public clearAll(): void {
    localStorage.clear();
  }
}
