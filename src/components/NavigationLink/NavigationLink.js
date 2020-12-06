import React from "react";

const NavigationLink = ({ href, name, sideNav }) => {
  return sideNav ? (
    <a className="p-3 no-underline text-lg text-black sm:text-purple-200 block hover:text-pink-400 hover:bg-red-100" href={href}>
      {name}
    </a>
  ) : (
    <a className="sm:float-right text-button hover:text-button2 hover:bg-white text-center px-4 no-underline text-xl sm:py-1" href={href}>
      {name}
    </a>
  );
};

export default NavigationLink;
