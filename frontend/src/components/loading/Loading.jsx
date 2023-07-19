import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loading = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Spin indicator={antIcon}/>
  )
}

export default Loading





