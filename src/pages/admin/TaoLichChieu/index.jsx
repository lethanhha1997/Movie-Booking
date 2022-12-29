import React, { useEffect } from "react";
import "./index.css";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  TimePicker,
  DatePicker,
  Select,
  InputNumber 
} from "antd";
import {
  getDetailMovieAdmin,
  layDSCumRap,
  layTTHeTHongRapAdminAction,
  taoLichChieu,
} from "../../../redux/action/movieAction/QuanLyPhimAction";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import moment from "moment";
const { Option } = Select;
export default function TaoLichChieu(props) {
  let [heThongRap, setHeThongRap] = useState([]);
  let [maHeThongRap, setmaHeThongRap] = useState(null);
  let [DSCumRap, setDSCumRap] = useState([]);
  let [cumRap , setCumRap] = useState(null) ; 
  let [date , setDate] = useState(null) ; 
  let [time , setTime] = useState(null) ; 
  let [giaVe , setGiaVe] = useState(null) ; 
  console.log("DSCumRap", DSCumRap);
  const { maPhim } = props.match.params;
  const dispatch = useDispatch();
  let { phimDetailAdmin } = useSelector((state) => state.quanLyPhimReducer);
  //   console.log("phimDetailAdmin", phimDetailAdmin);

  useEffect(() => {
    let action = getDetailMovieAdmin(maPhim);
    dispatch(action);
    layTTHeTHongRapAdminAction(setHeThongRap);
  }, []);

  const renderHeThongRap = () => {
    if (heThongRap.length !== 0) {
      return heThongRap.map((heThongRap) => {
        return (
          <Option key={heThongRap.maHeThongRap} value={heThongRap.maHeThongRap}>
            {heThongRap.tenHeThongRap}
          </Option>
        );
      });
    }
  };
  const renderCumRap = () => {
    if (DSCumRap.length !== 0) {
      return DSCumRap.map((cumRap) => {
        return <Option key={cumRap.maCumRap} value={cumRap.maCumRap}>{cumRap.tenCumRap}</Option>;
      });
    }else return <Option value = 'no-val'>Vui lòng chọn hệ thống rạp</Option>
  };

  const handleChangeHTR = (values) => {
    // console.log(values) ;
    setmaHeThongRap(values);
  };
  const handeChangCR = (values) => {
    setCumRap(values) ; 
  }
  useEffect(() => {
    if (maHeThongRap) {
      console.log("maHeThongRap", maHeThongRap);
      layDSCumRap(maHeThongRap, setDSCumRap);
    }
  }, [maHeThongRap]);

  const handleSubmitLichChieu = () => {
    // {
    //     "maPhim": 10380,
    //     "ngayChieuGioChieu": "20/11/2022 08:12:00",
    //     "maRap": "bhd-star-cineplex-3-2",
    //     "giaVe": 75000
    //   }
    let lichChieu = {
        maPhim ,
        ngayChieuGioChieu : date.concat(' ' , time),
        maRap : cumRap,
        giaVe
        } ;
    console.log(lichChieu) ; 
    taoLichChieu(lichChieu) ; 
  }
  return (
    <div style={{ minHeight: "600px" }}>
      <h2 className="text-center text-primary">Tạo lịch chiếu</h2>
      <Row>
        <Col span={12} className="text-center">
          <h3 className="text-primary">{phimDetailAdmin.tenPhim}</h3>
          <img
            style={{ width: "300px", borderRadius: "8px" }}
            src={phimDetailAdmin.hinhAnh}
            alt={phimDetailAdmin.biDanh}
          />
        </Col>
        <Col span={12}>
          <Form
          onSubmitCapture={handleSubmitLichChieu}
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
          >
            <Form.Item label="Mã phim">
              <Input value={maPhim} />
            </Form.Item>

            <Form.Item label="Chọn hệ thống rạp">
              <Select defaultValue="Hệ thống rạp" onChange={handleChangeHTR}>
                {renderHeThongRap()}
              </Select>
            </Form.Item>

            <Form.Item label="Chọn cụm rạp">
              <Select onChange={handeChangCR} defaultValue="Cụm rạp">
                {renderCumRap()}
              </Select>
            </Form.Item>

            <Form.Item label="Chọn ngày chiếu">
              <DatePicker disabled = {cumRap ? false : true} onChange = {(date) => {
                let pickedDate = moment(date).format('DD/MM/YYYY') ; 
                setDate(pickedDate); 
              }} />
            </Form.Item>

            <Form.Item label="Chọn giờ chiếu">
              <TimePicker disabled = {cumRap ? false : true} onChange = {(time) => {
                let pickedTime = moment(time).format('hh:mm:ss') ; 
                setTime(pickedTime) ;
              }} />
            </Form.Item>

            <Form.Item label="Giá vé">
              <InputNumber disabled = {cumRap ? false : true} min={75000} max={200000} onChange={(value)=>{
                        setGiaVe(value) ; 
                    
              }} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Tạo lịch chiếu
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
