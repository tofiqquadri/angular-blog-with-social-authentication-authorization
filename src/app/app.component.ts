import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service/auth-service.service';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'jk-tech-blog';
    user: SocialUser | null = null;

    constructor(
        private authService: AuthService
    ) {
        if(!this.authService.isAuthenticated()) {
            // Redirect unquthenticated user
        }
    }
}
