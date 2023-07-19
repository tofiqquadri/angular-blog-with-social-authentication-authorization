import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    user: SocialUser | null = null;
    @Input() GOOGLE_CLIENT_ID: string;

    constructor(
        private authService: AuthService,
        private socialAuthService: SocialAuthService
    ) {
        this.GOOGLE_CLIENT_ID = environment.googleClientId;
        
        this.socialAuthService.authState.subscribe((user: SocialUser) => {
            console.log(user);
            this.user = user;
        });
    }

    signOut(): void {
        this.authService.signOut();
    }
}
