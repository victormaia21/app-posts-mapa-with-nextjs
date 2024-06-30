'use client'
import { useEffect, useState } from "react";
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Link, Typography } from "@mui/material";
import { useQuery } from "react-query";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import UserServices from "@/services/UserServices";
import PostsServices from "@/services/PostServices";
import { PostFavorite } from "@/util/Interfaces";
import { useParams } from "next/navigation";

export default function Page() {
    const { getPostById } = PostsServices();
    const { getUserById } = UserServices();
    const { id } = useParams();

    const postId = Number(id);

    const { data: post, isLoading: postLoading, isError: postError } = useQuery(['post', postId], () => getPostById(postId), {
        enabled: !!postId,
    });

    const userId = post ? post.userId : null;

    const { data: user, isLoading: userLoading, isError: userError } = useQuery(
        ['user', userId],
        () => getUserById(userId as number),
        {
            enabled: !!userId,
        }
    );

    const [like, setLike] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<PostFavorite[] | null>(() => {
        const favStorage = localStorage.getItem('favs');
        return favStorage ? JSON.parse(favStorage) as PostFavorite[] : null;
    });

    const toggleFavorite = (id: number) => {
        const favStorage = localStorage.getItem('favs');
        if (favStorage) {
            const favToArray = JSON.parse(favStorage) as PostFavorite[];
            const idExist = favToArray.some((e) => e.id === id);
            if (idExist) {
                // Remove from favorites
                const updatedFavorites = favToArray.filter((e) => e.id !== id);
                localStorage.setItem('favs', JSON.stringify(updatedFavorites));
                setFavorites(updatedFavorites);
                setLike(false);
            } else {
                // Add to favorites
                favToArray.push({ id });
                localStorage.setItem('favs', JSON.stringify(favToArray));
                setFavorites(favToArray);
                setLike(true);
            }
        } else {
            const favArray: PostFavorite[] = [{ id }];
            localStorage.setItem('favs', JSON.stringify(favArray));
            setFavorites(favArray);
            setLike(true);
        }
    };

    useEffect(() => {
        if (favorites && post) {
            const postIsFavorite = favorites.some((e) => e.id === post.id);
            setLike(postIsFavorite);
        }
    }, [favorites, post]);

    if (postLoading || userLoading) return <div>Loading...</div>;
    if (postError || userError || !post || !user) return <div>Error loading data</div>;

    return (
        <section>
            <Card sx={{ maxWidth: "100%", height: "22em", overflow: "auto", justifyContent: "center" }}>
                <CardHeader
                    avatar={
                        <Link href={`/user/${user.id}`} underline="none">
                            <Avatar sx={{ bgcolor: red[500], cursor:"pointer" }} aria-label="recipe">
                                <span>{user.username}</span>
                            </Avatar>
                        </Link>
                    }
                    title={user.name}
                />
                <CardContent>
                    <Typography variant="body1" fontWeight="500">
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" marginTop=".75em">
                        {post.body}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={() => toggleFavorite(post.id)}>
                        <FavoriteIcon color={like ? 'error' : 'inherit'} />
                    </IconButton>
                </CardActions>
            </Card>
        </section>
    );
}
