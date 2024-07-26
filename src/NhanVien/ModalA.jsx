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
    const [id, setid] = useState('')

    const [so_dien_thoai, setso_dien_thoai] = useState('')
    const [ten_day_du, setten_day_du] = useState('')
    const [tai_khoan, settai_khoan] = useState('')
    const [mat_khau, setmat_khau] = useState('')
    const [email, setemail] = useState('')
    const [ngay_sinh, setngay_sinh] = useState('')
    const [anh, setanh] = useState('')
    const [quyen, setquyen] = useState('')
    const [ngay_tao, setngay_tao] = useState('')
    const [dia_chi, setdia_chi] = useState('')
    const [manv, setmanv] = useState('')

    const [trang_thai, settrang_thai] = useState('')

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

        // if (!anh || anh.trim() === "") {
        //     openNotification("error", "Lỗi", "Ảnh không  được để trống", "bottomRight");
        //     return;
        // }



        // if (!soluong) {
        //     openNotification("error", "Lỗi", "Số lượng không được để trống", "bottomRight");
        //     return;
        // } else if (isNaN(soluong) || soluong <= 0) {
        //     openNotification("error", "Lỗi", "Số lượng phải là một số dương lớn hơn 0!", "bottomRight");
        //     return;

        // }

        const khachHang = { id, so_dien_thoai, ten_day_du, tai_khoan, mat_khau, email, ngay_sinh, anh, quyen, ngay_tao, dia_chi, manv }

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
            <div
                style={{
                    marginLeft: "4px",
                    marginRight: "4px",
                }}
            >
                <Tooltip title="ADD" onClick={showModal}>
                    <Button
                        type="primary"


                    >Thêm dữ liệu</Button>
                </Tooltip>
                <Modal
                    okButtonProps={{ style: { display: "none" } }}
                    cancelButtonProps={{ style: { display: "none" } }}
                    title="Thêm Nhân Viên Mới"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    centered
                >
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
                        {/* <Form.Item
                            label="Id"
                            name="Id"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                value={id}
                                onChange={(e) => setid(e.target.value)}

                            />
                        </Form.Item> */}

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
                </Modal>
            </div>
        </>
    );
}

export default ModalA;
