import React from "react";
import Menu from "./menu";
import Footer from "./footer";

const layout = ({ children }) => {
  return (
    <>
      <Menu />
      {children}
      <Footer />
    </>
  );
};

export default layout;
