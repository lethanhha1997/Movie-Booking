import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { layChiTietPhim } from '../../../redux/action/rapAction/QuanLyRapAction';
import "./index.css";
import { Tabs } from 'antd';
import { history } from '../../../App';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function TabsDetailCinema(props) {
    const moment = require("moment");
    const { phimDetail } = useSelector(state => state.quanLyPhimReducer);

    let renderRapp = () => {
        if (phimDetail.heThongRapChieu?.length > 0) {
            return <Tabs
                tabPosition={'left'}
                className='d-flex flex-column flex-md-row'
                items={phimDetail.heThongRapChieu?.map((htr, i) => {
                    const id = String(i + 1);
                    return {
                        label: <img src={htr.logo} alt="" width='50' />,
                        key: id,
                        children: <div>
                            {htr.cumRapChieu?.map((cumRap, index) => {
                                return <div key={index}>
                                    <div className='d-flex flex-row mt-3'>
                                        <img src={cumRap.hinhAnh} style={{ width: 70, height: 70 }} alt="" />
                                        <div className='mx-2'>
                                            <h6 className='title-detail fw-bold'>{cumRap.tenCumRap}</h6>
                                            <p className='title-detail'>{cumRap.diaChi}</p>
                                        </div>
                                    </div>
                                    <div className='d-flex  flex-column flex-md-row'>
                                        <Row>
                                            {cumRap.lichChieuPhim?.map((lichChieu, index) => {
                                                return <Col xs={12} md={4} key={index}>
                                                    <button className='btn-detail my-2 me-3' onClick={() => {
                                                        history.push(`/ticketroom/${lichChieu.maLichChieu}`);
                                                    }}>
                                                        <span style={{ color: 'red' }}>{moment(lichChieu.ngayChieuGioChieu).format("k:mm")}</span>~
                                                        <span> {moment(lichChieu.ngayChieuGioChieu).add(`${lichChieu.thoiLuong}`, 'minute').format("k:mm")}</span>
                                                    </button>
                                                </Col>;
                                            })}
                                        </Row>
                                    </div>
                                </div>;
                            })}
                        </div>,
                    };
                })}
            />;
        }
        else {
            return <div className='text-center'
                style={{ backgroundColor: 'white' }}>
                <h4 style={{ color: '#a0d911' }}>Phim Chưa Có Lịch Chiếu</h4>
            </div>;
        }
    };

    return (
        <div className="detail-tabs" data-aos="fade-right" data-aos-duration="3000">
            {renderRapp()}
        </div>
    );
}
