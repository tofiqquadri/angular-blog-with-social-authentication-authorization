import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PostCreateEditComponent } from './post/post-create-edit/post-create-edit.component';
import { PostsComponent } from './posts/posts.component';
import { AuthGuardService } from './core/auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';

const routes: Routes = [
    {
        path: 'admin/dashboard',
        canActivate: [AuthGuardService],
        data: {
            roles: ['CREATE_POST', 'READ_POST', 'UPDATE_POST', 'DELETE_POST']
        },
        component: DashboardComponent
    },
    {
        path: 'post/create',
        component: PostCreateEditComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['CREATE_POST'] }
    },
    {
        path: 'post/edit/:id',
        component: PostCreateEditComponent,
        data: {
            roles: ['UPDATE_POST', 'DELETE_POST']
        }
    },
    {
        path: 'post/:id',
        component: PostDetailComponent,
        data: {
            roles: []
        }
    },
    { path: 'login', component: LoginComponent },
    { path: '', component: PostsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
