import React, { useEffect, useState, useRef } from 'react';
import { Input, Table, Button, message, Tag, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import axios from 'axios';
import ModalA from './ModalA';
import ModalD from './ModalD';
import ModalU from './ModalU';


const { Search } = Input;

export default function Staf() {
    const searchInput = useRef(null);
    const [stafs, setstafs] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [resetTable, setResetTable] = useState(false);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        message.info(`Đã lọc theo cột ${dataIndex} hãy nhấn "reset" để cập nhật lại dữ liệu`);
    };
    const getStatusProps = (status) => {
        switch (status) {
            case 'HOẠTĐỘNG':
                return { color: 'blue', text: 'Hoạt động' };
            case 'KHÔNGHOẠTĐỘNG':
                return { color: 'red', text: 'Không hoạt động' };
            default:
                return { color: 'gray', text: 'Chưa xác định' };
        }
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        setSearchedColumn('');
        setResetTable(true);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Search
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 1);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <span style={{ backgroundColor: '#ffc069' }}>{text}</span>
            ) : (
                text
            ),
    });


    const columns = [

        {
            title: 'STT ',
            dataIndex: 'Số thứ tự',
            key: 'stt',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'so_dien_thoai',
            key: 'so_dien_thoai',
            ...getColumnSearchProps('so_dien_thoai'),
        },


        {
            title: 'Tên Đầy Đủ',
            dataIndex: 'ten_day_du',
            key: 'ten_day_du',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },

        {
            title: 'Ngày Sinh',
            dataIndex: 'ngay_sinh',
            key: 'ngay_sinh',
        },

        // {
        //     title: 'Giới Tính',
        //     dataIndex: 'gt',
        //     key: 'gt',
        // },
        {

            title: 'Trạng thái',
            dataIndex: 'trang_thai',
            key: 'trang_thai',
            filters: [
                { text: 'Hoạt Động', value: 'HOẠTĐỘNG' },
                { text: 'Không Hoạt Động', value: 'KHÔNGHOẠTĐỘNG' },
            ],
            onFilter: (value, record) => record.trangthai === value,
            render: (text) => {
                const { color, text: statusText } = getStatusProps(text);
                return <Tag color={color}>{statusText}</Tag>;
            },
        },








        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) => <div>
                <ModalU recordId={record.id} onActionSuccess={reloadstafs} />
                <ModalD recordId={record.id} onActionSuccess={reloadstafs} />
            </div>

        },
    ];

    useEffect(() => {
        loadstafs();
    }, [resetTable]);

    const loadstafs = async () => {
        try {
            setLoading(true);
            const result = await axios.get('http://localhost:8080/nv/hien-thi');
            setstafs(result.data);
            setSearchResults(result.data);
        } catch (error) {
            console.error('Error loading stafs:', error);
        } finally {
            setLoading(false);
        }

        setResetTable(false);
    };
    const reloadstafs = async () => {
        try {
            setLoading(true);
            const result = await axios.get('http://localhost:8080/nv/hien-thi');
            setstafs(result.data);
            setSearchResults(result.data);
        } catch (error) {
            console.error('Error reloading stafs:', error);
        } finally {
            setLoading(false);
        }
    };




    return (
        <div>
            {/* <Header />
            <MenuAdmin /> */}
            <div className="body-container">
                <div className="button"
                    style={{
                        display: 'flex',
                        justifyContent: "flex-end",
                        margin: "10px",
                    }}>


                    <ModalA onActionSuccess={reloadstafs} />


                </div>
                <div>

                    <Table
                        columns={columns}
                        dataSource={searchResults}
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                        key={resetTable ? 'reset' : 'table'}
                        style={{ margin: '10px' }} />
                </div>
            </div>
        </div>
    );
}








