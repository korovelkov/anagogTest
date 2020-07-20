import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default function LinkButton({ to, ...props }: any) {
  return <Link to={to}><Button {...props} /></Link>;
}
