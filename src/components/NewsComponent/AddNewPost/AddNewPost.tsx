
import { Button, TextField } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { setNews, useGlobalState } from '../../../State/State';
import { NewsType } from '../../../static/types/types';
import { ModalContext } from '../../modal/ModalContext/ModalContext';

const initialNewPostState: NewsType = {
  userId: 1,
  title: '',
  body: '',
}

const AddNewPost = () => {
  const { handleModal } = React.useContext(ModalContext)
  const [newPostState, setNewPostState] = useState<NewsType>(() => initialNewPostState)
  const [news] = useGlobalState('news');
  const handleInputChange = (event: any) => {
    const { name, value } = event.currentTarget;
    setNewPostState({ ...newPostState, [name]: value });
  };
  const sendPost = () => {
    if (newPostState.title.length > 0 && newPostState.body.length > 0) {
      const timeArray = news;
      const newTimeArray = [newPostState, ...news];
      setNews(newTimeArray);
      handleModal();
    }
    else {
      alert('заполните все поля!') 
    }
  }
  return (
    <form className="main_news">
      <TextField sx={{ width: '100%', my: '10px' }} id="outlined-basic" required name='title' label="title" variant="outlined" onChange={handleInputChange} value={newPostState.title} inputProps={{
        maxLength: 50
      }} />
      <TextField sx={{ width: '100%', my: '10px', maxHeight: '50vh', overflow: 'auto' }} id="outlined-basic" required multiline name='body' label="body" onChange={handleInputChange} variant="outlined" value={newPostState.body} inputProps={{
        maxLength: 100
      }}/>
      <Button onClick={() => sendPost()}>Добавить</Button>
    </form>
  );
}

export { AddNewPost }