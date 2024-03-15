import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import Slide from "../components/slide/Slide";

const SlideScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Slide />
      </main>
    </>
  );
};

export default SlideScreen;
