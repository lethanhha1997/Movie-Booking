import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup' ; 
import { FaAtlassian, FaUserAlt, FaLock } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './index.css' ; 
import { qLNDService } from '../../../service';
import { history } from '../../../App';
import { ACCESS_TOKEN } from '../../../util/setting';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminDangNhapAction } from '../../../redux/action/qLNDAction/qLNDAction';
import { useDispatch } from 'react-redux';
import { hidenLoadingAction } from '../../../redux/action/loadingAction/loading';
export default function AdminLogin(props) {

    const dispatch = useDispatch() ;
    dispatch(hidenLoadingAction)
    const notify = () => toast.error('Yêu cầu tài khoản Admin !', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });;

    const formik = useFormik({
        initialValues: {
          taiKhoan : '' ,
          matKhau : ''
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string()
              .required('Tài khoản không được để trống !'),
              matKhau: Yup.string()
              .required('Mật khẩu không được để trống !')
          }),
        onSubmit: (values, { resetForm }) => {
        let action = adminDangNhapAction(values,resetForm);
        dispatch(action) ; 
        },
      });
  return (
    <div className="user-login">
      <div className="form-login">
        <form className="row"  onSubmit={formik.handleSubmit}>
          <div className="form-header col-12">
            <NavLink to="/home" className="form-logo">
              <FaAtlassian />
            </NavLink>
            <div className="form-title">LOGIN</div>
          </div>
          <div className="form-body col-12">
            <div className="username">
              <input 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taiKhoan}
              name="taiKhoan"
              id="username" 
              type="text" 
              placeholder="Tài Khoản" />
               {formik.touched.taiKhoan || formik.errors.taiKhoan ? (
                    <p className='text-white warning-form-input'>{formik.errors.taiKhoan}</p>
                    ) : <p></p> }
              <div className="form-logo-input form-logo-username">
                <FaUserAlt />
              </div>
              {/* <div>{errors.blur}</div> */}
            </div>
            <div className="password">
              <input 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.matKhau}
              name="matKhau"
              id="password" 
              type="password" 
              placeholder="Mật khẩu" />
              {formik.touched.matKhau || formik.errors.matKhau ? (
                    <p className='text-white warning-form-input'>{formik.errors.matKhau}</p>
                    ) : <p></p>}
              <div className="form-logo-input form-logo-username">
                <FaLock />
              </div>
            </div>
            
          </div>
          <div className="form-footer col-12">
            <div className="form-button">
              <button type="submit" className="btn-login-form-input">
                Login
              </button>
            </div>
        
          </div>
        </form>
      </div>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  )
    
}
