import React from "react";
//Links
export const linkMaintain = "/";
//Links

//Link Names
export const linkNameMaintain = "Maintain Forecasts";
//Link Names

//Pages
const Posts = React.lazy(() => import("./components/views/Posts/Posts"));
const Dashboard = React.lazy(() =>
  import("./components/views/Dashboard/Dashboard")
);
//Pages

const routes = [
  {
    path: "/",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/posts",
    exact: true,
    name: "Posts",
    component: Posts,
  },
];

export default routes;
