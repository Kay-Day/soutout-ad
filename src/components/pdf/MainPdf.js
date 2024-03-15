import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listPdf } from "../../Redux/Actions/PdfActions";
import Pdf from "./Pdf";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import axios from "axios";
import { URL } from "../../Redux/Url";

const MainPdf = () => {
  const [keyword, setKeyword] = useState();
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(0);
  const dispatch = useDispatch();
  let history = useHistory();

  const pdfList = useSelector((state) => state.pdfList);
  const { loading, error, products } = pdfList;

  const pdfDelete = useSelector((state) => state.pdfDelete);
  const { error: errorDelete, success: successDelete } = pdfDelete;

  useEffect(() => {
    dispatch(listPdf());
  }, [dispatch, successDelete]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.get(`${URL}/api/pdf/searchpdf/${keyword}`);
      if (data.status === 200) {
        setData(data.data);
        setIsSearch(1);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách sản phẩm</h2>
        <div>
          <Link to="/addpdf" className="btn btn-primary">
            Thêm file phẩm mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <form onSubmit={submitHandler} className="input-group">
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control p-2"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </form>
            </div>
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Tất cả danh mục</option>
                <option>Sách lập trình</option>
                <option>Sách khoa học</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Thêm cũ nhất</option>
                <option>Thêm mới nhất</option>
                <option>Đã xem</option>
              </select>
            </div> */}
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {isSearch == 0
                ? products.map((product) => (
                    <Pdf product={product} key={product._id} />
                  ))
                : data.map((product) => (
                    <Pdf product={product} key={product._id} />
                  ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainPdf;
