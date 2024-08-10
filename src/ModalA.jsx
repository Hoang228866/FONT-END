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

    const [soDienThoai, setsoDienThoai] = useState('')
    const [tenDayDu, settenDayDu] = useState('')
    const [taiKhoan, settaiKhoan] = useState('')
    const [matKhau, setmatKhau] = useState('')
    const [email, setemail] = useState('')
    const [ngaySinh, setngaySinh] = useState('')
    const [anh, setanh] = useState('')
    const [gioiTinh, setgioiTinh] = useState('')
    const [diaChi, setdiaChi] = useState('')
    const [trangThai, settrangThai] = useState('')

    const navigate = useNavigate();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const handleClick = (e) => {
        e.preventDefault()
        // Kiểm tra từng trường và hiển thị thông báo lỗi
        if (!tenDayDu || tenDayDu.trim() === "") {
            openNotification("error", "Lỗi", "Tên đầy đủ không được để trống", "bottomRight");
            return;
        }
        if (!soDienThoai || soDienThoai.trim() === "") {
            openNotification("error", "Lỗi", "Số điện thoại  được để trống", "bottomRight");
            return;
        }

        if (!email || email.trim() === "") {
            openNotification("error", "Lỗi", "Email không  được để trống", "bottomRight");
            return;
        }





        const khachHang = { id, soDienThoai, tenDayDu, email, ngaySinh, anh, gioiTinh, diaChi, provinces, districts }

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




    // Fetch provinces
    fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
        .then(response => response.json())
        .then(data => {
            if (data.error === 0) {
                setProvinces(data.data);
            }
        });


    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;
        setSelectedProvince(provinceId);

        // Fetch districts
        fetch(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`)
            .then(response => response.json())
            .then(data => {
                if (data.error === 0) {
                    setDistricts(data.data);
                    setWards([]); // Reset wards
                }
            });
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);

        // Fetch wards
        fetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`)
            .then(response => response.json())
            .then(data => {
                if (data.error === 0) {
                    setWards(data.data);
                }
            });
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
                        value={soDienThoai}
                        onChange={(e) => setsoDienThoai(e.target.value)}

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
                    <Select value={gioiTinh} onChange={(value) => setgioiTinh(value)}>
                        <Option value="Nam">Nam</Option>
                        <Option value="Nữ">Nữ</Option>
                    </Select>
                </Form.Item>



                <Form.Item
                    label="Địa Chỉ"
                    name="Dịa Chỉ"
                    rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                >




                    <select className="css_select" value={selectedProvince} onChange={handleProvinceChange} title="Chọn Tỉnh Thành">
                        <option value="0">Tỉnh Thành</option>
                        {provinces.map(province => (
                            <option key={province.id} value={province.id}>
                                {province.full_name}
                            </option>
                        ))}
                    </select>

                    <select className="css_select" value={selectedDistrict} onChange={handleDistrictChange} title="Chọn Quận Huyện">
                        <option value="0">Quận Huyện</option>
                        {districts.map(district => (
                            <option key={district.id} value={district.id}>
                                {district.full_name}
                            </option>
                        ))}
                    </select>

                    <select className="css_select" title="Chọn Phường Xã">
                        <option value="0">Phường Xã</option>
                        {wards.map(ward => (
                            <option key={ward.id} value={ward.id}>
                                {ward.full_name}
                            </option>
                        ))}
                    </select>



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
