import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectAccessGaurd implements CanActivate {

  constructor(private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(this.router.url === '/' || this.router.url === '/home'){
        if(next.routeConfig?.path === 'trabajos'){
          return true
        }
      }
      if(this.router.url === '/trabajos') {
        if(next.routeConfig?.path === 'factura/:id') {
            return true;
        }
      }

      this.router.navigate(['/notfound'])
      return false;
  }
}
