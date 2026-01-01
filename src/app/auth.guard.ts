import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  if (inject(AuthService).isLoggedIn === false) {
    inject(Router).navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
