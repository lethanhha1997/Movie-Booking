import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, Space, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatUserAdmin,
  layTTNguoiDungAdmin,
} from "../../../redux/action/qLNDAction/qLNDAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
const phoneRegExp = /^[0-9]+$/;
const letterRegExp =
  /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
const notify = () => toast.success('Cập nhật thành công !', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });;
export default function UpdateUser(props) {
  const [isUpdate, setUpdate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { userDetailAdmin } = useSelector(
    (state) => state.quanLyNguoiDungReducer
  );
  const dispatch = useDispatch();
  const { taiKhoan } = props.match.params;
  // console.log('taiKhoan' , taiKhoan) ;
  // console.log('userDetailAdmin' , userDetailAdmin) ;
  useEffect(() => {
    let action = layTTNguoiDungAdmin(taiKhoan, setLoading);
    dispatch(action);
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userDetailAdmin.taiKhoan,
      matKhau: userDetailAdmin.matKhau,
      email: userDetailAdmin.email,
      soDT: userDetailAdmin.soDT,
      maNhom: userDetailAdmin.maNhom,
      maLoaiNguoiDung: userDetailAdmin.maLoaiNguoiDung,
      hoTen: userDetailAdmin.hoTen,
    },
    validationSchema: Yup.object({
      matKhau: Yup.string().trim().required("*Trường này không được để trống!"),
      email: Yup.string()
        .required("*Trường này không được để trống!")
        .email("*Email không hợp lệ!"),
      soDT: Yup.string()
        .required("*Trường này không được để trống!")
        .matches(phoneRegExp, "Phone number is not valid"),
      hoTen: Yup.string()
        .trim()
        .required("*Trường này không được để trống!")
        .matches(letterRegExp, "Tên người dùng không hợp lệ!"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      let action = capNhatUserAdmin(values, taiKhoan, notify);
      dispatch(action);
    },
  });

  const renderButton = () => {
    if (!isUpdate)
      return (
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            setUpdate(true);
          }}
        >
          Cập nhật
        </Button>
      );
    else
      return (
        <>
          <Space wrap>
            <Button
              type="danger"
              htmlType="button"
              onClick={() => {
                setUpdate(false);
              }}
            >
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Space>
        </>
      );
  };
  // console.log('formik value' , formik.values) ;
  if (!isLoading)
    return (
      <div style={{ minHeight: "600px" }}>
        <Spin />
      </div>
    );
  return (
    <div style={{ minHeight: "600px" }}>
      <h2 className="text-center text-primary">Chi tiết người dùng </h2>
      <Form
        onSubmitCapture={formik.handleSubmit}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Form.Item label="Tài khoản">
          <Input
            disabled
            onChange={formik.handleChange}
            value={formik.values.taiKhoan}
            name="taiKhoan"
          />
        </Form.Item>

        <Form.Item label="Họ tên">
          <Input
            disabled={!isUpdate}
            onChange={formik.handleChange}
            value={formik.values.hoTen}
            name="hoTen"
          />
          {formik.touched.hoTen && formik.errors.hoTen ? (
            <span className="text-warning">{formik.errors.hoTen}</span>
          ) : null}
        </Form.Item>

        <Form.Item label="Email">
          <Input
            disabled={!isUpdate}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="text-warning">{formik.errors.email}</span>
          ) : null}
        </Form.Item>

        <Form.Item label="Số điện thoại">
          <Input
            disabled={!isUpdate}
            onChange={formik.handleChange}
            value={formik.values.soDT}
            name="soDT"
          />
          {formik.touched.soDT && formik.errors.soDT ? (
            <span className="text-warning">{formik.errors.soDT}</span>
          ) : null}
        </Form.Item>

        <Form.Item label="Mã Nhóm : ">
          {isUpdate ? (
            <Select
              name="maNhom"
              defaultValue="Mặc định"
              style={{
                width: 120,
              }}
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
          ) : (
            <Input
              disabled={!isUpdate}
              onChange={formik.handleChange}
              value={formik.values.maNhom}
            />
          )}
        </Form.Item>

        <Form.Item label="Loại người dùng : ">
          {isUpdate ? (
            <Select
              name="maLoaiNguoiDung"
              defaultValue="Mặc định"
              style={{
                width: 120,
              }}
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
          ) : (
            <Input
              disabled={!isUpdate}
              onChange={formik.handleChange}
              value={formik.values.maLoaiNguoiDung}
            />
          )}
        </Form.Item>

        <Form.Item label="Mật khẩu">
          <Input.Password
            disabled={!isUpdate}
            onChange={formik.handleChange}
            value={formik.values.matKhau}
            name="matKhau"
          />
          {formik.touched.matKhau && formik.errors.matKhau ? (
            <span className="text-warning">{formik.errors.matKhau}</span>
          ) : null}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          {renderButton()}
        </Form.Item>
      </Form>
      <ToastContainer
        position="top-center"
        autoClose={1000}
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
  );
}
