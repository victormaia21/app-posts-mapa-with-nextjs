export interface Posts {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface Users {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string
        }
    }
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

export interface PostFavorite {
    id: number
}

export interface PostsPagination {
    posts: Posts[];
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}