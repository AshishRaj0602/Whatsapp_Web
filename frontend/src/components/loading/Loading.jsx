import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loading = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;
  return (
    <div className="loading" style={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Spin indicator={antIcon}/>
    </div>
  )
}

export default Loading





