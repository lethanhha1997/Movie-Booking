import React, { useState } from "react";
import { Button, Input, Select, Space, Table, Tag , Modal  } from "antd";
import { AiFillDelete , AiOutlineEdit , AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { layDSNDAdmin, xoaNDAction } from "../../../redux/action/qLNDAction/qLNDAction";
import ModalAddUserAdmin from "../../../components/Modal/ModelAddUserAdmin";
export default function AdminUser(props) {
  let [groupID , setGI] = useState('GP01') ;


  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  }; 
  const handleCancel = () => {
    console.log('hanlde cancel') ; 
    setOpen(false);
  };
  


  let {dsndAdmin} = useSelector(state => state.quanLyNguoiDungReducer) ; 
  for (const index in dsndAdmin) {
    dsndAdmin[index] = {...dsndAdmin[index] , key : index.toString()}
  }
  // console.log('dsndAdmin' , dsndAdmin) ; 
  const dispatch = useDispatch() ; 
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "matKhau",
      render : (value) => {
        return  <>
        <Space direction="vertical">
       
        <Input.Password
        style={{border:'none'}}
        value={value}
            placeholder="input password"
            iconRender={(visible) => (visible ? <AiFillEye /> : <AiOutlineEyeInvisible />)}
   />
   </Space>
       </>
      }
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render : (value) => {
        if(value === 'KhachHang') return <span>Người dùng</span>
        else return <span>Quản trị viên</span>
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_,{taiKhoan}) => {
        return (
          <>
            <Button onClick={()=>{
              console.log(taiKhoan) ; 
              props.history.push(`/admin/update-user/${taiKhoan}`) ; 
            }} type="primary" style={{marginRight : '10px'}}>
              <AiOutlineEdit/>
            </Button>
            <Button onClick={()=>{
              let action = xoaNDAction(taiKhoan , groupID) ; 
              dispatch(action) ; 
            }} type="primary" danger>
              <AiFillDelete/>
            </Button>
          </>
        );
      },
    },
  ];
  const data = dsndAdmin  ;
  console.log(data) ; 
  const handleChangeSelect = (value) => {
    // console.log(value) ; 
    setGI(value) ; 
  }
  useEffect(()=> {
    let action = layDSNDAdmin(groupID) ; 
      dispatch(action) ; 
  } , [])
  useEffect(()=> {
    let action = layDSNDAdmin(groupID) ; 
      dispatch(action) ; 
  } , [groupID]) ; 
  // console.log('render') ; 
  return (
    <div>
      <h2 className="text-center text-primary">Quản lý người dùng</h2>
      <Button onClick={showModal} type="primary">Thêm tài khoản mới</Button>
      
      <div style={{height :'20px'}}></div>
      <Select
      defaultValue={groupID}
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
    <div style={{height :'20px'}}></div>
      <Table columns={columns} dataSource={data} />
      {/* modal add user  */}
      <ModalAddUserAdmin open = {open} handleCancel = {handleCancel} /> 
    </div>
  );
}


