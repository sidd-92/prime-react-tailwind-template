import React from "react";
import NavigationLink from "../components/NavigationLink/NavigationLink";
import SimpleDropdown from "../components/SimpleDropdown";
const TopNav = () => {
  return (
    <div className="bg-gray-300 overflow-hidden ml-20 h-10 hidden sm:block">
      <div className="w-40 float-right">
        <SimpleDropdown />
      </div>

      <NavigationLink href="#" name="Home" sideNav={false} />
    </div>
  );
};

export default TopNav;
