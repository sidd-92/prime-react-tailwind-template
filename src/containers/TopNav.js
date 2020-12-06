import React from "react";
import NavigationLink from "../components/NavigationLink/NavigationLink";

const TopNav = () => {
  return (
    <div className="bg-gray-300 overflow-hidden ml-20 h-10 hidden sm:block">
      <NavigationLink href="#" name="About" sideNav={false} />
      <NavigationLink href="#" name="People" sideNav={false} />
      <NavigationLink href="#" name="Sales" sideNav={false} />
      <NavigationLink href="#" name="Home" sideNav={false} />
    </div>
  );
};

export default TopNav;
