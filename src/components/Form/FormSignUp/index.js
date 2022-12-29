import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
import * as Yup from 'yup' ; 
import "./index.css";
export default function FormSignUp(props) {
  
  return (
    <Formik
    // gia tri khoi tao
    initialValues={{
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      hoTen: ""
    }}
    validationSchema={Yup.object().shape({
      taiKhoan: Yup.string().required('*Tài khoản không được để trống !'),
      matKhau: Yup.string().required('*Mật khẩu không được để trống !'),
      email: Yup.string().required('*Email không được để trống !').email('*Email không hợp lệ !'),
      soDt: Yup.string().required('*Số điện thoại không được để trống !') ,
      hoTen: Yup.string().required('*Số điện thoại không được để trống !') 
  })}
  onSubmit={values => {
    console.log(values) ; 
  }}
  >
    {(formikProps)=>{
      return <Form className="row container mx-auto mt-4" onSubmit={formikProps.handleSubmit} >
        
        {/* tai khoan  */}
      <div  id = "username-field" className="mb-3 col-12 col-lg-6">
        <label htmlFor="taiKhoan" className="form-label">
          Tài khoản
        </label>
        <Field
          type="text"
          className="form-control"
          id="taiKhoan"
          name="taiKhoan"
        />
        {formikProps.errors.taiKhoan || formikProps.touched.taiKhoan ? <ErrorMessage name="taiKhoan" /> : ''}
      </div>
      {/* mat khau  */}
      <div id = "password-field" className="mb-3 col-12 col-lg-6">
        <label htmlFor="matKhau" className="form-label">
          Mật khẩu
        </label>
        <Field
          type="password"
          className="form-control"
          id="matKhau"
          name="matKhau"
        />
        {formikProps.errors.matKhau || formikProps.touched.matKhau ? <ErrorMessage name="matKhau" /> : ''}
      </div>
      {/* email  */}
      <div id="email-field" className="mb-3 col-12 col-lg-6">
        <label htmlFor="email" className="form-label ">
          Email
        </label>
        <Field
          type="text"
          className="form-control"
          id="email"
          name="email"
        />
        {formikProps.errors.email || formikProps.touched.email ? <ErrorMessage name="email" /> : ''} 
      </div>
      {/* so dien thoai  */}
      <div id="phone-field" className="mb-3 col-12 col-lg-6">
        <label htmlFor="soDt" className="form-label ">
          Số điện thoại
        </label>
        <Field
          type="text"
          className="form-control"
          id="soDt"
          name="soDt"
        />
        {formikProps.errors.soDt || formikProps.touched.soDt ? <ErrorMessage name="soDt" /> : ''}
      </div>
      {/* ma nhom  */}
      <div id="manhom-field" className="mb-3 col-12 col-lg-6">
      <label htmlFor="soDt" className="form-label ">
          Mã nhóm
        </label>
        <Field component = 'select' className="form-select " name="maNhom" id="">
          <option value="GP01">GP01</option>
          <option value="GP02">GP02</option>
          <option value="GP03">GP03</option>
          <option value="GP04">GP04</option>
          <option value="GP05">GP05</option>
          <option value="GP06">GP06</option>
          <option value="GP07">GP07</option>
          <option value="GP08">GP08</option>
          <option value="GP09">GP09</option>
          <option value="GP10">GP10</option>
        </Field>
      </div>
      {/* ho ten  */}
      <div id="name-field" className="mb-3 col-12 col-lg-6">
        <label htmlFor="hoTen" className="form-label ">
          Họ tên
        </label>
        <Field
          type="text"
          className="form-control"
          id="hoTen"
          name="hoTen"
        />
        {formikProps.errors.hoTen || formikProps.touched.hoTen ? <ErrorMessage name="hoTen" /> : ''}
      </div>
      <div className="text-center col-12 ">
      <button type="submit" className="btn btn-outline-primary text-center">
        Đăng kí
      </button>
      </div>
    </Form>
    }}
  </Formik>
  );
}
