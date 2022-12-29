import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";
import dayjs from 'dayjs';
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetailMovieAdmin, updateMovieAdmin } from "../../../redux/action/movieAction/QuanLyPhimAction";
import { useFormik } from "formik";
import moment from 'moment';


const { TextArea } = Input;
export default function DetailMovieAdmin(props) {
  // let [phim , setPhim] = useState({}) ; 
  let [srcImage , setSrcImage] = useState(null) ; 
  let { phimDetailAdmin } = useSelector((state) => state.quanLyPhimReducer);
  console.log('phimDetailAdmin' , phimDetailAdmin) ; 
 
  let dispatch = useDispatch();
  const { maphim } = props.match.params;
  useEffect(() => {
    let action = getDetailMovieAdmin(maphim);
    dispatch(action);
  }, []);

  useEffect(()=>{
    setSrcImage(phimDetailAdmin.hinhAnh) ; 
  } , [phimDetailAdmin])

  const formik = useFormik({
    enableReinitialize : true , 
    initialValues: {
      maNhom : phimDetailAdmin?.maNhom ,
      tenPhim : phimDetailAdmin?.tenPhim,
      trailer : phimDetailAdmin?.trailer,
      moTa : phimDetailAdmin?.moTa,
      ngayKhoiChieu : phimDetailAdmin?.ngayKhoiChieu,
      dangChieu : phimDetailAdmin?.dangChieu,
      sapChieu : phimDetailAdmin?.sapChieu,
      hot :phimDetailAdmin?.hot,
      danhGia : phimDetailAdmin?.danhGia,
      hinhAnh : null,
    },
    onSubmit: values => {
      console.log(values) ; 
      let formData = new FormData() ; 
      for (const key in values) {
        if(key === 'hinhAnh'  && values[key] !== null ) {
          formData.append('image file' , values[key] , values[key].name) ; 
        }else if (key === 'ngayKhoiChieu') {
            let nkc = moment(values[key]).format('DD/MM/YYYY') ; 
            // console.log('nkc' , nkc) ; 
            formData.append(key , values[key]) ; 
        }else {
          formData.append(key , values[key]) ; 
        }
      }
      let action = updateMovieAdmin(formData , maphim ) ; 
      dispatch(action) ; 
    },
  });
  // console.log('formik value' , formik.values) ; 

  const handleChangeSelect = (value) => {
    console.log(value);
  };

  const handleChangSwitch = (name) => {
    return value => {
      formik.setFieldValue(name , value) ; 
    }
  } 

  const handleSubmitFile = (e) => {
      let file = e.target.files[0] ; 
      console.log('file' , file) ; 
      formik.setFieldValue('hinhAnh' , file) ; 
      let reader = new FileReader() ; 
      reader.readAsDataURL(file) ; 
      reader.onload = (e => {
        let url = e.target.result ; 
        // console.log(e.target.result) ; 
        setSrcImage(url) ; 
      })
    }
     

  const handleChangeDate = (value) => {
    let nkc = moment(value).format('DD/MM/YYYY') ;
    // console.log('nkc' , nkc) ; 
    formik.setFieldValue('ngayKhoiChieu' , nkc) ; 
  }

  const day = moment(formik.values.ngayKhoiChieu).format('DD/MM/YYYY') ;
  console.log('day' , day) 
  
  return (
    <>
      <Form
      onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}
        // disabled={componentDisabled}
      >
        <h2 className="text-center text-primary ">Thông tin phim chi tiết</h2>
        <Form.Item label="Chọn mã nhóm">
          <Select
          name = 'maNhom'
            defaultValue= 'Mã Nhóm'
            style={{
              width: 120,
            }}
            onChange={handleChangeSelect}
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

        <Form.Item label="Tên phim">
          <Input onChange={formik.handleChange} value={formik.values.tenPhim} name="tenPhim" />
        </Form.Item>

        <Form.Item label="Trailer">
          <Input onChange={formik.handleChange} value={formik.values.trailer} name="trailer" />
        </Form.Item>

        <Form.Item label="Mô tả">
          <TextArea onChange={formik.handleChange} value={formik.values.moTa} rows={4} name="moTa" />
        </Form.Item>

        <Form.Item label="Ngày khởi chiếu">
          <DatePicker defaultValue={dayjs('01/01/2015', 'DD/MM/YYYY')} format={'DD/MM/YYYY'} onChange = {handleChangeDate} />
        </Form.Item>

        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch checked = {formik.values.dangChieu} onChange = {handleChangSwitch('dangChieu')} name="dangChieu" />
        </Form.Item>

        <Form.Item label="Hot" valuePropName="checked">
          <Switch checked={formik.values.hot} onChange={handleChangSwitch('hot')} name="hot" />
        </Form.Item>

        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch checked = {formik.values.sapChieu} onChange = {handleChangSwitch('sapChieu')} name="sapChieu" />
        </Form.Item>

        <Form.Item label="Đánh giá">
          <InputNumber 
          onChange={(value)=>{
            // console.log(value)
            formik.setFieldValue('danhGia' , value) ; 
          }}
          value={formik.values.danhGia} 
          name="danhGia" 
          min={0} max={10} />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <input 
          accept="image/png, image/gif, image/jpeg"
          type="file" 
          onChange={handleSubmitFile} />
          <img style={{
            width : '200px',
            marginTop : '20px',
            borderRadius : '5px'
          }} src={srcImage} alt="" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">Cập nhật</Button>
        </Form.Item>
      </Form>
    </>
  );
}
