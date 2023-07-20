import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { Router } from '@angular/router';
import { ADMIN_DASHBOARD } from '../../../app/constants/app-urls';
import { POST_CREATE_URL } from '../../../app/constants/app-urls';

const PERMISSIONS_AND_URL_MAP = [
    {
        roles: ['CREATE_POST', 'READ_POST', 'UPDATE_POST', 'DELETE_POST'],
        url: ADMIN_DASHBOARD,
        label: 'Dashboard'
    },
    {
        roles: ['CREATE_POST'],
        url: POST_CREATE_URL,
        label: 'New Post'
    }
];

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    constructor(private auth: AuthService, private route: Router) {
        this.isLoggedIn = this.auth.isAuthenticated();
        // this.basePermissions = this.auth.getBasePrmissions() || [];
        this.mapAllowedNavigationURLSToUserPermissions();

        this.auth.authState$.subscribe((isAuthenticated) => {
            this.isLoggedIn = isAuthenticated;
            console.log(isAuthenticated);
            
            this.mapAllowedNavigationURLSToUserPermissions();
        });
    }

    isLoggedIn: boolean = false;
    allowedNavigationURLs: any[] = [];
    // basePermissions: any[] = [];

    private mapAllowedNavigationURLSToUserPermissions() {
        this.allowedNavigationURLs = [];

        for (let index = 0; index < PERMISSIONS_AND_URL_MAP.length; index++) {
            const element = PERMISSIONS_AND_URL_MAP[index];
            let permissionsNeeded = element.roles;
            let basePermissions = this.auth.getBasePrmissions() || [];
            console.log(basePermissions);

            const hasPermissions =
                permissionsNeeded &&
                permissionsNeeded.every((element: any) => {
                    return basePermissions.indexOf(element) !== -1;
                });

            if (hasPermissions) {
                this.allowedNavigationURLs.push({
                    url: element.url,
                    label: element.label
                });
            }
        }
    }

    logOut() {
        this.auth.signOut();
        this.isLoggedIn = false;
        this.route.navigate(['/login']);
    }
}
