import React from 'react';
import { Button } from 'antd';

import './style.scss';

export default function FileButton({ inputProps, ...props }: any) {
  return (
    <Button className="UploadFileButton" {...props} >
      {props.children}
      <label>
        <input {...inputProps} type="file"/>
      </label>
    </Button>
  );
}
