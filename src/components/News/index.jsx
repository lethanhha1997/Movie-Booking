import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineLike, AiOutlineEye, AiFillStar } from "react-icons/ai";
import { dataBlog, dataNew } from './dataNew';
import './index.css';

export default function News() {
    let renderNew = () => {
        return dataNew.map((newMovie, index) => {
            return <div className='news-content' key={index}
                data-aos="fade-right" data-aos-duration="1500"
            >
                <Row>
                    <Col xs={5} md={4}>
                        <img style={{ width: '100%', height: '120px' }} src={newMovie.hinhAnh} alt="" />
                    </Col>
                    <Col xs={7} md={8}>
                        <h5 className='new-title-movie'>{newMovie.tenPhim}</h5>
                        <div className='d-none d-md-flex justify-content-lg-between py-2'>
                            <button className='btn-news__like'><AiOutlineLike />{newMovie.like}</button>
                            <button className='new-eye'><AiOutlineEye />{newMovie.view}</button>
                            <span className='new-star'><AiFillStar />{newMovie.rating}</span>
                        </div>
                        <p className='new-title-mota'>{newMovie.moTa}</p>
                    </Col>
                </Row>
            </div>;
        });
    };
    let renderBlog = () => {
        return dataBlog.map((blog, index) => {
            return <div className='news-content' key={index}
                data-aos="fade-right" data-aos-duration="1500"
            >
                <Row>
                    <Col xs={5} md={4}>
                        <img style={{ width: '100%', height: '120px' }} src={blog.hinhAnh} alt="" />
                    </Col>
                    <Col xs={7} md={8}>
                        <h5 className='new-title-movie'>{blog.tenPhim}</h5>
                        <div className='d-none d-md-flex justify-content-lg-between py-2'>
                            <button className='btn-news__like'><AiOutlineLike />{blog.like}</button>
                        </div>
                        <p className='new-title-mota'>{blog.moTa}</p>
                    </Col>
                </Row>
            </div>;
        });
    };
    return (
        <div className='news' id='news' >
            <Container>
                <Row>
                    <Col xs={12} md={12} lg={6} className='pt-3' >
                        <h4 className='new-title'>Review Phim</h4>
                        {renderNew()}
                    </Col>
                    <Col xs={12} md={12} lg={6} className='pt-3' >
                        <h4 className='new-title'>Blog Điện Ảnh</h4>
                        {renderBlog()}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
