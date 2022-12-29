import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer } from 'react-toastify';
import { dangKyAction } from '../../redux/action/qLNDAction/qLNDAction';
import { useDispatch } from 'react-redux';
import { history } from '../../App';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { hidenLoadingAction } from '../../redux/action/loadingAction/loading';
import { GP_ID } from '../../util/setting';
import './index.css';

export default function RegisterPage() {
    let dispatch = useDispatch();
    window.onload = () => { dispatch(hidenLoadingAction); };
    const [typePassword, settypePassword] = useState("password");
    const handleToggleHidePassword = () => {
        if (typePassword === "password") {
            settypePassword("text");
        } else {
            settypePassword("password");
        }
    };

    const phoneReg = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    return (
        <div className='register-page d-flex align-item' >
            <Container>
                <Row className="row-form__register">
                    <Col sm></Col>
                    <Col sm className="col-form" data-aos="zoom-in">
                        <Formik
                            initialValues={{
                                taiKhoan: "",
                                matKhau: "",
                                email: "",
                                soDt: "",
                                maNhom: GP_ID,
                                maLoaiNguoiDung: "KhachHang",
                                hoTen: ""
                            }}
                            validationSchema={Yup.object().shape({
                                taiKhoan: Yup.string().required('*Tài khoản không được để trống !'),
                                matKhau: Yup.string().required('*Mật khẩu không được để trống !').max(6, 'Từ 6 đến 20 ký Tự'),
                                email: Yup.string().required('*Email không được để trống !').email('*Email không hợp lệ !'),
                                soDt: Yup.string().required('*Số điện thoại không được để trống !').matches(phoneReg, "Số ĐT Không Hợp Lệ"),
                                hoTen: Yup.string().required('*Tên không được để trống !').matches(/^[A-Z a-z]+$/, 'Chưa Đúng định dạng')
                            })}
                            onSubmit={values => {
                                console.log(values);
                                const action = dangKyAction(values);
                                dispatch(action);
                            }}
                        >
                            {(formikProps) => {
                                return <Form className="row container mx-auto mt-4" onSubmit={formikProps.handleSubmit} >
                                    <h2 className="text-black text-center">Đăng Ký</h2>
                                    <div id="username-field" className="mb-3 col-12 ">
                                        <label htmlFor="taiKhoan" className="form-label fw-bold">
                                            Tài khoản
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="taiKhoan"
                                            name="taiKhoan"
                                        />
                                        <div className='text-danger'>
                                            {formikProps.errors.taiKhoan || formikProps.touched.taiKhoan ? <ErrorMessage name="taiKhoan" /> : ''}
                                        </div>
                                    </div>
                                    <div id="password-field" className="mb-3 col-12 ">
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
                                        <div className='text-danger'>
                                            {formikProps.errors.matKhau || formikProps.touched.matKhau ? <ErrorMessage name="matKhau" /> : ''}
                                        </div>
                                    </div>
                                    <div id="email-field" className="mb-3 col-12 ">
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
                                    <div id="name-field" className="mb-3 col-12 ">
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
                                    <div className="text-center col-12 ">
                                        <button type="submit" className="btn btnSignIn text-white fw-bold text-center">
                                            Đăng kí
                                        </button>
                                    </div>
                                    <h6 className="text-black">
                                        Bạn Đã Có Tài Khoản?
                                        <button
                                            onClick={() => { history.push('/login'); }}
                                            className="btn-dangky mx-2 mt-3" type="button">
                                            Đăng Nhập
                                        </button>
                                    </h6>
                                </Form>;
                            }}
                        </Formik>
                    </Col>
                    <Col sm></Col>
                </Row>
                <ToastContainer />
            </Container>
        </div>
    );
}
