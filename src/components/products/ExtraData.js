import React from "react";

const ExtraData = () => {
  return (
    <aside className="col-xl-4 col-lg-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          {/* categories */}
          <>
            <h5 className="mb-3">Categories</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat"
              />
              <label className="form-check-label" htmlFor="product-cat">
                Sách lập trình
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-1"
              />
              <label className="form-check-label" htmlFor="product-cat-1">
                Sách khoa học
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-2"
              />
              <label className="form-check-label" htmlFor="product-cat-2">
                Sách giáo khoa
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-3"
              />
              <label className="form-check-label" htmlFor="product-cat-3">
                Sách văn học
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-4"
              />
              <label className="form-check-label" htmlFor="product-cat-4">
                Sách hóa học
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-5"
              />
              <label className="form-check-label" htmlFor="product-cat-5">
                Sách thiếu nhi
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-8"
              />
              <label className="form-check-label" htmlFor="product-cat-8">
                Sách toán
              </label>
            </div>
          </>
          {/* Colors */}
          <>
            <h5 className="mb-3 mt-4">Màu sắc</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat"
              />
              <label className="form-check-label" htmlFor="product-cat">
                Vàng
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-1"
              />
              <label className="form-check-label" htmlFor="product-cat-1">
                Xanh lá
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-2"
              />
              <label className="form-check-label" htmlFor="product-cat-2">
                Xanh dương
              </label>
            </div>
          </>
          {/* Size */}
          <>
            <h5 className="mb-3 mt-4">Kích thước</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat"
              />
              <label className="form-check-label" htmlFor="product-cat">
                SM
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-1"
              />
              <label className="form-check-label" htmlFor="product-cat-1">
                M
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="product-cat-2"
              />
              <label className="form-check-label" htmlFor="product-cat-2">
                XL
              </label>
            </div>
          </>
        </div>
      </div>
    </aside>
  );
};

export default ExtraData;
