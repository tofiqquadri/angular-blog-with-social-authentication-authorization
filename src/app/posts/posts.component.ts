import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post/post.service';
import { Post } from '../models/Post.model';
import { POST_URL } from '../constants/app-urls';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    posts?: Post[] = [];
    POST_DETAIL_URL = POST_URL;

    constructor(private postService: PostService) {}

    ngOnInit(): void {
        this.postService.getPosts().subscribe((posts) => {
            console.log(posts);
            
            this.posts = posts;
        });
    }
}
