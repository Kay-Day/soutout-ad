import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import axios from "axios";
import { URL } from "../../Redux/Url";

const MainProducts = () => {
  const [keyword, setKeyword] = useState();
  const [isSearch, setIsSearch] = useState(0);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  let history = useHistory();

  // const MainProducts = () => {
  //   const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.get(`${URL}/api/products/search/${keyword}`);
      if (data.status === 200) {
        setIsSearch(1);
        setData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeOption = async (e) => {
    try {
      const data = await axios.get(
        `${URL}/api/products/searchProduct/${e.target.value}`
      );
      if (data.status === 200) {
        setIsSearch(1);
        setData(data.data);
        console.log(data);
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
          <Link to="/addproduct" className="btn btn-primary">
            Thêm sản phẩm mới
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
            <div className="col-lg-2 col-6 col-md-3"></div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                onChange={(e) => handleChangeOption(e)}
              >
                <option value="old">Thêm cũ nhất</option>
                <option value="new">Thêm mới nhất</option>
              </select>
            </div>
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
                    <Product product={product} key={product._id} />
                  ))
                : data.map((product) => (
                    <Product product={product} key={product._id} />
                  ))}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
