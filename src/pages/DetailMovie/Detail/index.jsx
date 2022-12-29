import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineCloseCircle, AiFillStar, AiOutlineStar, AiOutlinePlayCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import './index.css'
import { layChiTietPhim } from '../../../redux/action/rapAction/QuanLyRapAction';


export default function DetailMovie(props) {
    const moment = require("moment");
    const maPhim = props.maPhim
    const [url, setUrl] = useState('')
    const [modalShow, setModalShow] = useState(false);
    const { phimDetail } = useSelector(state => state.quanLyPhimReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        const action = layChiTietPhim(maPhim)
        dispatch(action)
    }, [])
    return (
        <div className="detail" data-aos="zoom-in" data-aos-duration="1000">
            <div className="detail-movies" >
                <Container className='pt-3'>
                    <Row>
                        <Col xs={1} lg={2}>
                            <div className='baner-detail d-none d-lg-block'>
                            </div>
                        </Col>
                        <Col xs={12} lg={8} key="index">
                            <Row>
                                <Col xs={12} md={4}>
                                    <div className='img-movie mt-3'>
                                        <img src={phimDetail.hinhAnh} alt="" />
                                        <div className="icon-play d-none d-sm-block">
                                            <AiOutlinePlayCircle onClick={() => { setModalShow(true); setUrl(phimDetail.trailer) }} />
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={8}>
                                    <h4 className='detail-title mt-3'>{phimDetail.tenPhim}</h4>
                                    <div className='detail-span py-3'>
                                        <span>IMDb: {phimDetail.danhGia}/10</span>
                                        {phimDetail.hot ?
                                            <span><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></span>
                                            : <span><AiFillStar /><AiFillStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /></span>}
                                    </div>
                                    <div className='detail-director py-1'>
                                        <h5>Đạo Diễn: <span >Frank Darabont</span></h5>
                                    </div>
                                    <div className='detail-cast py-1'>
                                        <h5 >Mô Tả Phim:</h5>
                                        <p className='description-movie my-1'>{phimDetail.moTa}</p>
                                    </div>
                                    <div className='detail-cast py-1'>
                                        <h5 >Thể Loại:</h5>
                                        <p className='description-movie my-1'>Hành Động</p>
                                    </div>
                                    <div className='detail-cast'>
                                        <h5 >Ngày Chiếu Khởi Chiếu:</h5>
                                        <p className='description-movie my-1'>{moment(phimDetail.ngayKhoiChieu).format("DD-MM-yyyy")}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={1} lg={2}>
                            <div className='baner-detail d-none d-lg-block'>
                            </div>
                        </Col>
                    </Row>
                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Body>
                            <AiOutlineCloseCircle className='trailer-icon__close' onClick={() => { setModalShow(false) }} />
                            <iframe src={url}
                                allowFullScreen
                                frameBorder="0"
                                allow="autoplay"
                                title="trailer "></iframe>
                        </Modal.Body>
                    </Modal>
                </Container>
            </div>
        </div>
    )
}
