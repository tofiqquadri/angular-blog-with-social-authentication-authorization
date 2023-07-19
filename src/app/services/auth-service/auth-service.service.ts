import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { of } from 'rxjs';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private jwtHelper: JwtHelperService = new JwtHelperService();

    isLogin = false;
    isAdmin = false;
    basePermissions: string[] = [];
    user: SocialUser | null = null;

    constructor(
        private authService: SocialAuthService,
        private http: HttpClient
    ) {
        this.user = null;
        this.authService.authState.subscribe((user: SocialUser) => {
            if (user) {
                this.handleSocialLogin(user);
                this.user = user;
            }
        });
    }

    signOut(): void {
        this.authService.signOut();
        localStorage.removeItem('token');
        localStorage.removeItem('authUser');
        localStorage.removeItem('socialIdToken');
        localStorage.removeItem('tokenProvider');
        localStorage.removeItem('basePermissions');
    }

    async initializeAuthService(): Promise<void> {
        const token = this.getToken();
        const provider = this.getTokenProvider();

        if (!provider || !token) {
            return;
        }

        this.authService
            .getAccessToken(GoogleLoginProvider.PROVIDER_ID)
            .then((accessToken) => {
                console.log(accessToken);
            });
    }

    private handleSocialLogin(socialUser: SocialUser): void {
        this.http
            .post<any>('http://localhost:3000/auth/' + socialUser.provider, {
                idToken: socialUser.idToken
            })
            .subscribe((data) => {
                if (data.success) {
                    this.setSocialIdToken(socialUser.idToken);
                    this.setToken(data.data.jwtToken);
                    this.setProvider(socialUser.provider);

                    const tokenData = this.jwtHelper.decodeToken(
                        data.data.jwtToken
                    );
                    this.setBasePermissions(tokenData.basePermissions);
                    delete tokenData.basePermissions;
                    this.setUserData(tokenData);
                } else {
                    // Error on login failure
                }
            });
    }

    private setSocialIdToken(token: string): void {
        localStorage.setItem('socialIdToken', token);
    }

    private setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    private setProvider(provider: string): void {
        localStorage.setItem('tokenProvider', provider);
    }

    private setBasePermissions(permissions: any[]): void {
        localStorage.setItem('basePermissions', JSON.stringify(permissions));
    }

    private setUserData(user: any): void {
        localStorage.setItem('authUser', JSON.stringify(user));
    }

    getUserData(): any | null {
        return JSON.parse(localStorage.getItem('authUser') || '{}');
    }

    getSocialIdToken(): string | null {
        return localStorage.getItem('socialIdToken');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getTokenProvider(): string | null {
        return localStorage.getItem('tokenProvider');
    }

    getBasePrmissions(): any[] | null {
        return JSON.parse(localStorage.getItem('basePermissions') || '[]');
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return !this.jwtHelper.isTokenExpired(token || '');
    }

    // logout() {
    //     this.isLogin = false;
    //     this.isAdmin = false;
    //     this.basePermissions = [];
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('isAdmin');
    //     return of({
    //         success: this.isLogin,
    //         isAdmin: false,
    //         basePermissions: []
    //     });
    // }
}
