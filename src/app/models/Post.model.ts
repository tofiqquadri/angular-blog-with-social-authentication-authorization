import { User } from './User.model';

export interface Post {
    id?: string;
    title: string;
    desc: string;
    author: User;
}
