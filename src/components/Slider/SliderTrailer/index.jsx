import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_VIDEO } from '../../../redux/type/movie-type/SliderType';
import './index.css'


export default function SliderTrailer(props) {
    const link = useSelector((state) => state.slideReducer)
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch({ type: CLOSE_VIDEO, payload: { open: false } });
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={link.open}
            onHide={handleClose}
            >
            <Modal.Body>
                <AiOutlineCloseCircle className='trailer-icon__close' onClick={handleClose} />
                <iframe src={link.linkYouTube}
                    allowFullScreen
                    frameBorder="0"
                    allow="autoplay"
                    title="trailer "></iframe>
            </Modal.Body>
        </Modal>
    )
}
