// import "./style.css";
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Form,
    Input,
    DatePicker,

    Modal,
    Select,
    Tooltip,
    notification,
} from "antd";

import React, { useState } from "react";
const { Option } = Select;
function ModalA({ onActionSuccess }) {
    const [id, setid] = useState('')

    const [so_dien_thoai, setso_dien_thoai] = useState('')
    const [ten_day_du, setten_day_du] = useState('')
    const [tai_khoan, settai_khoan] = useState('')
    const [mat_khau, setmat_khau] = useState('')
    const [email, setemail] = useState('')
    const [ngay_sinh, setngay_sinh] = useState('')
    const [anh, setanh] = useState('')
    const [gioi_tinh, setgioi_tinh] = useState('')
    const [dia_chi, setdia_chi] = useState('')
    const [trang_thai, settrang_thai] = useState('')

    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault()
        // Kiểm tra từng trường và hiển thị thông báo lỗi
        if (!ten_day_du || ten_day_du.trim() === "") {
            openNotification("error", "Lỗi", "Tên đầy đủ không được để trống", "bottomRight");
            return;
        }
        if (!so_dien_thoai || so_dien_thoai.trim() === "") {
            openNotification("error", "Lỗi", "Số điện thoại  được để trống", "bottomRight");
            return;
        }

        if (!email || email.trim() === "") {
            openNotification("error", "Lỗi", "Email không  được để trống", "bottomRight");
            return;
        }
        if (!dia_chi || dia_chi.trim() === "") {
            openNotification("error", "Lỗi", "Địa Chỉ không  được để trống", "bottomRight");
            return;
        }





        const khachHang = { id, so_dien_thoai, ten_day_du, tai_khoan, mat_khau, email, ngay_sinh, anh, gioi_tinh, dia_chi }

        fetch("http://localhost:8080/kh/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(khachHang)
        }).then(() => {
            if (typeof onActionSuccess === 'function') {
                onActionSuccess();
            }

            openNotification("success", "Hệ thống", "Thêm Thành công", "bottomRight");

            setIsModalOpen(false);
            navigate('/KhachHang');
            // onActionSuccess();
            // console.log("New sanPhamAdded")



        })
            .catch((error) => {
                console.error("Error adding sanPham:", error);
            });

    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {

        setIsModalOpen(false);
    };
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

    return (
        <>
            {contextHolder}
            <div><h3 >Thêm Khách Hàng </h3></div>
            <Form
                name="wrap"
                labelCol={{ flex: "100px" }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: "50%", backgroundColor: '#FFFFFF', padding: '16px', color: '#fff' }} >



                <Form.Item
                    label="Số Điện Thoại"
                    name="Số Điện Thoại"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        value={so_dien_thoai}
                        onChange={(e) => setso_dien_thoai(e.target.value)}

                    />
                </Form.Item>


                <Form.Item
                    label="Tên Đầy Đủ"
                    name="Tên Đầy Đủ"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        value={ten_day_du}
                        onChange={(e) => setten_day_du(e.target.value)}

                    />
                </Form.Item>



                <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        value={email}
                        onChange={(e) => setemail(e.target.value)}

                    />
                </Form.Item>
                <Form.Item
                    label="Ngày sinh"
                    name="Ngày sinh"
                    rules={[
                        { required: true, message: 'Vui lòng chọn ngày' },

                    ]}
                >
                    <DatePicker
                        format="YYYY-MM-DD"
                        value={ngay_sinh ? ngay_sinh : null}
                        onChange={(date) => setngay_sinh(date)}
                    />
                </Form.Item>



                <Form.Item
                    label="Giới Tính"
                    name="Giới Tính"
                    rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                >
                    <Select value={gioi_tinh} onChange={(value) => setgioi_tinh(value)}>
                        <Option value="Nam">Nam</Option>
                        <Option value="Nữ">Nữ</Option>
                    </Select>
                </Form.Item>



                <Form.Item
                    label="Địa Chỉ"
                    name="Địa Chỉ"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        value={dia_chi}
                        onChange={(e) => setdia_chi(e.target.value)}

                    />
                </Form.Item>







                <Form.Item label=" ">
                    <Button
                        type="primary"
                        htmlType="submit"

                        onClick={handleClick}
                    >
                        Thêm
                    </Button>
                </Form.Item>



            </Form>


            <div
                style={{
                    marginLeft: "4px",
                    marginRight: "4px",
                }}
            >



            </div>
        </>
    );
}

export default ModalA;
