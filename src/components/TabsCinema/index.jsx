import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import "./index.css";
import { useDispatch, useSelector } from 'react-redux';
import { layDsRapAction } from '../../redux/action/rapAction/QuanLyRapAction';
import { GP_ID } from '../../util/setting';
import { history } from '../../App';


export default function TabCinema() {
    var moment = require("moment");
    const dispatch = useDispatch();
    useEffect(() => {
        const action = layDsRapAction(GP_ID);
        dispatch(action);
    }, []);
    const { mangCumRap } = useSelector(state => state.quanLyRapReducer);
    let renderDsCumRap = () => {
        return mangCumRap?.map((heThongRap) => {
            return <Nav.Item key={heThongRap.maHeThongRap} >
                <Nav.Link eventKey={heThongRap.maHeThongRap} ><img style={{ width: "50px", height: '50px' }} src={heThongRap.logo} alt="" /></Nav.Link>
            </Nav.Item>;
        });
    };
    let renderDsCumRapTheoRap = () => {
        return mangCumRap.map((heThongRap, index) => {
            return <Tab.Pane eventKey={heThongRap.maHeThongRap} key={index}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="bhd-star-cineplex-bitexco">
                    <Row>
                        <Col sm={7} className='pb-5 pb-md-0 scroll-y-tabs'>
                            <Nav variant="pills" className="flex-column">
                                {heThongRap.lstCumRap.map((cumRap, index) => {
                                    return <Nav.Item key={index}>
                                        <Nav.Link eventKey={cumRap.maCumRap}>
                                            <div className='d-flex cinema '>
                                                <img style={{ width: "60px", height: "60px" }} src={cumRap.hinhAnh} alt="" />
                                                <div className='title-cinema'>
                                                    <h6>{cumRap.tenCumRap}</h6>
                                                    <p>{cumRap.diaChi}</p>
                                                </div>
                                            </div>
                                        </Nav.Link>
                                    </Nav.Item>;
                                })}
                            </Nav>
                        </Col>
                        <Col sm={5} className="px-4 scroll-y-tabs">
                            <Tab.Content>
                                {heThongRap.lstCumRap.map((cumRap, index) => {
                                    return <Tab.Pane eventKey={cumRap.maCumRap} key={index} >
                                        {cumRap.danhSachPhim.map((phim) => {
                                            return <div key={phim.maPhim}>
                                                <div className='d-flex py-2'>
                                                    <img style={{ width: "50px", height: "50px" }} src={phim.hinhAnh} alt="" />
                                                    <div className='title-movie'>
                                                        <h6 className='fw-bold' >{phim.tenPhim}</h6>
                                                        <p className='rating'>{phim.hot}</p>
                                                        {phim.hot ? <p className='rating'>Lượt Xem Cao</p> : <p className='rating'>Lượt Xem Trung Bình</p>}
                                                    </div>
                                                </div>
                                                <div>
                                                    {phim.lstLichChieuTheoPhim.map((lichChieu, index) => {
                                                        return <div key={index}>
                                                            <span className='date-movie'>Suất Chiếu: <span className='movie-list__time'>{moment(lichChieu.ngayChieuGioChieu).format("DD-MM-yyyy")}</span> </span>
                                                            <button onClick={() => {
                                                                history.push(`ticketroom/${lichChieu.maLichChieu}`);
                                                            }} className='btn-hour'>
                                                                {moment(lichChieu.ngayChieuGioChieu).format("k:mm")}
                                                                ~ {moment(lichChieu.ngayChieuGioChieu).add(120, 'minute').format("k:mm")}
                                                            </button>
                                                        </div>;
                                                    })}
                                                </div>
                                            </div>;
                                        })}
                                    </Tab.Pane>;
                                })}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Tab.Pane>;
        });
    };

    return (
        <div className='container-tabs__cinema' id='theater' >
            <div className='empty-area'>
            </div>
            <div className='tabs-cinema my-4' >
                <h4 className='tab-cinema__title my-4' data-aos="fade-right" data-aos-duration="1000">Lịch Chiếu Phim</h4>
                <Tab.Container id="left-tabs-example" defaultActiveKey="BHDStar">
                    <Row className='bd-cinema py-3' data-aos="fade-right" data-aos-duration="1500">
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-row flex-md-column">
                                {renderDsCumRap()}
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                {renderDsCumRapTheoRap()}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container >
            </div>
        </div>
    );
}

