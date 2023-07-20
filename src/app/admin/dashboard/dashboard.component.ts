import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from '../../../app/models/Post.model';
import { PostService } from '../../../app/services/post/post.service';
import { POST_EDIT_URL } from '../../../app/constants/app-urls';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    constructor(private postService: PostService) {}

    posts?: any = [];
    POST_EDIT_URL = POST_EDIT_URL;
    loading = false;

    ngOnInit(): void {
        this.postService.getAdminPosts().subscribe((posts) => {
            if (posts) {
                this.posts = new MatTableDataSource<Post>(posts);
            }
        });
    }

    deletePost(id: string): void {
        this.loading = true;
        this.postService.deletePost(id).subscribe({
            next: (res) => {
                this.posts = new MatTableDataSource<Post>(
                    this.posts.data.filter((post: Post) => post.id !== id)
                );
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
            }
        });
    }
}
