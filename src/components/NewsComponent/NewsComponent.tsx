
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import {
  useLocation
} from "react-router-dom";
import { Pagination, PaginationItem, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { getNews } from '../../Actions/UserActions';
import { useGlobalState } from '../../State/State';

const LIMIT_COUNT = 12; // кол-во отображаемых постов
const MAX_POSTS_COUNT = 100; // кол-во постов (заранее известно)

const NewsComponent = (props: any) => {
  let location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [news] = useGlobalState('news');
  console.log();
  const [currentPageState, setCurrentPageState] = useState(parseInt(location.search.split('=')[1]) || 1);
  const [pageQty, setPageQty] = useState(Math.ceil(MAX_POSTS_COUNT / LIMIT_COUNT));
  useEffect(() => {
    if (news.length === 0) {
      getNews(setLoading, currentPageState);
    }
  }, [])

  useEffect(() => {
    if (pageQty >= currentPageState) {
      // проверяем: не достигли ли мы конца
      getNews(setLoading, currentPageState);
    }
  }, [currentPageState])

  return (
    <main className="main_news">
      {loading ? "Wait..." :
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
            count={pageQty}
            page={currentPageState}
            siblingCount={0}
            onChange={(_, number) => setCurrentPageState(number)}
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
      }
    </main>
  );
}

export { NewsComponent }