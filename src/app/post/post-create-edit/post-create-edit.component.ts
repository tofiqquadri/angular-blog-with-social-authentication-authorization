import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../../app/services/post/post.service';
import { CreatePostInput } from '../../../app/models/inputs/create-post.input';

@Component({
    selector: 'app-post-create-edit',
    templateUrl: './post-create-edit.component.html',
    styleUrls: ['./post-create-edit.component.css']
})
export class PostCreateEditComponent {
    constructor(
        protected readonly postService: PostService,
        private readonly activatedRoute: ActivatedRoute
    ) {
        activatedRoute.params.subscribe((param: any) => {
            if (param && param.id) {
                this.isCreate = false;
                this.getPost(param.id);
            } else {
                this.isCreate = true;
            }
        });
    }

    isCreate: boolean = false;
    loading = false; // Add loading state variable

    templateForm: FormGroup = new FormGroup({
        title: new FormControl('', {
            validators: [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(66)
            ]
        }),
        desc: new FormControl('', {
            validators: [Validators.required, Validators.maxLength(5000)]
        })
    });

    ngOnInit(): void {}

    onSubmit(event: Event) {
        event.preventDefault();
        this.uploadPost();
    }

    uploadPost() {
        const post: CreatePostInput = {
            desc: this.templateForm.value.desc,
            title: this.templateForm.value.title
        };
        console.log(post);
        this.loading = true; // Show the loader when submitting the form

        if (this.templateForm.valid) {
            if (this.isCreate) {
                this.postService.createPost(post).subscribe({
                    next: (res) => {
                        this.loading = false; // Hide the loader once the data is submitted
                        // todo show alert and navigate to post list page
                        this.templateForm.reset(); // Reset the form once the data is submitted
                    },
                    error: (error) => {
                        this.loading = false; // Hide the loader if there's an error
                        // Handle error, e.g., show error message
                    }
                });
            } else {
                let updatePost = { ...this.templateForm?.value };
                delete updatePost.id;

                this.postService
                    .updatePost(this.templateForm.get('id')?.value, updatePost)
                    .subscribe({
                        next: (res) => {
                            this.loading = false; // Hide the loader once the data is submitted
                            // todo show alert and navigate to post list page
                            this.templateForm.reset(); // Reset the form once the data is submitted
                        },
                        error: (error) => {
                            this.loading = false; // Hide the loader if there's an error
                            // Handle error, e.g., show error message
                        }
                    });
            }
        } else {
            this.templateForm.markAsTouched();
        }
    }

    getPost(id: string) {
        this.loading = true; // Show the loader when submitting the form
        this.postService.getPostById(id).subscribe({
            next: (res) => {
                console.log(res);
                this.loading = false; // Hide the loader if there's an error
                this.templateForm.registerControl(
                    'id',
                    new FormControl(id, [Validators.required])
                );
                this.templateForm.get('title')?.patchValue(res.title);
                this.templateForm.get('desc')?.patchValue(res.desc);
            },
            error: (error) => {
                this.loading = false; // Hide the loader if there's an error
                // Handle error, e.g., show error message
            }
        });
    }
}
