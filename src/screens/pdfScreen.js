import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainPdf from "../components/pdf/MainPdf";

const PdfScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainPdf />
      </main>
    </>
  );
};
export default PdfScreen;
