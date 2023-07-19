import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/models/Post.model';
import { CreatePostInput } from 'src/app/models/inputs/create-post.input';

@Component({
    selector: 'app-post-create-edit',
    templateUrl: './post-create-edit.component.html',
    styleUrls: ['./post-create-edit.component.css']
})
export class PostCreateEditComponent {
    templateForm: FormGroup;
    private _post?: Post;

    get post(): Post | undefined {
        return this._post;
    }

    set post(post: Post | undefined) {
        this._post = post;
    }

    constructor(
        protected readonly postService: PostService,
        private readonly route: ActivatedRoute
    ) {
        this.templateForm = new FormGroup({
            title: new FormControl(this.post?.title ?? '', {
                validators: [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(66)
                ]
            }),
            desc: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.minLength(11),
                    Validators.maxLength(86)
                ]
            })
        });
    }

    ngOnInit(): void {
        const isEdit = this.checkIsUpdate();
        const postId = this.getPostId();

        if (isEdit) this.getPost(postId);
    }

    onSubmit(event: Event) {
        event.preventDefault();
        this.uploadPost();
    }

    uploadPost() {
        const post: CreatePostInput = {
            desc: this.templateForm.value.desc,
            title: this.templateForm.value.title
        };

        return this.postService.createPost(post);
    }

    checkIsUpdate() {
        return Boolean(this.route.snapshot.queryParamMap.get('edit'));
    }

    getPostId() {
        return String(this.route.snapshot.queryParamMap.get('id'));
    }

    getPost(id: string) {
        this.postService.getPostById(id);
        // .subscribe((results: any) => {
        //     console.log(results);
        //     // if (results.errors)
        //     this.post = results.data?.post;
        // });
    }
}
