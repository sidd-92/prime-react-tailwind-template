import React, { useState } from "react";
import NavigationLink from "../components/NavigationLink/NavigationLink";
const SideBar = () => {
  const [openBurger, setOpenBurger] = useState(false);
  return (
    <React.Fragment>
      <div className="h-full w-20 fixed z-10 top-0 left-0 bg-teal-700 overflow-x-hidden pt-1 hidden sm:block">
        <div className="text-white font-bold text-center text-2xl  pb-5">CRM</div>
        <NavigationLink href="#" name="About" sideNav={true} />
        <NavigationLink href="#" name="People" sideNav={true} />
        <NavigationLink href="#" name="Sales" sideNav={true} />
        <NavigationLink href="#" name="Home" sideNav={true} />
      </div>
      <div className="w-full bg-teal-300 fixed z-10 top-0 left-0 overflow-x-hidden block sm:hidden">
        <div className="flex items-center justify-between px-3">
          <div onClick={() => setOpenBurger(!openBurger)}>
            <i className="pi pi-bars"></i>
          </div>
          <div className="text-black font-bold text-lg">CRM</div>
        </div>
        {openBurger ? (
          <div className="relative overflow-hidden h-56 bg-teal-500">
            <div className="absolute w-full pt-2">
              <NavigationLink href="#" name="About" sideNav={true} />
              <NavigationLink href="#" name="People" sideNav={true} />
              <NavigationLink href="#" name="Sales" sideNav={true} />
              <NavigationLink href="#" name="Home" sideNav={true} />
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default SideBar;
