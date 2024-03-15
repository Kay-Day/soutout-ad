import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { USER_CREATE_RESET } from "../../Redux/Constants/UserContants";
import { createUser } from "../../Redux/Actions/userActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddUserMain = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, user } = productCreate;

  useEffect(() => {
    if (user) {
      toast.success("User Added", ToastObjects);
      dispatch({ type: USER_CREATE_RESET });
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(name, email, password));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/users" className="btn btn-danger text-white">
              Đi đến danh sách người dùng
            </Link>
            <h2 className="content-title">Thêm người dùng</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Thêm người dùng
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
                    <label htmlFor="user_title" className="form-label">
                      Tên người dùng
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tên người dùng..."
                      className="form-control"
                      id="user_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="user_email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập Email...."
                      className="form-control"
                      id="user_email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="user_password" className="form-label">
                      password
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập Password...."
                      className="form-control"
                      id="user_password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
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

export default AddUserMain;
