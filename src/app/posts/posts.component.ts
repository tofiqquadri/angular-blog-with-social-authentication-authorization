import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post/post.service';
import { Post } from '../models/Post.model';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    private _posts?: Post[];

    constructor(private postService: PostService) {}

    ngOnInit(): void {
        this.postService.getPosts().subscribe((posts) => {
            console.log(posts);

            this._posts = posts;
        });
    }
}
