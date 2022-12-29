import React from 'react';
import { Button, Result } from 'antd';
export default function ECONNABORTED(props) {
  return (
    <Result
    status="500"
    title="ECONNABORTED"
    subTitle="Sorry, something went wrong."
    extra={<Button onClick={()=>{props.history.push('/admin/user-admin')}} type="primary">Back Home</Button>}
  />
  )
}
