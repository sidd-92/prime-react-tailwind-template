import React from "react";
//Links
export const linkHome = "/home";
export const linkPosts = "/home/posts";
export const linkAdmin = "/home/admin";
//Links

//Link Names
export const linkNameHome = "Dashboard";
export const linkNamePosts = "Posts";
export const linkNameAdmin = "Admin";
//Link Names

//Pages
const Posts = React.lazy(() => import("./components/views/Posts/Posts"));
const Dashboard = React.lazy(() =>
  import("./components/views/Dashboard/Dashboard")
);
const Admin = React.lazy(() => import("./components/views/Admin/Admin"));
//Pages

const routes = [
  {
    path: linkHome,
    exact: true,
    name: linkNameHome,
    component: Dashboard,
  },
  {
    path: linkPosts,
    exact: true,
    name: linkNamePosts,
    component: Posts,
  },
  {
    path: linkAdmin,
    exact: true,
    name: linkNameAdmin,
    component: Admin,
  },
];

export default routes;
