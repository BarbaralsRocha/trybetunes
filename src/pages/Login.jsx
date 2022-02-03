import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends React.Component {
  state = {
    loginName: '',
    getLogin: false,
    dissableButton: true,
    loading: false,
  };

  handleChange = ({ target }) => {
    const MIN_INPUT = 3;
    const { name, value } = target;
    this.setState({ [name]: value });
    if (value.length >= MIN_INPUT) {
      this.setState({ dissableButton: false });
    } else {
      this.setState({ dissableButton: true });
    }
  }

  buttonCLick = async () => {
    const { loginName, getLogin, loading } = this.state;
    this.setState({ loading: true });
    await createUser({ name: loginName });
    this.setState({
      getLogin: true,
      loading: false,
    });
  }

  render() {
    const { loginName, getLogin, dissableButton, loading } = this.state;
    if (loading) return <Loading />;
    if (getLogin) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="loginName"
            id="loginName"
            value={ loginName }
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ dissableButton }
          onClick={ this.buttonCLick }
        >
          Entrar
        </button>
      </div>
    );
  }
}
