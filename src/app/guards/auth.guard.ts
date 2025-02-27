import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AssertionUtils } from '../helper/assertion-utils';
import { NavigationHelperService } from '../services/navigation-helper/navigation-helper.service';

export const authGuard: CanActivateFn = (route, state) => {
  const localstorageService = inject(LocalStorageService);
  const router = inject(NavigationHelperService);

  if(AssertionUtils.isNullOrUndefined(localstorageService.get('access_token'))) {
    router.navigateTo('/login');
    return false;
  }
  return true;
};
