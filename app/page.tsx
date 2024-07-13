'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { useQuery } from 'react-query';
import PostServices from '@/services/PostServices';
import { useState } from 'react';
import { Grid, Button, Pagination, Stack } from '@mui/material';
import Post from '@/components/Post';
import useStore from '@/util/useStore';

export default function RecipeReviewCard() {
  const { search } = useStore();
  const [pg, setPg] = useState<number>(1);
  const [perPg] = useState<number>(20);

  const { getPosts } = PostServices();

  const { data } = useQuery(['posts', pg, perPg, search], () => getPosts(pg, perPg, search));

  console.log(pg)
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
