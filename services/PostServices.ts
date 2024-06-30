import Api from "@/util/Api";
import { Posts, Users } from "@/util/Interfaces";

export default function PostsServices() {
    const getPosts = async (pg: number, perPg: number): Promise<{ posts: Posts[], totalItems: number, totalPages: number }> => {
        const last = perPg * pg;
        const first = last - perPg;

        const response = await Api.get("/posts");
        const data = response.data as Posts[];
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / perPg);

        return {
            posts: data.slice(first, last),
            totalItems,
            totalPages
        };
    }

    const getPostById = async (id: number): Promise<Posts> => {
        const response = await Api.get("/posts/" + id);
        return response.data;
    }


    return { getPosts, getPostById };
}
