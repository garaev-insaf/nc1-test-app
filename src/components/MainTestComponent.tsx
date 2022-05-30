import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import HeaderComponent from './universal/HeaderComponent/HeaderComponent';
import { NewsComponent } from './NewsComponent/NewsComponent';
import { Route, Routes } from 'react-router-dom';
import { ProfileComponent } from './ProfileComponent/ProfileComponent';

const MainTestComponent = () => {
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<NewsComponent />} />
        <Route path='/profile' element={<ProfileComponent />} />
      </Routes>

    </>
  );
};

export default MainTestComponent;
