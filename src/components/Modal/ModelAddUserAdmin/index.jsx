import { Button, Modal, Checkbox, Form, Input, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from 'yup' ; 
import React from "react";
import "./index.css";
import { themNDActionAdmin } from "../../../redux/action/qLNDAction/qLNDAction";
import { useDispatch } from "react-redux";
const phoneRegExp = /^[0-9]+$/ ; 
const letterRegExp = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/; 
export default function ModalAddUserAdmin(props) {
  let { open, handleCancel } = props;
  let dispatch = useDispatch() ; 
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    validationSchema: Yup.object({
        taiKhoan: Yup.string().trim().required('*Trường này không được để trống!'),
        matKhau: Yup.string().trim().required('*Trường này không được để trống!'),
        email: Yup.string().required('*Trường này không được để trống!').email('*Email không hợp lệ!'),
        soDt: Yup.string().required('*Trường này không được để trống!').matches(phoneRegExp, 'Phone number is not valid'),
        maLoaiNguoiDung: Yup.string().required('*Trường này không được để trống!'),
        hoTen: Yup.string().trim().required('*Trường này không được để trống!').matches(letterRegExp , 'Tên người dùng không hợp lệ!' ),
      }),
    onSubmit: (values) => {
      console.log(values) ; 
      let action = themNDActionAdmin(values , handleCancel) ; 
      dispatch(action) ; 
    },
  });
//   console.log(formik.values) ; 
    const handleChangeSelect = (name) => {
        return value => {
            formik.setFieldValue(name , value) ; 
        }
    }
  return (
    <Modal
      open={open}
      title="Tạo người dùng mới"
      width={1000}
      // onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <div className="modal-content">
        <Form
            onSubmitCapture={formik.handleSubmit}
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Họ và tên : ">
            <Input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.hoTen} name="hoTen" />
            {formik.touched.hoTen && formik.errors.hoTen ? (
                    <span className="text-warning">{formik.errors.hoTen}</span>
                ) : null}
          </Form.Item>

          <Form.Item label="Tài khoản : ">
            <Input onChange={formik.handleChange} value={formik.values.taiKhoan} name="taiKhoan" />
            {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                    <span className="text-warning">{formik.errors.taiKhoan}</span>
                ) : null}
          </Form.Item>

          <Form.Item label="Mật khẩu">
            <Input.Password onChange={formik.handleChange} value={formik.values.matKhau} name="matKhau" />
            {formik.touched.matKhau && formik.errors.matKhau ? (
                    <span className="text-warning">{formik.errors.matKhau}</span>
                ) : null}
          </Form.Item>

          <Form.Item label="Email : ">
            <Input onChange={formik.handleChange} value={formik.values.email} name="email" />
            {formik.touched.email && formik.errors.email ? (
                    <span className="text-warning">{formik.errors.email}</span>
                ) : null}
          </Form.Item>

          <Form.Item label="Số điện thoại : ">
            <Input onChange={formik.handleChange} value={formik.values.soDt} name="soDt" />
            {formik.touched.soDt && formik.errors.soDt ? (
                    <span className="text-warning">{formik.errors.soDt}</span>
                ) : null}
          </Form.Item>

          <Form.Item label="Mã Nhóm : ">
            <Select
              name="maNhom"
              defaultValue="GP01"
              style={{
                width: 120,
              }}
                onChange={handleChangeSelect('maNhom')}
              options={[
                {
                  value: "GP01",
                  label: "GP01",
                },
                {
                  value: "GP02",
                  label: "GP02",
                },
                {
                  value: "GP03",
                  label: "GP03",
                },
                {
                  value: "GP04",
                  label: "GP04",
                },
                {
                  value: "GP05",
                  label: "GP05",
                },
                {
                  value: "GP06",
                  label: "GP06",
                },
                {
                  value: "GP07",
                  label: "GP07",
                },
                {
                  value: "GP08",
                  label: "GP08",
                },
                {
                  value: "GP09",
                  label: "GP09",
                },
                {
                  value: "GP10",
                  label: "GP10",
                },
                {
                  value: "GP11",
                  label: "GP11",
                },
                {
                  value: "GP12",
                  label: "GP12",
                },
                {
                  value: "GP13",
                  label: "GP13",
                },
                {
                  value: "GP14",
                  label: "GP14",
                },
                {
                  value: "GP15",
                  label: "GP15",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Loại người dùng : ">
            <Select
              name="maLoaiNguoiDung"
              defaultValue="User Type"
              style={{
                width: 120,
              }}
              onChange={handleChangeSelect('maLoaiNguoiDung')}
              options={[
                {
                  value: "QuanTri",
                  label: "Quản trị viên",
                },
                {
                  value: "KhachHang",
                  label: "Người dùng",
                },
              ]}
            />
            {formik.touched.maLoaiNguoiDung && formik.errors.maLoaiNguoiDung ? (
                    <div className="text-warning">{formik.errors.maLoaiNguoiDung}</div>
                ) : null}
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button style={{ marginRight: "20px" }} onClick={handleCancel}>
              Hủy
            </Button>
            <Button htmlType="submit" type="primary">Tạo người dùng</Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
