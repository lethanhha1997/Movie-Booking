import React from 'react'
import { useDispatch } from 'react-redux';
import { hidenLoadingAction } from '../../redux/action/loadingAction/loading';
import './style.css'
export default function NotFound() {
    const dispatch = useDispatch()
    dispatch(hidenLoadingAction)
  return (
    <div className='not-found'>
    </div>
  )
}
