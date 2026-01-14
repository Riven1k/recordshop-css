import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const auth = inject(AuthService);
  const router = inject(Router);
  
  const allowedRoles = route.data['roles'] as string[];
  const userRole = auth.getRole();

  if(!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  if(!allowedRoles.includes(userRole!)) {
    router.navigate(['/records']);
    return false;
  }

  return true;
};
