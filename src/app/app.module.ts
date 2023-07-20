import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PostCreateEditComponent } from './post/post-create-edit/post-create-edit.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PostsComponent } from './posts/posts.component';
import { AuthGuardService } from './core/auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import MatProgressSpinnerModule

import {
    SocialLoginModule,
    SocialAuthServiceConfig
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        PostCreateEditComponent,
        PostDetailComponent,
        PostsComponent,
        LoginComponent,
        NavBarComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SocialLoginModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    providers: [
        AuthGuardService,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            '956146513529-vigkql3j35ss2t1oq8hb7qtvhcg8va18.apps.googleusercontent.com'
                        )
                    }
                ]
            } as SocialAuthServiceConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
