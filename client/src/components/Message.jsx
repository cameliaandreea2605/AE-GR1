import React from 'react';
import { Alert } from 'antd';

const Message = ({ type, message }) => {
  return <Alert message={message} type={type} showIcon />;
};

export default Message;
