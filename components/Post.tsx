import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { Button, Grid, IconButton, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import UserServices from '../services/UserServices';
import CommentsServices from '@/services/CommentsServices';
import { PostFavorite } from '@/util/Interfaces';
import { useQuery } from 'react-query';

interface Props {
  title: string;
  body: string;
  userId: number;
  id: number;
}

export default function Post({ title, body, userId, id }: Props) {
  const { getUserById } = UserServices();
  const { getCommentsByPost } = CommentsServices();

  const { data: user } = useQuery(['user', userId], () => getUserById(userId));
  const { data: comments } = useQuery(['posts', userId], () => getCommentsByPost(id));
  console.log(comments)

  const [bodyOpen, setBodyOpen] = useState<boolean>(false);
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
    const favoritesPostsStorage = localStorage.getItem('favs');
    if (favoritesPostsStorage) {
      const favoritesPostsToJson = JSON.parse(favoritesPostsStorage) as PostFavorite[];
      const postIsFavorite = favoritesPostsToJson.some((e) => e.id === id);
      setLike(postIsFavorite);
    }
  }, [favorites, id]);

  return (
    <Grid item xs={4} marginTop=".5em" >
      <Card sx={{ height: "22em", overflow: "auto", justifyContent:"center" }}>
        <CardHeader
          avatar={
            <Link href={`/user/${userId}`} underline='none'>
              <Avatar sx={{ bgcolor: red[500], ":hover":{bgcolor: red[700]} }} aria-label="recipe">
                {user && user.username}
              </Avatar>
            </Link>
          }
          title={title}
        />
        <CardContent>
          <Typography variant='body1' fontWeight="500">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" marginTop=".75em">
            {body.length > 120 && !bodyOpen ? (
              <>
                {body.slice(0, 120)} <span className='see-more' onClick={() => setBodyOpen((option) => !option)}>See more...</span>
              </>
            ) : body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={() => toggleFavorite(id)}>
            <FavoriteIcon color={like ? 'error' : 'inherit'} />
          </IconButton>
        </CardActions>
        <CardContent sx={{display:"flex", justifyContent:"right"}}>
          <Button variant="contained" href={`/post/${id}`}>
            Ver mais
          </Button>
        </CardContent>
        <div className="comments">
          <h2>Comments</h2>
          {comments && comments.length > 0 && comments.map((comm, i) => (
            <div key={i}>
              <Link href={`/user/${userId}`}><p><b><u>Username</u></b>: {comm.email}</p></Link>
              <p><b><u>Comment</u></b>: {comm.body}</p>
            </div>
          ))}
        </div>
      </Card>
    </Grid>
  );
}
