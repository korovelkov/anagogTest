import React, { Component } from 'react';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';

import { login } from '../../redux/user/actions';
import { AppState } from '../../redux';

import './style.scss';

interface IState {
  name: string;
  password: string;
}

interface IProps {
  login: (name: string, password: string) => void;
  name: string;
  error: string;
}

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export class Login extends Component<IProps, IState> {
  state: IState = {
    name: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }: InputEvent): void => {
    this.setState({ [name]: value } as Pick<IState, keyof IState>);
  }

  login = () => {
    const { name, password } = this.state;
    const { login } = this.props;
    login(name, password);
  }

  render() {
    const { error } = this.props;
    const { name, password } = this.state;
    return (
      <div className="Login">
        <h1 className="Login__title">Operational Client</h1>
        <form className="Login__form" noValidate autoComplete="off">
          <div className="Login__input-wrapper">
            <Input
              addonBefore="login"
              id="name"
              name="name"
              className="Login__input"
              value={name}
              onChange={this.handleChange}
              pattern="[:/\\@.;,$#!%^*()_={}[\]~'`+<>|№&?]"
            />
          </div>
          <div className="Login__input-wrapper">
            <Input
              addonBefore="password"
              id="password"
              className="Login__input"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}

            />
          </div>
          {error && <span className="Login__error">{error}</span>}
          <Button onClick={this.login} type="primary">
            Login
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user }: AppState) => ({
  name: user.name,
  error: user.loginError,
});

export default connect(mapStateToProps, { login })(Login);
