import Api from "@/util/Api";
import { Posts } from "@/util/Interfaces";

export default function PostsServices() {
    const getPosts = async (pg: number, perPg: number, search: string): Promise<{ posts: Posts[], totalPages: number }> => {
        const last = perPg * pg;
        const first = last - perPg;
    
        const response = await Api.get("/posts");
        let data: Posts[] = response.data;
    
        if (search) {
            const lowerCaseSearch = search.toLowerCase();
            data = data.filter(post => 
                post.title.toLowerCase().includes(lowerCaseSearch) || 
                post.body.toLowerCase().includes(lowerCaseSearch)
            );
        }
    
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / perPg);
    
        return {
            posts: data.slice(first, last),
            totalPages,
        };
    }

    const getPostById = async (id: number): Promise<Posts> => {
        const response = await Api.get("/posts/" + id);
        return response.data;
    }


    return { getPosts, getPostById };
}
