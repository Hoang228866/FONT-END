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
    const [sdt, setsdt] = useState('')
    const [tenDayDu, settenDayDu] = useState('')
    const [taiKhoan, settaiKhoan] = useState('')
    const [matKhau, setmatKhau] = useState('')
    const [email, setemail] = useState('')
    const [ngaySinh, setngaySinh] = useState('')
    // const [anh, setanh] = useState('')
    const [gt, setgt] = useState('')
    const [diaChi, setdiaChi] = useState('')
    const [quyen, setquyen] = useState('')
    const [anh, setanh] = useState('')
    const [maNhanVien, setmaNhanVien] = useState('')
    const [ngayTao, setngayTao] = useState('')

    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault()
        // Kiểm tra từng trường và hiển thị thông báo lỗi
        if (!tenDayDu || tenDayDu.trim() === "") {
            openNotification("error", "Lỗi", "Tên đầy đủ không được để trống", "bottomRight");
            return;
        }
        if (!sdt || sdt.trim() === "") {
            openNotification("error", "Lỗi", "Số điện thoại  được để trống", "bottomRight");
            return;
        }
        // if (!tai_khoan || tai_khoan.trim() === "") {
        //     openNotification("error", "Lỗi", "tài khoản không  được để trống", "bottomRight");
        //     return;
        // }
        // if (!mat_khau || mat_khau.trim() === "") {
        //     openNotification("error", "Lỗi", "mật khẩu được để trống", "bottomRight");
        //     return;
        // }
        if (!email || email.trim() === "") {
            openNotification("error", "Lỗi", "Email không  được để trống", "bottomRight");
            return;
        }



        const NhanVien = { sdt, tenDayDu, taiKhoan, matKhau, email, ngaySinh, anh, quyen, ngayTao, gt, diaChi }

        fetch("http://localhost:8080/nv/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(NhanVien)
        }).then(() => {
            if (typeof onActionSuccess === 'function') {
                onActionSuccess();
            }

            openNotification("success", "Hệ thống", "Thêm Thành công", "bottomRight");

            setIsModalOpen(false);
            // onActionSuccess();
            console.log("New sanPhamAdded")
            navigate('/NhanVien');

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
                        value={sdt}
                        onChange={(e) => setsdt(e.target.value)}

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
                        value={tenDayDu}
                        onChange={(e) => settenDayDu(e.target.value)}

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
                        value={ngaySinh ? ngaySinh : null}
                        onChange={(date) => setngaySinh(date)}
                    />
                </Form.Item>



                <Form.Item
                    label="Giới Tính"
                    name="Giới Tính"
                    rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                >
                    <Select value={gt} onChange={(value) => setgt(value)}>
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
                        value={diaChi}
                        onChange={(e) => setdiaChi(e.target.value)}

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


        </>
    );
}

export default ModalA;
