import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public add<T>(key: string, value: T): void {
    if (this.isBrowser()) { 
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  public get<T = string>(key: string): T | null {
    if (this.isBrowser()) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }

  public remove(...keys: string[]): void {
    if (this.isBrowser()) {
      keys.forEach((key: string) => {
        localStorage.removeItem(key);
      });
    }
  }

  public clearAll(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }
}
