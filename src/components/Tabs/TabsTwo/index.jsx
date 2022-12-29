import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { AiFillPlayCircle, AiOutlineCloseCircle } from "react-icons/ai";
import "./index.css";

export default function TabsTwo() {
    const [url, setUrl] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const { mangPhim } = useSelector(state => state.quanLyPhimReducer);

    let renderPhim = () => {
        return mangPhim?.map((phim, index) => {
            if (phim.sapChieu) {
                return <Col xs={6} md={4} lg={3} className='pb-4' key={index}>
                    <Card className='card-movie'>
                        <div className='tabs-img '>
                            <img src={phim.hinhAnh} alt="hinhAnh" />
                        </div>
                        <Card.Body>
                            <Card.Title className='text-center card-movie_name  mt-2'>{phim.tenPhim}</Card.Title>
                            <p style={{ color: 'white' }} className="px-2 card-movie_decrip">{phim.moTa}</p>
                            <div className="overlay1"></div>
                            <div className="overlay2"></div>
                            <AiFillPlayCircle className="btn-play-icon" onClick={() => { setModalShow(true); setUrl(phim.trailer); }} />
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
