import React from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useSelector } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
// import Chart from 'chart.js/auto';
import { useState, useEffect } from "react";
// import { Bar } from 'react-chartjs-2';
import { monthNames } from "../../ulities/imageUpload";

const Main = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const [data, setData] = useState([]);
  const [res, setRes] = useState({});

  const handleDownload = async () => {
    const res = await axios.get(`http://localhost:5000/api/orders/all`);
    if (res.data?.data?.file) {
      const linkSource = res.data.data.file;
      const downloadLink = document.createElement("a");
      const fileName = res.data.data.name;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  };

  console.log('====================================');
  console.log(data);
  console.log('====================================');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5000/api/orders/filter/2023-0-1/2023-11-31");
      setData(result.data);
      renderChart();
    };
  
    fetchData();
  }, []);

  const renderChart = () => {
      const labels = monthNames(data.map((item) => item._id.month));
    const counts = data.map((item) => item.count);
    const totalPrice = data.map((item) => item.totalPrice);

    const ress = {
      labels: labels,
      datasets: [
        {
          label: 'Số lượng',
          data: counts,
          fill: true,
          backgroundColor: '#742774',
          borderColor: '#742774',
        },
        {
          label: 'Tổng giá trị',
          data: totalPrice,
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)'
        },
      ],
    };

    return ress;
  };

  return (
    <>
      <section className="content-main">
        {/* <CSVLink
          data={orders}
          className="btn btn-success"
          style={{
            float: "right",
          }}
        >
          Xuất File CSV
        </CSVLink> */}
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>

        <TopTotal orders={orders} products={products} />
        <div className="row">
        <div className="col-xl-12 col-lg-12">
      {/* <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Thống kê theo tháng</h5>
          {<Bar data={renderChart()} />}
        </article>
      </div> */}
    </div>
        </div>
        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
        </div>
        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
