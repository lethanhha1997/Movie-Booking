import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { GP_ID, USER_LOGIN } from '../../util/setting';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import './index.css';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { capNhatAction, layThongTinNguoiDungAction } from '../../redux/action/qLNDAction/qLNDAction';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';

export default function UserProfile() {
    const moment = require("moment");
    const dispatch = useDispatch();
    useEffect(() => {
        const action = layThongTinNguoiDungAction();
        dispatch(action);
    }, []);
    const { thongTinNguoiDung } = useSelector(state => state.quanLyNguoiDungReducer);
    const [typePassword, settypePassword] = useState("password");
    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login' />;
    }
    const renderTTVe = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe);
            return <tr key={index}>
                <td>{index}</td>
                <td className='fw-bold'>{ticket.tenPhim}</td>
                <td className='fw-bold'>{moment(ticket.ngayDat).format('DD/ MM/ YYYY - k:mm:ss')}</td>
                <td className='fw-bold'>{seats.tenHeThongRap}-{seats.tenCumRap}</td>
                <td className='fw-bold'>{ticket.maVe}</td>
                <td className='fw-bold'>{ticket.danhSachGhe.map((soGhe, index) => {
                    return <span key={index}>{soGhe.tenGhe} </span>;
                })}</td>
                <td className='fw-bold'>{((ticket.danhSachGhe).length * ticket.giaVe).toLocaleString()} vnđ</td>
            </tr>;
        });
    };
    const _ = require('lodash');
    const handleToggleHidePassword = () => {
        if (typePassword === "password") {
            settypePassword("text");
        } else {
            settypePassword("password");
        }
    };
    const phoneReg = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    return (
        <div className='profile'>
            <Container className='py-5 profile'>
                <Row>
                    <Col xs={12} md={3}>
                        <div className='img-profile'>
                            <img src="https://i.pravatar.cc/?u=1999" alt="" />
                        </div>
                        <h4 className='text-center mt-4 text-white'>{thongTinNguoiDung.hoTen}</h4>
                    </Col>
                    <Col xs={12} md={9} className="mt-5">
                        <Tabs
                            defaultActiveKey="home"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="home" title="Tài Khoản" style={{ color: 'white', fontWeight: 'bold' }}>
                                <Container>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <h4 className='text-white'>Mã QR Vào Rạp</h4>
                                            <div className='img-profile__QR'>
                                                <img src="https://images.viblo.asia/f96109f8-e2b2-4944-88ef-071ce79a50a8.png" alt="" />
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Formik
                                                enableReinitialize
                                                initialValues={{
                                                    taiKhoan: thongTinNguoiDung.taiKhoan ?? "",
                                                    matKhau: thongTinNguoiDung.matKhau ?? "",
                                                    email: thongTinNguoiDung.email ?? "",
                                                    soDt: thongTinNguoiDung.soDT ?? "",
                                                    maNhom: GP_ID,
                                                    maLoaiNguoiDung: "KhachHang",
                                                    hoTen: thongTinNguoiDung.hoTen ?? "",
                                                }}
                                                validationSchema={Yup.object().shape({
                                                    taiKhoan: Yup.string().required('*Tài khoản không được để trống !'),
                                                    matKhau: Yup.string().required('*Mật khẩu không được để trống !').max(10, 'Tối Đa 10 Ký Tự'),
                                                    email: Yup.string().required('*Email không được để trống !').email('*Email không hợp lệ !'),
                                                    soDt: Yup.string().required('*Số điện thoại không được để trống !').matches(phoneReg, "Số ĐT Không Hợp Lệ"),
                                                    hoTen: Yup.string().required('*Tên không được để trống !').matches(/^[A-Z a-z]+$/, 'Tên Không Được Chứa Ký Tự Đặt Biệt '),
                                                })}
                                                onSubmit={(values) => {
                                                    console.log(values);
                                                    const action = capNhatAction(values);
                                                    dispatch(action);
                                                }}
                                            >
                                                {(formikProps) => {
                                                    return <Form className="row container mx-auto mt-4" onSubmit={formikProps.handleSubmit} >
                                                        <div id="username-field" className="mb-2 col-12 ">
                                                            <label htmlFor="taiKhoan" className="form-label fw-bold">
                                                                Tài khoản
                                                            </label>
                                                            <Field
                                                                disabled
                                                                type="text"
                                                                className="form-control"
                                                                id="taiKhoan"
                                                                name="taiKhoan"
                                                            />
                                                            <div className='text-danger'>
                                                                {formikProps.errors.taiKhoan || formikProps.touched.taiKhoan ? <ErrorMessage name="taiKhoan" /> : ''}
                                                            </div>
                                                        </div>
                                                        <div id="password-field" className="mb-2 col-12 ">
                                                            <label htmlFor="matKhau" className="form-label fw-bold">
                                                                Mật khẩu
                                                            </label>
                                                            <Field
                                                                type={typePassword}
                                                                className="form-control"
                                                                id="matKhau"
                                                                name="matKhau"
                                                            />
                                                            <div
                                                                onClick={handleToggleHidePassword}
                                                            >   Hiện Mật Khẩu
                                                                {typePassword !== "password" ? (
                                                                    <BsFillEyeSlashFill className='mx-2' style={{ cursor: 'pointer' }} />
                                                                ) : (
                                                                    <BsFillEyeFill className='mx-2 ' style={{ cursor: 'pointer' }} />
                                                                )}
                                                            </div>
                                                            {formikProps.errors.matKhau || formikProps.touched.matKhau ? <ErrorMessage name="matKhau" /> : ''}
                                                        </div>
                                                        <div id="name-field" className="mb-2 col-12 ">
                                                            <label htmlFor="hoTen" className="form-label fw-bold">
                                                                Họ tên
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                id="hoTen"
                                                                name="hoTen"
                                                            />
                                                            <div className='text-danger'>
                                                                {formikProps.errors.hoTen || formikProps.touched.hoTen ? <ErrorMessage name="hoTen" /> : ''}
                                                            </div>
                                                        </div>
                                                        <div id="email-field" className="mb-2 col-12 ">
                                                            <label htmlFor="email" className="form-label fw-bold ">
                                                                Email
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                id="email"
                                                                name="email"
                                                            />
                                                            <div className='text-danger'>
                                                                {formikProps.errors.email || formikProps.touched.email ? <ErrorMessage name="email" /> : ''}
                                                            </div>
                                                        </div>
                                                        <div id="phone-field" className="mb-3 col-12 ">
                                                            <label htmlFor="soDt" className="form-label fw-bold ">
                                                                Số điện thoại
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                id="soDt"
                                                                name="soDt"
                                                            />
                                                            <div className='text-danger'>
                                                                {formikProps.errors.soDt || formikProps.touched.soDt ? <ErrorMessage name="soDt" /> : ''}
                                                            </div>
                                                        </div>
                                                        <div className="text-center col-12 ">
                                                            <button type="submit" className="btn-booking fw-bold text-center">
                                                                Cập Nhật
                                                            </button>
                                                        </div>
                                                    </Form>;
                                                }}
                                            </Formik>
                                        </Col>
                                    </Row>
                                    <ToastContainer />
                                </Container>
                            </Tab>
                            <Tab eventKey="profile" title="Lịch Sử Đặt Vé">
                                <Table responsive="sm" bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th style={{ minWidth: '100px' }}>Tên Phim</th>
                                            <th style={{ minWidth: '150px' }}>Ngày Đặt</th>
                                            <th style={{ minWidth: '200px' }}>Tên Rạp</th>
                                            <th style={{ minWidth: '100px' }}>Mã Vé</th>
                                            <th style={{ minWidth: '150px' }}>Tên Ghế</th>
                                            <th style={{ minWidth: '100px' }}>Tổng Tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderTTVe()}
                                    </tbody>
                                </Table>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

