import React from "react";

const Layout = ({ children,Navbar }) => {
  return (
    <div className="flex">
      <Navbar />
      <div className="container mx-auto mt-8">{children}</div>
    </div>
  );
};

export default Layout;