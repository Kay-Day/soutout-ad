import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PDF_CREATE_RESET } from "../../Redux/Constants/PdfContants";
import { createPdf } from "./../../Redux/Actions/PdfActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { imageUpload } from "../../ulities/imageUpload";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddPdfMain = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [pdfFileError, setPdfFileError] = useState("");

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.pdfCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PDF_CREATE_RESET });
      setName("");
      setFile("");
      setImage("");
    }
  }, [product, dispatch]);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      dispatch(createPdf(name, image, file));
    } catch (error) {
      console.log(error);
    }
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

  console.log(name);
  console.log(image);
  console.log(file);

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="content-header">
            <Link to="/pdf" className="btn btn-danger text-white">
              Đi đến danh sách tài liệu
            </Link>
            <h2 className="content-title">Thêm tài liệu</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Thêm tài liệu
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
                      required
                      onChange={(e) => handleImage(e)}
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
                      required
                      onChange={(e) => handlePdf(e)}
                    />
                    {pdfFileError && (
                      <div className="error-msg">{pdfFileError}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddPdfMain;
