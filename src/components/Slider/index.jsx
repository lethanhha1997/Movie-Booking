import React from 'react'
import './dataSlider'
import { useDispatch } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { dataImg } from './dataSlider';
import SliderTrailer from './SliderTrailer';
import { AiOutlinePlayCircle } from "react-icons/ai";
import { OPEN_VIDEO } from '../../redux/type/movie-type/SliderType';
import './index.css';


export default function SliderComponent() {
  let dispacth = useDispatch()
  let openVideo = (link) => {
    dispacth({
      type: OPEN_VIDEO,
      payload: {
        open: true,
        linkYouTube: link
      }
    })
  }
  return (
    <Carousel >
      {dataImg.map((img) => {
        return <Carousel.Item interval={3000} key={img.maPhim}>
          <img
            className="d-block w-100"
            src={img.hinhAnh}
            alt={img.biDanh}
          />
          <div className="icon-play d-none d-sm-block">
            <AiOutlinePlayCircle onClick={() => openVideo(img.trailer)} />
            <SliderTrailer />
          </div>
        </Carousel.Item>
      })}

    </Carousel>
  )
}
