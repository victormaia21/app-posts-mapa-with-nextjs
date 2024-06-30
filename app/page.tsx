'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { useQuery } from 'react-query';
import PostServices from '@/services/PostServices';
import { useState } from 'react';
import { Grid, Button, Pagination, Stack } from '@mui/material';
import Post from '@/components/Post';
import { Posts } from '@/util/Interfaces';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [pg, setPg] = useState<number>(1);
  const [perPg, setPerPg] = useState<number>(20);

  const { getPosts } = PostServices();

  const { data, isLoading, isError } = useQuery(['posts', pg, perPg], () => getPosts(pg, perPg));

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPg(value);
  };

  return (
    <section>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 1, md: 2 }} padding="0 .5em">
        {data && data.posts.length > 0 && data.posts.map((e, i) => (
          <Post id={e.id} title={e.title} body={e.body} userId={e.userId} key={i} />
        ))}
      </Grid>
      <div>
      {data && (
        <Stack spacing={2} display="flex" alignItems="center" marginTop="2em" padding="1em 0 1em 0">
          <Pagination count={data.totalPages} color="primary" onChange={handleChange}/>
        </Stack>
      )}
      </div>
    </section>
  );
}
