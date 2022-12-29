import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import './index.css';


export default function LoadingSpinner() {
    const { isLoading } = useSelector(state => state.LoadingReducer);
    return (
        <Fragment>
            {isLoading ?
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#080a1b', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '1100' }}>
                    <div className="loader loader-12">
                        <svg className="loader-star star1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 23.172 23.346" xmlSpace="preserve">
                            <polygon points="11.586,0 8.864,8.9 0,8.9 7.193,14.447 4.471,23.346 11.586,17.84 18.739,23.346 16.77,14.985 23.172,8.9 14.306,8.9" />
                        </svg>
                        <svg className="loader-star star2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 23.172 23.346" xmlSpace="preserve">
                            <polygon points="11.586,0 8.864,8.9 0,8.9 7.193,14.447 4.471,23.346 11.586,17.84 18.739,23.346 16.77,14.985 23.172,8.9 14.306,8.9" />
                        </svg>
                        <svg className="loader-star star3" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 23.172 23.346" xmlSpace="preserve">
                            <polygon points="11.586,0 8.864,8.9 0,8.9 7.193,14.447 4.471,23.346 11.586,17.84 18.739,23.346 16.77,14.985 23.172,8.9 14.306,8.9" />
                        </svg>
                        <svg className="loader-star star4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 23.172 23.346" xmlSpace="preserve">
                            <polygon points="11.586,0 8.864,8.9 0,8.9 7.193,14.447 4.471,23.346 11.586,17.84 18.739,23.346 16.77,14.985 23.172,8.9 14.306,8.9" />
                        </svg>
                        <svg className="loader-star star5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 23.172 23.346" xmlSpace="preserve">
                            <polygon points="11.586,0 8.864,8.9 0,8.9 7.193,14.447 4.471,23.346 11.586,17.84 18.739,23.346 16.77,14.985 23.172,8.9 14.306,8.9" />
                        </svg>
                        <svg className="loader-star star6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 23.172 23.346" xmlSpace="preserve">
                            <polygon points="11.586,0 8.864,8.9 0,8.9 7.193,14.447 4.471,23.346 11.586,17.84 18.739,23.346 16.77,14.985 23.172,8.9 14.306,8.9" />
                        </svg>
                    </div>
                </div> : ''
            }
        </Fragment>
    );
}   
