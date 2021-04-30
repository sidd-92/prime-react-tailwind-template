import React from "react";
//Links
export const linkHome = "/home";
export const linkPosts = "/home/posts";
//Links

//Link Names
export const linkNameHome = "Dashboard";
export const linkNamePosts = "Posts";
//Link Names

//Pages
const Posts = React.lazy(() => import("./components/views/Posts/Posts"));
const Dashboard = React.lazy(() =>
  import("./components/views/Dashboard/Dashboard")
);
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
];

export default routes;
