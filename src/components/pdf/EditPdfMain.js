import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPdf, updatePdf } from "./../../Redux/Actions/PdfActions";
import { PDF_UPDATE_RESET } from "../../Redux/Constants/PdfContants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditPdfMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [pdfFileError, setPdfFileError] = useState("");

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.pdfEdit);
  const { loading, error, product } = productEdit;

  const pdfUpdate = useSelector((state) => state.pdfUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = pdfUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PDF_UPDATE_RESET });
      toast.success("Product Updated", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editPdf(productId));
      } else {
        setName(product.name);
        setImage(product.image);
        setFile(product.file);
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePdf({
        _id: productId,
        name,
        image,
        file,
      })
    );
  };

  const handleImage = async (e) => {
    const fileImage = await imageUpload(e.target.files[0]);
    setImage(fileImage);
  };

  const fileType = ["application/pdf"];
  const handlePdf = async (e) => {
    // const fileImage = await imageUpload(e.target.files[0]);
    // setFile(e.target.files[0]);
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/pdf" className="btn btn-danger text-white">
              Đi đến trang chủ tài liệu
            </Link>
            <h2 className="content-title">Cập nhật tài liệu</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
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
                        <label className="form-label">Hình ảnh</label>
                        <input
                          className="form-control"
                          type="file"
                          placeholder="Enter Image URL"
                          onChange={(e) => handleImage(e)}
                        />
                        <img
                          src={image}
                          alt=""
                          style={{
                            height: "100px",
                            width: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">
                          Tài liệu{" "}
                          <p style={{ color: "red", display: "inline-block" }}>
                            ( Nhận mỗi file PDF)
                          </p>{" "}
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          placeholder="Enter File "
                          accept="application/pdf"
                          onChange={(e) => handlePdf(e)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditPdfMain;
