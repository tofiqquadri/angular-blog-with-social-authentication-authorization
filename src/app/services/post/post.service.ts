import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from 'src/app/models/Post.model';
import { CreatePostInput } from 'src/app/models/inputs/create-post.input';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl = 'http://localhost:3000/posts'; // Replace with your backend API URL

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
    };

    constructor(private http: HttpClient) {}

    // Get all posts
    getPosts(): Observable<Post[]> {
        return this.http
            .get<Post[]>(this.apiUrl)
            .pipe(catchError(this.handleError));
    }

    // Get a single post by ID
    getPostById(id: string): Observable<Post> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Post>(url).pipe(catchError(this.handleError));
    }

    // Create a new post
    createPost(post: CreatePostInput): Observable<Post> {
        return this.http
            .post<Post>(this.apiUrl, post, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    // Update an existing post
    updatePost(id: string, post: Post): Observable<Post> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
            .put<Post>(url, post, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    // Delete a post by ID
    deletePost(id: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
            .delete<any>(url, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    // Handle errors from HTTP requests
    private handleError(error: any): Observable<never> {
        console.error('An error occurred:', error);
        return new Observable<never>(() => {
            throw error;
        });
    }
}
