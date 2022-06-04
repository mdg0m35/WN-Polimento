import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../service/services.service';


@Injectable({
  providedIn: 'root'
})
export class AutoGuard implements CanActivate{

  constructor(
    private authService: ServicesService,
    private route :Router
  ) { }

  canActivate(
    router:ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean  {

   if(this.authService.usuarioEstaAutenticado()){
     return true;
   }
   this.route.navigate(['/login']);
   return false
  }

}
