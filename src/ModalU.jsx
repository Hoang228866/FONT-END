import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Modal, Space, notification } from 'antd';
import { FaRegPenToSquare } from "react-icons/fa6";
import { DatePicker } from 'antd';
import moment from 'moment';

import {
    Button,
    Form,
    Input,
    Modal,
    Tooltip,
    Select,
    notification,
    Space
} from "antd";
import axios from 'axios';
const { Option } = Select;
const ModalU = ({ recordId, onActionSuccess }) => {

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, title, des, placement) => {
        if (type === "error") {
            api.error({
                message: title,
                description: des,
                placement,
            });
        } else {
            api.success({
                message: title,
                description: des,
                placement,
            });
        }
    };
    const [open, setOpen] = useState(false);
    const showModal = () => {
        console.log(recordId);

        setOpen(true);
    };
    const handleOk = async () => {
        // Kiểm tra điều kiện validation
        const validationErrors = validateForm();

        if (validationErrors.length === 0) {
            // Gọi hàm cập nhật với dữ liệu từ state editsanPhamData và recordId
            await updatesanPham(recordId, editsanPhamData);
            onActionSuccess();
            setOpen(false);
        } else {
            // Hiển thị thông báo nếu validation không thành công
            validationErrors.forEach((error) => {
                openNotification("error", "Hệ thống", error, "bottomRight");
            });
        }
    };

    // Hàm kiểm tra validation và trả về mảng chứa các thông báo lỗi
    const validateForm = () => {
        const errors = [];


        if (!editsanPhamData.soDienThoai) {
            errors.push("Vui số điện thoai !");
        }
        if (!editsanPhamData.tenDayDu) {
            errors.push("Vui lòng nhập tên đầy đủ !");
        }
        // if (!editsanPhamData.tai_khoan) {
        //     errors.push("Vui lòng nhập tài khoản!");
        // }
        // if (!editsanPhamData.mat_khau) {
        //     errors.push("Vui lòng nhập mật khẩu!");
        // }
        if (!editsanPhamData.email) {
            errors.push("Vui lòng nhập email");
        }
        if (!editsanPhamData.ngaySinh) {
            errors.push("Vui lòng nhập ngày sinh !");
        }


        return errors;

    };
    const handleCancel = () => {
        setOpen(false);
    };
    const [editsanPhamData, setEditsanPhamData] = useState({
        tensanpham: '',
        soluong: '',

    });

    const updatesanPham = async (id, data) => {
        try {
            await axios.put(`http://localhost:8080/kh/update/${id}`, data);
            openNotification("success", "Hệ thống", "Sửa thành công", "bottomRight");

        } catch (error) {
            console.error("Error updating sanPham:", error);
        }
    };
    useEffect(() => {
        // Gọi handleClickEdit khi recordId thay đổi
        handleClickEdit(recordId);
    }, [recordId]);

    const handleClickEdit = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/view-update/${id}`);
            const data = response.data;
            console.log(data)
            console.log("Initial tensanPham value:", data.tensanpham);

            // Cập nhật state để hiển thị dữ liệu trên form
            setEditsanPhamData({
                soDienThoai: data.soDienThoai,
                tenDayDu: data.tenDayDu,
                taiKhoan: data.taiKhoan,
                matKhau: data.matKhau,
                email: data.email,
                ngaySinh: data.ngaySinh,
                anh: data.anh,

                gioiTinh: data.gioiTinh,
                diaChi: data.diaChi,


            });
        } catch (error) {
            console.error(`Error fetching sanPham with id ${id}:`, error);
        }
    };
    return (
        <>{contextHolder}
            <Space>

                <Button style={{
                    color: "green",
                }}
                    shape="circle"
                    icon={<FaRegPenToSquare />}
                    onClick={showModal}>

                </Button>

            </Space>
            <Modal

                open={open}
                title="Cập nhật khách hàng ~"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>

                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Số điện thoại :</span>
                    <Input
                        style={{ flex: '1' }}
                        size="medium"
                        placeholder="Số điện thoại "
                        value={editsanPhamData.soDienThoai}
                        onChange={(e) => {
                            setEditsanPhamData({ ...editsanPhamData, soDienThoai: e.target.value })
                        }
                        } />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Tên đầy đủ :</span>
                    <Input
                        style={{ flex: '1' }}
                        size="medium"
                        placeholder="Tên đầy đủ "
                        value={editsanPhamData.tenDayDu}
                        onChange={(e) => {
                            setEditsanPhamData({ ...editsanPhamData, tenDayDu: e.target.value })
                        }
                        } />
                </div>


                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Email:</span>
                    <Input
                        style={{ flex: '1' }}
                        size="medium"
                        placeholder="Email "
                        value={editsanPhamData.email}
                        onChange={(e) => {
                            setEditsanPhamData({ ...editsanPhamData, email: e.target.value })
                        }
                        } />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Ngày Sinh :</span>
                    <Input
                        style={{ flex: '1' }}
                        size="medium"
                        placeholder="Ngày Sinh "
                        value={editsanPhamData.ngaySinh}
                        onChange={(e) => {
                            setEditsanPhamData({ ...editsanPhamData, ngaySinh: e.target.value })
                        }
                        } />
                </div>
                {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Form.Item
                        label="Ngày Sinh"
                        name="Ngày Sinh"

                    >
                        <DatePicker
                            format="YYYY-MM-DD"
                            // disabledDate={disabledDate}
                            value={editsanPhamData.ngay_sinh ? moment(editsanPhamData.ngay_sinh) : null}
                            onChange={(value) => setEditsanPhamData({ ...editsanPhamData, ngay_sinh: value })}
                        //  disabledDate={(current) => current && current < moment().startOf('day')}
                        />

                    </Form.Item>
                </div>
 */}



                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Giới tính :</span>
                    <Select
                        style={{ flex: '1' }}
                        value={editsanPhamData.gioiTinh}
                        onChange={(value) => setEditsanPhamData({ ...editsanPhamData, gioiTinh: value })}
                    >
                        <Option value="Nam">Nam</Option>
                        <Option value="Nữ">Nữ</Option>
                    </Select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Địa Chỉ :</span>
                    <Input
                        style={{ flex: '1' }}
                        size="medium"
                        placeholder="Địa Chỉ "
                        value={editsanPhamData.diaChi}
                        onChange={(e) => {
                            setEditsanPhamData({ ...editsanPhamData, diaChi: e.target.value })
                        }
                        } />
                </div>




            </Modal>
        </>
    );
};
export default ModalU;