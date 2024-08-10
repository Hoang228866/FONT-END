import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import Product from './Product';

import MenuAdmin from './Menu';
import Nhanvien from './NhanVien/Nhanvien';

import ModalA from './ModalA';

import Modal1 from './NhanVien/ModalA';






const breadcrumbNameMap = {
  '/KhacHang': 'Khách Hàng',
  '/KhacHang/add': 'Thêm Khách Hàng',
  '/productsize': 'Kích thước sản phẩm',
  '/promotions': 'Khuyến mãi',
  '/vouchers': 'Phiếu giảm giá',
  '/NhanVien': 'Nhân viên',
  '/NhanVien/add': 'Thêm Nhân Viên',
  '/orders': 'Đơn hàng',

};
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>
        <Link to="">Trang Chủ</Link>
      </Breadcrumb.Item>
      {pathnames.map((_, index) => {
        const url = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Breadcrumb.Item key={url}>
            {breadcrumbNameMap[url] || pathnames[pathnames.length - 1]}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{breadcrumbNameMap[url] || pathnames[index]}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '246px', backgroundColor: '#f0f0f0' }}>
          <MenuAdmin />
        </div>
        <div style={{ flex: '1', padding: '20px' }}>
          <Breadcrumbs />
          <Routes>
            {/* <Route path="/" element={<MenuAdmin />} /> */}
            <Route path="/KhachHang" element={<Product />} />
            <Route path="/KhachHang/add" element={<ModalA />} />
            <Route path="/NhanVien" element={<Address />} />
            <Route path="/NhanVien/add" element={<Modal1 />} />
            {/* <Route path="/vouchers" element={<Voucher />} />
            <Route path="/stafs" element={<Staf />} />
            <Route path="/orders" element={<Order />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// const App = () => {
//   return (
//     <BrowserRouter>
//       <div style={{ display: 'flex' }}>
//         <div style={{ width: '246px', backgroundColor: '#f0f0f0' }}>
//           <MenuAdmin />

//         </div>
//         <div style={{ flex: '1', padding: '20px' }}>
//           <Routes>
//             <Route path="/KhachHang" element={<Product />} />
//             <Route path="/KhachHang" element={<Product />} />
//             <Route path="/NhanVien" element={< Nhanvien />} />
//           </Routes>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// };

export default App;
