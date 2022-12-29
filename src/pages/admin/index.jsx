// import React, { useState }  from 'react'
// import { NavLink } from 'react-router-dom';
// import './index.css'
// import { BiMoviePlay , BiUser ,  } from "react-icons/bi";
// import { CiCalendarDate } from "react-icons/ci";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
// } from '@ant-design/icons';
// import { FiLogOut } from "react-icons/fi";
// import { Layout, Menu } from 'antd';
// const { Header, Sider, Content } = Layout;
// export default function AdminPage() {
//   const [collapsed, setCollapsed] = useState(false);
//     return (
//       <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="logo d-flex justify-content-center">
          
//           <NavLink style={{
//             color:'white',
//             fontSize :'18px'
//           }} to = '#'>
//             <span className='mr-3'>Logout</span>
//             <FiLogOut/>
//           </NavLink>
//         </div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={['1']}
//           items={[
//             {
//               key: '1',
//               icon: <BiMoviePlay/>,
//               label: 'Quản lý phim',
//             },
//             {
//               key: '2',
//               icon: <BiUser />,
//               label: 'Quản lý người dùng',
//             },
//             {
//               key: '3',
//               icon: <CiCalendarDate />,
//               label: 'Quản lý lịch chiếu',
//             },
//           ]}
//         />
//       </Sider>
//       <Layout className="site-layout">
//         <Header
//           className="site-layout-background"
//           style={{
//             padding: 0,
//           }}
//         >
//           {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//             className: 'trigger',
//             onClick: () => setCollapsed(!collapsed),
//           })}
//         </Header>
//         <Content
//           className="site-layout-background"
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 280,
//           }}
//         >
//           Content
//         </Content>
//       </Layout>
//     </Layout>

//     );
  
// }
