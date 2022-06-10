import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "../pages/dashBoard/Dashboard";
import NotFound from "../pages/NotFound";
import Post from "../pages/posts/Index";
import Signin from "../pages/auth/Signin";
import { useSelector } from "react-redux";
import Tag from "../pages/tags/Index";
import Category from "../pages/categories/Index";

const ROUTES = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Routes>
      {user && user.exportData.isAdmin === true && (
        <>
          <Route path="/" element={<DashBoard />} />
          <Route path="/posts">
            <Route index element={<Post />} />
          </Route>
          <Route path="/tags">
            <Route index element={<Tag />} />
          </Route>
          <Route path="/category">
            <Route index element={<Category />} />
          </Route>
        </>
      )}

      {user == null && (
        <>
          <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ROUTES;
