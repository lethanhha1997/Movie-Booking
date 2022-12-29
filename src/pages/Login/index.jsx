import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { dangNhapAction } from "../../redux/action/qLNDAction/qLNDAction";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { history } from "../../App";
import "./index.css";
import { hidenLoadingAction } from "../../redux/action/loadingAction/loading";

export default function Login() {
    const dispatch = useDispatch();
    // dispatch(hidenLoadingAction)
    window.onload = () => { dispatch(hidenLoadingAction); };
    const [typePassword, settypePassword] = useState("password");
    const handleToggleHidePassword = () => {
        if (typePassword === "password") {
            settypePassword("text");
        } else {
            settypePassword("password");
        }
    };

    return (
        <div className="form-login-user" >
            <Container>
                <Row className="row-form">
                    <Col sm></Col>
                    <Col sm className="col-form" data-aos="zoom-in">
                        <Formik
                            initialValues={{
                                taiKhoan: "",
                                matKhau: "",
                            }}
                            validationSchema={Yup.object().shape({
                                taiKhoan: Yup.string().required(
                                    "*Tài khoản không được để trống !"
                                ),
                                matKhau: Yup.string().required(
                                    "*Mật khẩu không được để trống !"
                                ),
                            })}
                            onSubmit={(values) => {
                                const action = dangNhapAction(values);
                                dispatch(action);
                            }}
                        >
                            {(formikProps) => (
                                <Form onSubmit={formikProps.handleSubmit} className="formInput mx-3">
                                    <h2 className="text-black text-center">Đăng Nhập</h2>
                                    <div className="mb-3 col-12">
                                        <label
                                            htmlFor="taiKhoan"
                                            className="form-label text-black fw-bold"
                                        >
                                            Tài khoản
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="taiKhoan"
                                            name="taiKhoan"
                                        />
                                        <div className='text-danger'>
                                            {formikProps.errors.taiKhoan ||
                                                formikProps.touched.taiKhoan ? (
                                                <ErrorMessage name="taiKhoan" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-3 col-12">
                                        <label
                                            htmlFor="matKhau"
                                            className="form-label text-black fw-bold"
                                        >
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
                                            {formikProps.errors.matKhau ||
                                                formikProps.touched.matKhau ? (
                                                <ErrorMessage name="matKhau" />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-3 text-center col-12">
                                        <button
                                            type="submit"
                                            className="btn btnSignIn text-white fw-bold "
                                        >
                                            Đăng nhập
                                        </button>
                                    </div>
                                    <h6 className="text-black">
                                        Bạn Chưa Có Tài Khoản?
                                        <button
                                            onClick={() => { history.push('/register'); }}
                                            className="btn-dangky mx-2" type="button">
                                            Đăng Ký
                                        </button>
                                    </h6>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                    <Col sm></Col>
                </Row>
                <ToastContainer />
            </Container>
        </div>
    );
}
