import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './index.css';
import { dataPromotion } from './dataPromiton';


export default function Promotion() {
    let renderImg = () => {
        return dataPromotion.map((img, index) => {
            return <Col xs={6} md={4} lg={3} className='pb-4' key={index} data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="3000">
                <Card  >
                    <div className='promotion-img'>
                        <img className='img-fluid' src={img.hinhAnh} alt={img.maHinh} />
                    </div>
                </Card>
            </Col>;
        });
    };
    return (
        <div className='promotion pt-5' id='promotion' >
            <h4 className='promotion-title' data-aos="fade-right" data-aos-duration="1000">Tin Khuyến Mãi</h4>
            <Row className='py-4'>
                {renderImg()}
            </Row>
        </div>
    );
}
