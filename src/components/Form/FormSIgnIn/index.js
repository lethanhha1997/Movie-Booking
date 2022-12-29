import React from "react";
import "./index.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from 'yup' ; 
export default function FormSignIn(props) {
    console.log("props" , props) ; 
  return (
    <Formik
    initialValues={{
        taiKhoan: "",
        matKhau: ""
      }}
      validationSchema={Yup.object().shape({
        taiKhoan: Yup.string().required('*Tài khoản không được để trống !'),
        matKhau: Yup.string().required('*Mật khẩu không được để trống !')
    })}
      onSubmit={values => {
        // gia su dang nhap thanh cong => set isLogin về true => tắt popup
        console.log("values" , values) ; 
        // props.setLogin(true) ; 
        // props.setShowSignIn(false) ; 

      }}
      
    >
        {(formikProps) => (
        <Form  onSubmit={formikProps.handleSubmit} className="row w-50 mx-auto">
            {/* email  */}
          <div className="mb-3 col-12">
            <label htmlFor="taiKhoan" className="form-label text-white">
              Tài khoản
            </label>
            <Field
             type="text" className="form-control" id="taiKhoan" name = "taiKhoan" />
             {formikProps.errors.taiKhoan || formikProps.touched.taiKhoan ? <ErrorMessage name="taiKhoan" /> : ''}
          </div>
          {/* password  */}
          <div className="mb-3 col-12">
            <label htmlFor="matKhau" className="form-label text-white">
              Mật khẩu
            </label>
            <Field 
            type="password" className="form-control" id="matKhau" name = "matKhau" />
            {formikProps.errors.matKhau || formikProps.touched.matKhau ? <ErrorMessage name="matKhau" /> : ''}
          </div>
          <div className="mb-3 text-center col-12">
            <button type="submit" className="btn btnSignIn text-white fw-bold ">
              Đăng nhập
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
