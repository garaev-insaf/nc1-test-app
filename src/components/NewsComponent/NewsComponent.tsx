
import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Link as RouterLink } from "react-router-dom";
import {
  useLocation
} from "react-router-dom";
import "./styles/NewsComponent.scss"
import { Pagination, PaginationItem, Card, CardContent, Container, Grid, Typography, Button } from '@mui/material';
import { getNews } from '../../Actions/UserActions';
import { useGlobalState } from '../../State/State';
import { ModalContext } from '../modal/ModalContext/ModalContext';
import { AddNewPost } from './AddNewPost/AddNewPost';

const LIMIT_COUNT = 12; // кол-во отображаемых постов
const MAX_POSTS_COUNT = 100; // кол-во постов (заранее известно)

const NewsComponent = () => {
  const { handleModal } = useContext(ModalContext)
  let location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [news] = useGlobalState('news');
  console.log();
  const [currentPageState, setCurrentPageState] = useState(parseInt(location.search.split('=')[1]) || 1);
  const [pageQty, setPageQty] = useState(Math.ceil(MAX_POSTS_COUNT / LIMIT_COUNT));

  useEffect(() => {
    if (pageQty >= currentPageState && news.length === 0) {
      // проверяем: не достигли ли мы конца
      getNews(setLoading, currentPageState);
    }
  }, [])

  const takeNewPosts = (e: any, number: number) => {
    if (pageQty !== number) {
      // проверяем: не достигли ли мы конца
      getNews(setLoading, number);
    }
    setCurrentPageState(number);

  }
  useEffect(() => {
    console.log(news);
  }, [news])
  return (
    <main className="main_news">
      {loading ? "Wait..." :
        <>
          <button onClick={() => handleModal(<AddNewPost />)}>New Post</button>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {!!news && news.length > 0 ? news.map((post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      <Typography>
                        {post.body}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
                : null}
            </Grid>
            <Pagination
              className="custom-pagination"
              count={pageQty}
              page={currentPageState}
              siblingCount={0}
              onChange={(e, number) => takeNewPosts(e, number)}
              sx={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center'
              }}
              renderItem={
                (params) => (
                  <PaginationItem
                    component={RouterLink}
                    to={`/?page=${params.page}`}
                    {...params}
                  />
                )
              }
            />
          </Container>
        </>
      }
    </main>
  );
}

export { NewsComponent }