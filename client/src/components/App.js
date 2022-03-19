import React from "react";

import "./fontAwesomeIcons";
import Header from "./Header";
import Footer from "./Footer";
import "../assets/css/index.css";

//<SubscribeForm/>

export default (props) => {
  return (
    
    <div>
      <Header sty/>

      <div style={{minHeight: "100vh", overflow: "hidden", display: "block", paddingBottom: "450px"}}>{props.children}</div>

      <Footer />
    </div>
  );
};
