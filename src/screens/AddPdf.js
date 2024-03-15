import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddPdfMain from "../components/pdf/AddPdfMain";

const AddPdf = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddPdfMain />
      </main>
    </>
  );
};

export default AddPdf;
