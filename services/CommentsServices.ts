import Api from "@/util/Api";
import { Comment, Posts, Users } from "@/util/Interfaces";

export default function CommentsServices() {
    const getCommentsByPost = async (id: number): Promise<Comment[]> => {
        const response = await Api.get("/comments?postId=" + id);
        return response.data;
    } 


    return { getCommentsByPost };
}
