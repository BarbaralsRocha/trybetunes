import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="name"
            id="name"
            data-testid="login-name-input"
          />
        </label>
        <button type="button" data-testid="login-submit-button">Entrar</button>
      </div>
    );
  }
}
