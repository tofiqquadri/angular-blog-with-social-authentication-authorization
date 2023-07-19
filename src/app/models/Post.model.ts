import { User } from './User.model';

export interface Post {
    title: string;
    desc: string;
    author: User;
}
