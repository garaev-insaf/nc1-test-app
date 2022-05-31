
import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Link as RouterLink } from "react-router-dom";
import {
  useLocation
} from "react-router-dom";
import "./styles/NewsComponent.scss"
import { Pagination, PaginationItem, Card, CardContent, Container, Grid, Typography, Button, containerClasses } from '@mui/material';
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
  const [currentPageState, setCurrentPageState] = useState(parseInt(location.search.split('=')[1]) || 1); // вытягиваем значение страницы из url, либо присваиваем дефолтное значение первой страницы
  const [pageQty, setPageQty] = useState(Math.ceil(MAX_POSTS_COUNT / LIMIT_COUNT)); // с добавлением данных у нас увеличивается кол-во страниц, но эта реализация, по-моему мнению, лежит на backend'e 
  // и реализовывать эту логику  на клиенте - излиже. имхо.
  useEffect(() => {
    if (pageQty >= currentPageState && news.length === 0) {
      // данный useEffect нужен для получения первоначального значения при двух случаях:
      // 1. Перешли по ссылке на указанную страницу Ex: ?page=2
      // 2. Открыли вкладку новостей в первый раз
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
    // это делается для ряда случаев:
    // 1. Если мы решим перейти с 2+ странцы на news (у нас обнулится search), нам будет необходимо отправить запрос для получения первой страницы и
    // и присвоения текущей страницы 1.
    // 2. Если мы решим перейти со страницы профиля на страницу новостей, но перед этим находились на первой странице (повторного запроса не будет)
    // 3. Если мы решим перейсти со страницы профиля на странцу новостей, но перед этим находились не на первой странице (запрос первой страницы с обновлением стейта текущего состояния)
    if (location.search.length === 0 && currentPageState !== 1) {
      getNews(setLoading, 1);
      setCurrentPageState(1);
    }
  }, [location.search])
  
  return (
    <main className="main_news">
      {loading ? "Wait..." :
        <>
          <button className="button_open-modal" onClick={() => handleModal(<AddNewPost />)}>New Post</button>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {!!news && news.length > 0 ? news.map((post) => (
                // в случае добавления локального поста у нас не формируется id. Этот момент был осознанно упущен, потому что идентификация лежит не на клиенте
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