import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { AiFillPlayCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { history } from "../../../App";

export default function TabsOne() {
    const [url, setUrl] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const { mangPhim } = useSelector(state => state.quanLyPhimReducer);

    let renderPhim = () => {
        return mangPhim?.map((phim, index) => {
            if (phim.dangChieu) {
                return <Col xs={6} md={4} lg={3} className='pb-4' key={index} data-aos="flip-left" data-aos-duration="2000">
                    <Card className='card-movie'>
                        <div className='tabs-img '>
                            <img src={phim.hinhAnh} alt="hinhAnh" />
                        </div>
                        <Card.Body>
                            <Card.Title className='text-center card-movie_name  mt-2'>{phim.tenPhim}</Card.Title>
                            <p style={{ color: 'white' }} className="px-2 card-movie_decrip">{phim.moTa}</p>
                            <div className="overlay1"></div>
                            <div className="overlay2"></div>
                            <AiFillPlayCircle className="btn-play-icon" onClick={() => { setUrl(phim.trailer); setModalShow(true); }} />
                            <button onClick={() => {
                                history.push(`detail/${phim.maPhim}`);
                            }}
                                className='btn-tabs-booking' >Chi Tiết Phim</button>
                        </Card.Body>
                    </Card>
                </Col>;
            }
            return null;
        });
    };

    return (
        <Row>
            {renderPhim()}
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <AiOutlineCloseCircle className='trailer-icon__close'
                        onClick={() => { setModalShow(false); }} />
                    <iframe src={url}
                        allowFullScreen
                        frameBorder="0"
                        allow="autoplay"
                        title="trailer "></iframe>
                </Modal.Body>
            </Modal>
        </Row>

    );
}
