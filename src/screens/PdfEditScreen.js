import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditPdfMain from "../components/pdf/EditPdfMain";

const PdfEditScreen = ({ match }) => {
  const productId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditPdfMain productId={productId} />
      </main>
    </>
  );
};
export default PdfEditScreen;
