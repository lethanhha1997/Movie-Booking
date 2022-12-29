import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Modal, Tooltip } from 'antd';
import { Select } from 'antd';
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { layDsPhimAdmin, xoaPhimAdmin } from "../../../redux/action/movieAction/QuanLyPhimAction";
import { AiFillEdit, AiFillDelete, AiFillCalendar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import "./index.css";



export default function AdminMovie(props) {
  // let [dataPhim , setDataPhim] = useState([]) ; 
  let [GROUP_ID, setGI] = useState('GP01');
  let [maPhimXoa, setMaPhimXoa] = useState(0);
  let { mangPhim } = useSelector(state => state.quanLyPhimReducer);
  for (let i = 0; i < mangPhim.length; i++) {
    mangPhim[i] = { ...mangPhim[i], key: i.toString() };
  }
  console.log('mangPhim', mangPhim);

  let dispatch = useDispatch();
  const handleChangeSelect = (value) => {
    // console.log(`selected ${value}`);
    setGI(value);
  };

  useEffect(() => {
    let action = layDsPhimAdmin(GROUP_ID);
    dispatch(action);
  }, [GROUP_ID,dispatch]);

  useEffect(() => {
    let action = layDsPhimAdmin(GROUP_ID);
    console.log(GROUP_ID);
    // console.log('action' , action) ; 
    dispatch(action);
  }, [GROUP_ID,dispatch]);

  const columns = [
    {
      title: 'Mã phim',
      dataIndex: 'maPhim'
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      render: (url) => {
        return <img width={100} src={url} alt='Hinh Anh' />;
      }
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      render: (text) => {
        return text.length > 30 ? text.substr(0, 30) + '...' : text;
      }
    },
    {
      title: 'Ngày khởi chiếu',
      dataIndex: 'ngayKhoiChieu',
      render: (date) => {
        return <Tag style={{
          fontSize: '16px'
        }} >{moment(date).format("Do MMM YY")}</Tag>;
      }
    },
    {
      title: 'Action',
      dataIndex: 'maPhim',
      render: (_, values) => {
        let { maPhim } = values;
        return (
          <>
            <Space>
              <Tooltip title="Chi tiết phim">
                <Button onClick={() => {
                  props.history.push(`/admin/detail-movie/${maPhim}`);
                }} type="primary"><AiFillEdit /></Button>
              </Tooltip>

              <Tooltip title="Xóa phim">
                <Button onClick={() => {
                  console.log(maPhim);
                  setMaPhimXoa(maPhim);
                  showModalConfirmDelete();
                  // let action = xoaPhimAdmin(maPhim , GROUP_ID) ; 
                  // dispatch(action) ; 
                }} type="danger" ><AiFillDelete /></Button>
              </Tooltip>


              <Tooltip title="Tạo lịch chiếu">
                <Button onClick={() => {
                  history.push(`/admin/tao-lich-chieu/${maPhim}`);
                }} type="default"><AiFillCalendar /></Button>
              </Tooltip>


              {/* modal confirm delete  */}
              <Modal
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Return
                  </Button>,
                  <Button key="back2" type="primary" onClick={() => {
                    console.log('maPhim', maPhimXoa);
                    let action = xoaPhimAdmin(maPhimXoa, GROUP_ID, handleCancel);
                    dispatch(action);

                  }}>
                    Xác nhận
                  </Button>,
                ]}
              >
                <p>Bạn có chắc muốn xóa phim</p>
              </Modal>
            </Space>
          </>
        );
      }
    }

  ];


  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModalConfirmDelete = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
  };
  const handleCancel = () => {
    setOpen(false);
  };


  return (
    <>
      <h3 className="text-primary">Quản lý phim</h3>
      <Button type="ghost">
        <NavLink to='/admin/themphim'>Thêm phim mới</NavLink>
      </Button>
      <p>Chọn mã nhóm</p>
      <Select
        defaultValue="GP01"
        style={{
          width: 120,
        }}
        onChange={handleChangeSelect}
        options={[
          {
            value: 'GP01',
            label: 'GP01',
          },
          {
            value: 'GP02',
            label: 'GP02',
          },
          {
            value: 'GP03',
            label: 'GP03',
          },
          {
            value: 'GP04',
            label: 'GP04',
          },
          {
            value: 'GP05',
            label: 'GP05',
          },
          {
            value: 'GP06',
            label: 'GP06',
          },
          {
            value: 'GP07',
            label: 'GP07',
          },
          {
            value: 'GP08',
            label: 'GP08',
          },
          {
            value: 'GP09',
            label: 'GP09',
          },
          {
            value: 'GP10',
            label: 'GP10',
          },
          {
            value: 'GP11',
            label: 'GP11',
          },
          {
            value: 'GP12',
            label: 'GP12',
          },
          {
            value: 'GP13',
            label: 'GP13',
          },
          {
            value: 'GP14',
            label: 'GP14',
          },
          {
            value: 'GP15',
            label: 'GP15',
          },

        ]}
      />
      <Table columns={columns} dataSource={mangPhim} />
    </>
  );
}
