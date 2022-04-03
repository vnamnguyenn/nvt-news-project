import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashBoard from '../pages/dashBoard/Dashboard';
import ErrorPage from '../pages/notFound';
import Post from '../pages/posts/Index';
import Signin from '../pages/auth/Signin';
import { useSelector } from 'react-redux';

const ROUTES = () => {
  const admin = useSelector((state) => state.user.currentUser?.exportData.isAdmin);
  return (
    <Routes>
      {admin && (
        <>
          <Route path="/" element={<DashBoard />} />
          <Route path="/posts">
            <Route index element={<Post />} />
          </Route>
        </>
      )}
      <Route path="/signin" element={<Signin />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default ROUTES;
