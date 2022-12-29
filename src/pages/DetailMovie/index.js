import React from 'react';
import { useEffect } from 'react';
import DetailMovie from './Detail';
import TabsDetailCinema from './TabDetail';
import './index.css';

export default function DetailMoviePage(props) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <div className='detail-container' >
      <DetailMovie maPhim={props.match.params.maPhim} />
      <TabsDetailCinema maPhim={props.match.params.maPhim} />
    </div>
  );
}
