import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { history } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'antd';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdChair } from "react-icons/md";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { datVeAction, quanLyDatVeAction } from '../../redux/action/datVeAction/QuanLyDatVeAction';
import { CHANGE_TAB_ACTIVE, DAT_VE, DAT_VE_THANH_CONG } from '../../redux/type/datVe-type/DatVeType';
import { USER_LOGIN } from '../../util/setting';
import './index.css';


export default function BookingPage(props) {
    const maLichChieu = props.match.params.maLichChieu;
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    useEffect(() => {
        let action = quanLyDatVeAction(maLichChieu);
        dispatch(action);

    }, [dispatch,maLichChieu]);
    const { chiTietPhongVe, danhSachGheDangDat, tabActive } = useSelector(state => state.quanLyDatVeReducer);
    const [open, setOpen] = useState(false);
    const { userLogin } = useSelector(state => state.quanLyNguoiDungReducer);
    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login' />;
    }
    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
    const renderGhe = () => {
        return danhSachGhe?.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDuocChon' : '';
            let classGheDangDat = '';
            let indexGheDangDat = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.maGhe === ghe.maGhe);
            let classGheUserDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheUserDat = 'gheUserDat';
            }
            if (indexGheDangDat !== -1) {
                classGheDangDat = 'gheDangChon';
            }
            return <React.Fragment key={index}>
                <button onClick={() => {
                    dispatch({
                        type: DAT_VE,
                        gheDangChon: ghe
                    });
                }}
                    disabled={ghe.daDat} className='ghe' key={index}>
                    <MdChair className={`${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheUserDat}`} />
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </React.Fragment>;
        });
    };
    const _ = require('lodash');
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const notifyFall = () => toast("B???n Ch??a Ch???n Gh??? !", {
        position: toast.POSITION.TOP_RIGHT
    });
    const notify = () => toast("?????t V?? Th??nh C??ng !", {
        position: toast.POSITION.TOP_RIGHT
    });

    return (
        <div className='booking' >
            <Container>
                <Tabs
                    defaultActiveKey='1'
                    activeKey={tabActive}
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                    onSelect={(eventKey) => {
                        dispatch({
                            type: CHANGE_TAB_ACTIVE,
                            number: eventKey,
                        });
                    }}
                >
                    <Tab eventKey="1" title="Ch???n Gh???">
                        <Row className="justify-content-md-center">
                            <Col md={12} lg={9} >
                                <div className='chair'>
                                    <div className='scren'>
                                        <img src="https://movie-booking-project.vercel.app/img/bookticket/screen.png" alt="" />
                                    </div>
                                    {renderGhe()}
                                </div>
                                <div className='type-ghe my-4' data-aos="zoom-in">
                                    <div className='ghe-content'>
                                        <div className='d-flex justify-content-center flex-column flex-md-row'>
                                            <h6 className='px-3'> <MdChair className=' gheThuong' /> Gh??? Th?????ng</h6>
                                            <h6 className='px-3'> <MdChair className=' gheVip' /> Gh??? Vip</h6>
                                            <h6 className='px-3'> <MdChair className=' gheDangChon' /> Gh??? B???n Ch???n</h6>
                                        </div>
                                    </div>
                                    <div className='ghe-content'>
                                        <div className='d-flex justify-content-center flex-column flex-md-row'>
                                            <h6 className='px-3'> <MdChair className=' gheDaDuocChon' /> Gh??? ???? ???????c Ch???n</h6>
                                            <h6 className='px-3'> <MdChair className=' gheUserDat' /> Gh??? B???n ???? ?????t</h6>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={12} lg={3}>
                                <div className='form-ticket px-3 py-3'>
                                    <h4 className='text-center py-2 ticket-color fw-bold'>{thongTinPhim?.tenPhim}</h4>
                                    <div className='d-flex justify-content-between py-3 form-ticket__item '>
                                        <h6>Ng??y Gi??? Chi???u:</h6>
                                        <div className='d-flex'>
                                            <h6 className='ticket-color'>{thongTinPhim?.gioChieu}</h6> <h6>-{thongTinPhim?.ngayChieu}</h6>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between py-2 form-ticket__item'>
                                        <h6>C???m R???p:</h6>
                                        <h6 className='ticket-color'>{thongTinPhim?.tenCumRap}</h6>
                                    </div>
                                    <div className='d-flex justify-content-between py-2 form-ticket__item'>
                                        <h6>?????a Ch???:</h6>
                                        <h6 className='ticket-color'>{thongTinPhim?.diaChi}</h6>
                                    </div>
                                    <div className='d-flex justify-content-between py-2 form-ticket__item'>
                                        <h6>R???p:</h6>
                                        <h6 className='ticket-color'>{thongTinPhim?.tenRap}</h6>
                                    </div>
                                    <div className='d-flex justify-content-between py-2 form-ticket__item'>
                                        <h6 className='justify-content-start'>Gh??? Ch???n:</h6>
                                        <div className='justify-content-end'>
                                            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDangDat, index) => {
                                                return <span key={index} className='ticket-color fw-bold'>{gheDangDat.stt} </span>;
                                            })}
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between py-2'>
                                        <h6>T???ng ti???n:</h6>
                                        <h6 className='ticket-color'>{danhSachGheDangDat.reduce((total, ghe) => {
                                            return total += ghe.giaVe;
                                        }, 0).toLocaleString()} vn??</h6>
                                    </div>
                                    <div>{danhSachGheDangDat.length === 0 ?
                                        <button onClick={() => { notifyFall(); }}
                                            className='btn-booking'>BOOKING TICKET</button>
                                        : <button className='btn-booking' onClick={
                                            () => {
                                                const thongTinDatVe = {
                                                    maLichChieu: maLichChieu,
                                                    danhSachVe: danhSachGheDangDat
                                                };
                                                const action = datVeAction(thongTinDatVe);
                                                dispatch(action);
                                            }
                                        }>BOOKING TICKET</button>}
                                        <ToastContainer />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="2" title="Th??ng Tin V??">
                        <Container className='ct-ticket'>
                            <Row className="justify-content-md-center">
                                <Col xs lg="4">
                                    <div className='img-ticket'>
                                        <img src="https://cdn.galaxycine.vn/media/2022/10/14/vnpay_1665735135975.jpg" alt="" />
                                    </div>
                                </Col>
                                <Col md="auto" lg="4">
                                    <div className='d-flex flex-column ticket-booking px-4 py-3 mb-5'>
                                        <div className='d-flex justify-content-between  py-2'>
                                            <h6 className='text-white'>T??n Kh??ch H??ng:</h6>
                                            <h6 className='text-white'> {userLogin.hoTen}</h6>
                                        </div>
                                        <div className='d-flex justify-content-between  py-2'>
                                            <h6 className='text-white'>Email:</h6>
                                            <h6 className='text-white'>{userLogin.email}</h6>
                                        </div>
                                        <div className='d-flex justify-content-between py-2'>
                                            <h6 className='text-white'>Phone:</h6>
                                            <h6 className='text-white'> {userLogin.soDT}</h6>
                                        </div>
                                        <div className='d-flex justify-content-between  py-2 '>
                                            <h6 className='text-white'>Gh??? ?????t:</h6>
                                            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDangDat, index) => {
                                                return <span key={index} className='fw-bold  text-danger'>{gheDangDat.stt} </span>;
                                            })}
                                        </div>
                                        <div className='d-flex justify-content-between py-2 '>
                                            <h6 className='text-white'>Su???t Chi???u:</h6>
                                            <h6 className='text-danger'>{thongTinPhim?.gioChieu}-{thongTinPhim?.ngayChieu}</h6>
                                        </div>
                                        <div className='d-flex justify-content-between py-3'>
                                            <h6 className='text-white'>R???p:</h6>
                                            <h6 className='text-white'>{thongTinPhim?.tenRap}</h6>
                                        </div>
                                        <div className=' d-flex justify-content-between align-items-center'>
                                            <h6 className=' text-danger'>M?? QR V??o R???p Thay Th??? V??</h6>
                                            <img width='100' height='100' src="https://images.viblo.asia/f96109f8-e2b2-4944-88ef-071ce79a50a8.png" alt="" />
                                        </div>
                                        <h6 className='text-white py-3'>V?? ???? ???????c ?????t Kh??ng Th??? H???y, Vui L??ng ?????n ????ng Gi??? ????? T???n H?????ng Tr???n V???n B??? Phim</h6>
                                        <p>* M?? QR ???????c L??u T???i Th??ng Tin Kh??ch H??ng</p>
                                        {danhSachGheDangDat.length === 0 ? <button onClick={() => { notifyFall(); }}
                                            className='btn-booking'>X??c Nh???n</button> :
                                            <button className='btn-booking' onClick={() => {
                                                showModal();
                                                notify();
                                            }}>X??c Nh???n</button>
                                        }
                                        <ToastContainer />
                                    </div>
                                </Col>
                                <Col xs lg="4">
                                    <div className='img-ticket'>
                                        <img src="https://cdn.galaxycine.vn/media/2022/11/4/glx-t11-1200x1800_1667571519490.jpg" alt="" />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <Modal
                            title="CINEMA SAFE"
                            open={open}
                            onOk={hideModal}
                            onCancel={hideModal}
                            footer={[
                                <button key="submit"
                                    className='btn-booking'
                                    onClick={() => {
                                        history.push('/');
                                        const action = { type: DAT_VE_THANH_CONG };
                                        dispatch(action);
                                    }}
                                >
                                    ?????ng ??
                                </button>
                            ]}
                        >
                            <h3>?????t V?? Th??nh C??ng</h3>
                        </Modal>
                    </Tab>
                </Tabs>
            </Container>
        </div >
    );
}
