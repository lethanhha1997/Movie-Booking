import React from 'react' ;
import './index.css' ;
import { Button, Col, Form, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { GP_ID } from '../../../util/setting';
import { qLNDService } from '../../../service';
import * as Yup from 'yup' ; 
import { adminDangNhapAction } from '../../../redux/action/qLNDAction/qLNDAction';
import { history } from '../../../App';
export default function UpdateAccAdmin() {
    let {adminLogin} = useSelector(state => state.quanLyNguoiDungReducer) ;
    const dispatch = useDispatch() ;  
   
    let {email , hoTen , maLoaiNguoiDung , soDT , taiKhoan } = adminLogin ; 
    const formik = useFormik({
        initialValues: {
            email : email , 
            hoTen: hoTen,
            maLoaiNguoiDung: maLoaiNguoiDung,
            soDT : soDT,
            taiKhoan : taiKhoan,
            matKhau :''
        },
        validationSchema: Yup.object({
            email : Yup.string().required('**Email không được để trống !') , 
            hoTen: Yup.string().required('**Tên không được để trống !'),
            maLoaiNguoiDung: Yup.string().required('Required'),
            soDT : Yup.string().required('**Vui lòng nhập số điện thoại !'),
            taiKhoan : Yup.string().required('**Tài khoản không được để trống !'),
            matKhau :Yup.string().required('Mật khẩu không được để trống !')
          }),
        onSubmit: values => {
            values = {...values , maNhom : GP_ID }
            console.log('values' , values) ;
            
            let promise = qLNDService.adminCapNhatThongTinND(values) ;
            promise.then(res => {
                history.push('/admin/login') ; 
            }).catch(err => {
                console.log(err.response.data.content) ; 
            }) ; 
        },
      });

      
  return (
    
    <Row style={{height : '600px'}} className='container'>
         <Col span={16}>
         <Form style={{marginTop : '120px'}}  labelCol={{span: 4,}}
               initialValues={{
                email: email , 
                hoTen: hoTen,
                maLoaiNguoiDung: maLoaiNguoiDung,
                soDT : soDT,
                taiKhoan : taiKhoan,
                matKhau :''
               }}
               onSubmitCapture = {formik.handleSubmit}
        
      autoComplete="off"
    >
        {/* taiKhoan  */}
      <Form.Item label="Tài khoản" name="taiKhoan">
        <Input 
        disabled 
         onChange={formik.handleChange}
         onBlur = {formik.handleBlur}
         value={formik.values.taiKhoan}
         name='taiKhoan' />
         {formik.touched.taiKhoan || formik.errors.taiKhoan ? (
         <p className='text-warning'>{formik.errors.taiKhoan}</p>
       ) : null}
      </Form.Item>
      
      
        {/* email */}
        <Form.Item label="Email" name="email">
        <Input 
         onBlur = {formik.handleBlur}
        onChange={formik.handleChange}  
        value={formik.values.email}
        name='email' />
        </Form.Item>
        {/* maLoaiNguoiDung  */}
        <Form.Item label="Mã người dùng" name="maLoaiNguoiDung">
        <Input style={{color : 'black'}} disabled onChange={formik.handleChange} value={formik.values.maLoaiNguoiDung} name='maLoaiNguoiDung' />
        </Form.Item>
       {/* hoTen  */}
       <Form.Item label="Họ tên" name="hoTen">
        <Input 
        onBlur = {formik.handleBlur}
        onChange={formik.handleChange} 
        value={formik.values.hoTen} 
        name='hoTen' />
        {formik.touched.hoTen || formik.errors.hoTen ? (
         <p className='text-warning'>{formik.errors.hoTen}</p>
       ) : null}
        </Form.Item>
        {/* soDT  */}
        <Form.Item label="Số điện thoại" name="soDT">
        <Input 
         onBlur = {formik.handleBlur}
        onChange={formik.handleChange} 
        value={formik.values.soDT}
        name='soDT' />
        {formik.touched.soDT || formik.errors.soDT ? (
         <p className='text-warning'>{formik.errors.soDT}</p>
       ) : null}
        </Form.Item>
        {/* matKhau  */}
        <Form.Item label="Mật khẩu" name="matKhau"> 
        <Input type='password' placeholder='Vui lòng nhập lại mật khẩu hoặc mật khẩu mới !' 
        onBlur = {formik.handleBlur}
        onChange={formik.handleChange} name='matKhau' />
        {formik.touched.matKhau || formik.errors.matKhau ? (
         <p className='text-warning'>{formik.errors.matKhau}</p>
       ) : null}
        </Form.Item>
      {/* btn submit  */}
      <Form.Item className='text-center'>
        <Button type="primary" htmlType="submit">
          Cập nhật thông tin
        </Button>
      </Form.Item>
     
      
        </Form>
         </Col>
      <Col span={8}>
        <img style={{
            marginLeft : '20px' ,
            backgroundPosition : 'left',
            backgroundSize : 'cover',
            height : '100%',
            width : '100%'
        }} src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000" alt="" />
      </Col>
    </Row>
  )
}
