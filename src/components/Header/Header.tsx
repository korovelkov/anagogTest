import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { connect } from 'react-redux';

import { logout } from '../../redux/user/actions';

import { AppState } from '../../redux';

import './style.scss';

interface IService {
  name: string;
  active: boolean;
}

interface IProps {
  userName: string;
  logout: () => void;
}

const services: IService[] = [
  {
    name: 'Manage Service Status',
    active: true,
  },
  {
    name: 'Consume service Status',
    active: true,
  },
  {
    name: 'Reports Service Status',
    active: true,
  },
];

export class Header extends Component<IProps, null> {
  logout = async () => {
    await this.props.logout();
  }

  public render() {
    const { userName } = this.props;
    return (
      <div className="Header">
        {services.map((service: IService) => (
          <div key={service.name} className="Header__service">
            <span className="Header__service-text">{service.name}</span>
            <Icon type="check-circle" theme="twoTone" twoToneColor="green" />
          </div>
        ))}
        {userName && <div className="Header__user">Hello {userName}</div>}
        <Button
          type="primary"
          onClick={this.logout}
        >
          Logout
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ user }: AppState) => ({
  userName: user.name,
});

export default connect(mapStateToProps, { logout })(Header);
