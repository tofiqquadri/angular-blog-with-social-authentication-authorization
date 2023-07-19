import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';

@Injectable()
export class AuthGuardService {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let url: string = state.url;
        return this.checkUserLogin(route, url);
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let url: string = state.url;
        return this.checkUserLogin(route, url);
    }

    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        if (this.authService.isAuthenticated()) {
            const userRoles = this.authService.getBasePrmissions() || [];
            const permissionsNeeded = route?.data['roles'];

            if (
                !(
                    permissionsNeeded &&
                    permissionsNeeded.every((element: any) => {
                        return userRoles.indexOf(element) !== -1;
                    })
                )
            ) {
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
