import React from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "../pages/dashBoard/Dashboard";
import NotFound from "../pages/NotFound";
import Post from "../pages/posts/Index";
import Signin from "../pages/auth/Signin";
import Tag from "../pages/tags/Index";
import Category from "../pages/categories/Index";
import Backup from "../pages/backup/Index";
import SignUp from "../pages/auth/Signup";

const ROUTES = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/posts">
        <Route index element={<Post />} />
      </Route>
      <Route path="/tags">
        <Route index element={<Tag />} />
      </Route>
      <Route path="/categories">
        <Route index element={<Category />} />
      </Route>
      <Route path="/backup">
        <Route index element={<Backup />} />
      </Route>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ROUTES;
