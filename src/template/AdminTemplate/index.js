import React, { useEffect, useState } from "react";
import { NavLink, Route } from "react-router-dom";
import "./index.css";
import { AiOutlineBars, AiOutlineMail, AiOutlineUnderline, AiOutlineCodepen, AiFillPhone, AiFillAccountBook } from "react-icons/ai";
import { BiMoviePlay, BiUser } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { Button, Col, Input, Layout, Menu, Row } from "antd";
import { ACCESS_TOKEN, ADMIN_ACC } from "../../util/setting";
import { history } from "../../App";
import { useSelector } from "react-redux";
import { Tooltip, Modal, Dropdown } from "antd";
import { GrUserAdmin } from "react-icons/gr";
const { Header, Sider, Content } = Layout;
const isAdminLogin = () => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    history.push("/admin/login");
  }
  if (localStorage.getItem(ADMIN_ACC)) {
    let { maLoaiNguoiDung } = JSON.parse(localStorage.getItem(ADMIN_ACC));
    console.log('maLoaiNguoiDung', maLoaiNguoiDung);
    if (maLoaiNguoiDung === 'KhachHang') history.push("/admin/login");
  } else history.push("/admin/login");
};
const items = [

  {
    key: '1',
    label: (
      <NavLink to='/admin/acc-update' >Cập nhật tài khoản</NavLink>
    ),
  }
];
export const AdminTemplate = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  isAdminLogin();
  const [adminAcc, setAdminAcc] = useState({});
  // console.log('adminAcc' , adminAcc) ;
  let { adminLogin } = useSelector((state) => state.quanLyNguoiDungReducer);
  // console.log("adminLogin", adminLogin);
  useEffect(() => {
    setAdminAcc(adminLogin);

  }, []);

  return (
    <Route
      path={props.path}
      render={(propsRoute) => (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>

            <div className="text-center my-3">
              <Tooltip title="Đăng xuất">
                <Button onClick={() => {
                  localStorage.removeItem(ACCESS_TOKEN);
                  localStorage.removeItem(ADMIN_ACC);
                  history.push('/admin/login');
                }} type="primary" className="w-100">
                  <NavLink to="#">
                    <FiLogOut />
                  </NavLink>
                </Button>
              </Tooltip>
            </div>

            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <BiMoviePlay />
                <span>Quản lý phim</span>
                <NavLink to="/admin/phim-admin" />
              </Menu.Item>
              <Menu.Item key="2">
                <BiUser />
                <span>Quản lý người dùng</span>
                <NavLink to="/admin/user-admin" />
              </Menu.Item>
              {/* <Menu.Item key="3">
                <CiCalendarDate />
                <span>Quản lý lịch chiếu</span>
                <NavLink to="/admin/showtime-admin" />
              </Menu.Item> */}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background d-flex justify-content-between align-items-center pr-5">
              <button
                style={{ height: "40px" }}
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
                className="btn btn-outline-secondary"
              >
                <AiOutlineBars />
              </button>


              {/* <button
                  onClick={() => setOpen(true)}
                  className="btn btn-outline-primary"
                >
                  <GrUserAdmin />
                </button> */}
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottom"
              >
                <Button onClick={() => setOpen(true)}
                  className="btn btn-outline-primary"
                >
                  <GrUserAdmin />
                </Button>
              </Dropdown>

              <Modal
                title="Thông tin tài khoản Admin"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={[
                  <Button key="back"
                    onClick={() => setOpen(false)}
                  >
                    Đóng
                  </Button>,
                ]}
              >
                <Row>
                  <Col span={12}>
                    <form style={{
                      marginTop: '100px'
                    }} action="">
                      <Input value={adminAcc.email} className='w-100' placeholder="email" prefix={<AiOutlineMail />} />
                      <br />
                      <br />
                      <Input value={adminAcc.hoTen} className='w-100' placeholder="hoTen" prefix={<AiOutlineUnderline />} />
                      <br />
                      <br />
                      <Input value={adminAcc.maLoaiNguoiDung} className='w-100' placeholder="maLoaiNguoiDung" prefix={<AiOutlineCodepen />} />
                      <br />
                      <br />
                      <Input value={adminAcc.soDT} className='w-100' placeholder="soDT" prefix={<AiFillPhone />} />
                      <br />
                      <br />
                      <Input value={adminAcc.taiKhoan} className='w-100' placeholder="taiKhoan" prefix={<AiFillAccountBook />} />
                    </form>
                  </Col>
                  <Col span={12}>
                    <img className="img-fluid" src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000" alt="loginimage" />
                  </Col>
                </Row>

              </Modal>

            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <props.component {...propsRoute} />
            </Content>
          </Layout>
        </Layout>
      )}
    />
  );
};
