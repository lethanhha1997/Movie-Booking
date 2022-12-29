import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "./index.css";
import { rapService } from "../../../service";
import { history } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { layDsPhimAction } from "../../../redux/action/movieAction/QuanLyPhimAction";
import LoadingSpinner from "../../isLoading";


export default function FormBooking() {
    const [isLoading, setIsLoading] = useState(false);
    let moment = require("moment");
    const { mangPhim } = useSelector(state => state.quanLyPhimReducer);
    let [maPhim, setMaPhim] = useState(0);
    let [danhSachRap, setDanhSachRap] = useState([]);
    let [maHeThongRap, setMaHeThongRap] = useState('');
    let [maLichChieu, setMaLichChieu] = useState('');
    let [gioChieu, setGioChieu] = useState('default');
    let dispatch = useDispatch();
    useEffect(() => {
        setIsLoading(true);
        const action = layDsPhimAction();
        dispatch(action);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (maPhim !== 0) {
            let promise = rapService.layThongTinLichChieuPhim(maPhim);
            promise.then(res => {
                setDanhSachRap(res.data.content.heThongRapChieu);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [maPhim]);
    let handleSelectPhim = (e) => {
        let maPhim = Number(e.target.value);
        setMaPhim(maPhim);
        setDanhSachRap([]);
        setGioChieu('default')
    };
    let handleSelectRap = (e) => {
        setMaHeThongRap(e.target.value);
        setGioChieu('default')
    };
    let handleSelectNgay = (e) => {
        setMaLichChieu(e.target.value);
        setGioChieu('default')
    };
    let handleSelectGio = (e) => {
        if (e.target.value !== 'default') {
            setGioChieu(e.target.value);
        }
        else{
            setGioChieu('default')
        }
    };

    let renderDSPhim = () => {
        return mangPhim?.map((phim, index) => {
            if (phim.dangChieu) {
                return (
                    <option key={index} value={phim.maPhim}>
                        {phim.tenPhim}
                    </option>
                );
            }
            return null;
        });
    };

    let renderDSRap = () => {
        return danhSachRap.map((rap, index) => {
            return (
                <option key={index} value={rap.maHeThongRap}>
                    {rap.tenHeThongRap}
                </option>
            );
        });
    };
    let renderNgayChieu = () => {
        return danhSachRap.map((cumRap) => {
            if (maHeThongRap === cumRap.maHeThongRap) {
                return cumRap.cumRapChieu.map((rap) => {
                    return rap.lichChieuPhim.map((lichChieu, index) => {
                        return <option key={index} value={lichChieu.maLichChieu}>
                            {moment(lichChieu.ngayChieuGioChieu).format("DD-MM-yyyy")}
                        </option>;
                    });
                });
            }
            return null;
        });
    };
    let renderGioChieu = () => {
        return danhSachRap.map((cumRap) => {
            if (maHeThongRap === cumRap.maHeThongRap) {
                return cumRap.cumRapChieu.map((rap) => {
                    return rap.lichChieuPhim.map((lichChieu, index) => {
                        if (maLichChieu === lichChieu.maLichChieu) {
                            return <option key={index} value={lichChieu.ngayChieuGioChieu}>
                                {moment(lichChieu.ngayChieuGioChieu).format("HH:mm ")}
                            </option>;
                        }
                        return null;
                    });
                });
            }
            return null;
        });
    };
    if (isLoading) {
        <LoadingSpinner />;
    }
    else {
        return (
            <div className="form-booking pt-4" data-aos="fade-down" data-aos-easing="linear"
                data-aos-duration="1500">
                <div className="booking-movie d-flex flex-column flex-lg-row">
                    <div className="col-12 col-md-12 col-lg-6 ">
                        <Form className="d-flex flex-column flex-md-row  ">
                            <Form.Group className="col-12 col-md-8 col-lg-8 ">
                                <Form.Select
                                    id="disabledSelect"
                                    defaultValue={"default"}
                                    className="fw-bold"
                                    onChange={handleSelectPhim}
                                >
                                    <option value={"default"}>Chọn Phim</option>
                                    {renderDSPhim()}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="col-12 col-md-4 col-lg-4 ">
                                <Form.Select
                                    id="disabledSelect"
                                    defaultValue={"default"}
                                    className="fw-bold"
                                    onChange={handleSelectRap}
                                >
                                    <option value={"default"}>Chọn Rạp</option>
                                    {renderDSRap()}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="col-12 col-md-12 col-lg-6 ">
                        <Form className="d-flex flex-column flex-md-row">
                            <Form.Group className=" col-12 col-md-4 col-lg-4 ">
                                <Form.Select
                                    id="disabledSelect"
                                    defaultValue={"default"}
                                    className="fw-bold"
                                    onChange={handleSelectNgay}
                                >
                                    <option value={"default"}>Chọn Ngày</option>
                                    {renderNgayChieu()}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="col-12 col-md-4 col-lg-4 fw-bold">
                                <Form.Select
                                    id="disabledSelect"
                                    defaultValue={"default"}
                                    className="fw-bold"
                                    onChange={handleSelectGio}
                                >
                                    <option value={"default"}>Chọn Giờ</option>
                                    {renderGioChieu()}
                                </Form.Select>
                            </Form.Group>
                            <div className="col-12 col-md-4 col-lg-4 ">
                                {gioChieu !== 'default' ? (
                                    <button onClick={() => {
                                        history.push(`ticketroom/${maLichChieu}`);
                                    }}
                                        className=" btn-book-ticket py-1 py-md-0 ">
                                        Đặt Vé
                                    </button>
                                ) : (
                                    <button className="btn-oder-none" disabled={true}>
                                        Đặt Vé
                                    </button>
                                )}
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}
