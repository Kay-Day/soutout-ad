import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import axios from "axios";
import CropEasy from "../crop/CropEasy";
import { imageShow, imageUpload } from "../../ulities/imageUpload";
// import { URL } from "../../Redux/Url";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [ma, setMa] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [loanPrice, setLoanPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [images, setImages] = useState({});

  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState();
  const [openCrop, setOpenCrop] = useState(false);
  const [checkCrop, setCheckCrop] = useState(false);
  const fileRef = useRef();

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    return new Promise(async () => {
      const res = await axios.get(`http://localhost:5000/api/category/all/status/no`);
      if (res.status === 200) {
        setListCategory(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setCountInStock(0);
      setImages("");
      setPrice(0);
      setLoanPrice(0);
      setCategory("");
      setMa("");
    }
  }, [product, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const image = await imageUpload(images);
    if (image) {
      dispatch(
        createProduct(
          name,
          price,
          description,
          image,
          countInStock,
          loanPrice,
          category,
          ma
        )
      );
    }
  };

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    setImages(files[0]);
  };

  useEffect(() => {
    if (checkCrop) {
      setImages(file);
      fileRef.current.value = null;
      setCheckCrop(false);
    }
  }, [checkCrop]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Đi đến danh sách sản phẩm
            </Link>
            <h2 className="content-title">Thêm sản phẩm</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Thêm sản phẩm
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Mã Đại Diện
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={ma}
                      onChange={(e) => setMa(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Tiêu đề
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Giá Mua
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Danh Mục
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value=""></option>
                      {listCategory.map((item) => (
                        <option value={item._id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Tồn kho
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    {/* <label className="form-label">Hình ảnh</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                    /> */}
                    <input
                      className="form-control mt-3"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      ref={fileRef}
                    />
                  </div>
                  <div className="mb-4">
                    {images.name && imageShow(URL.createObjectURL(images))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {openCrop && (
          <CropEasy
            {...{ photoURL, setOpenCrop, setPhotoURL, setFile, setCheckCrop }}
          />
        )}
      </section>
    </>
  );
};

export default AddProductMain;
