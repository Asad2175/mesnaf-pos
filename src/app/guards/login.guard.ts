import { CanActivateFn } from '@angular/router';
import { AssertionUtils } from '../helper/assertion-utils';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { NavigationHelperService } from '../services/navigation-helper/navigation-helper.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const localstorageService = inject(LocalStorageService);
    const router = inject(NavigationHelperService);
  
    if(!AssertionUtils.isNullOrUndefined(localstorageService.get('access_token'))) {
      router.navigateTo('/pos');
      return false;
    }
    return true;
};
