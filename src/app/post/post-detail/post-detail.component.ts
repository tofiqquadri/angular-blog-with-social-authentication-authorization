import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../app/models/Post.model';
import { PostService } from '../../../app/services/post/post.service';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
    post?: Post;

    constructor(
        private postService: PostService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        let id = this.route.snapshot.params['id'] || '';

        this.postService.getPostById(id).subscribe(data => {
            this.post = data;
        });
    }
}
