import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="main-header navbar">
      <div className="col-search">
        <form className="searchform">
          <div className="input-group">
            <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Tìm kiếm..."
            />
            <button className="btn btn-light bg" type="button">
              <i className="far fa-search"></i>
            </button>
          </div>
          <datalist id="search_terms">
            <option value="Sản phẩm" />
            <option value="Đơn hàng" />
            <option value="Danh mục" />
            <option value="Người dùng" />
          </datalist>
        </form>
      </div>
      <div className="col-nav">
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <i className="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          <li className="nav-item">
            <Link className={`nav-link btn-icon `} title="Dark mode" to="#">
              <i className="fas fa-moon"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn-icon" to="#">
              <i className="fas fa-bell"></i>
            </Link>
          </li>
          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                className="img-xs rounded-circle"
                src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/432368699_122107207838232656_6577726678867768568_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=UrF4gyqGPlAAX-Fzgg5&_nc_oc=AdicbvROzHmgWNWnCI_CTw700eczZQC4sirSYN6-GSELgTugwPJshNGEW0NZeBYn-CZLLf-IbOvzl0moDOG930_D&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBTDp3MppwL0z_-N0qKzSUFzBmtz3w9Eq_Buvit5b_qgw&oe=65FF577C"
                alt="User"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/">
                Thông tin cá nhân
              </Link>
              <Link className="dropdown-item" to="#">
                Cài Đặt
              </Link>
              <Link
                onClick={logoutHandler}
                className="dropdown-item text-danger"
                to="#"
              >
                Thoát
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
