// import "./style.css";
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
    const [sdt, setSDT] = useState('')
    const [tenDayDu, setTenDayDu] = useState('')
    const [email, setemail] = useState('')
    const [ngaySinh, setNgaySinh] = useState('')
    // const [anh, setanh] = useState('')
    const [gioiTinh, setGioiTinh] = useState('')

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



        const khachHang = { sdt, tenDayDu, email, ngaySinh }

        fetch("http://localhost:8080/nv/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(khachHang)
        }).then(() => {
            if (typeof onActionSuccess === 'function') {
                onActionSuccess();
            }

            openNotification("success", "Hệ thống", "Thêm Thành công", "bottomRight");

            setIsModalOpen(false);
            onActionSuccess();
            console.log("New sanPhamAdded")


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
                labelCol={{
                    flex: "110px",
                }}
                labelAlign="left"
                labelWrap
                wrapperCol={{
                    flex: 1,
                }}
                colon={false}
                style={{

                    maxWidth: 600,
                }}
            >

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
                        onChange={(e) => setSDT(e.target.value)}

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
                        onChange={(e) => setTenDayDu(e.target.value)}

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
                        onChange={(date) => setNgaySinh(date)}
                    />
                </Form.Item>

                <Form.Item
                    label="Giới Tính"
                    name="Giới Tính"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        value={gioiTinh}
                        onChange={(e) => setGioiTinh(e.target.value)}

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
