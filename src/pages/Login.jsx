import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      loading: false,
      logged: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ loginName: value }, this.enableButton);
  };

  hadleClick = async () => {
    const { loginName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: loginName });
    this.setState({
      loading: false,
      logged: true,
    });
  };

  render() {
    const { loginName, loading, logged } = this.state;
    const minName = 3;
    return (
      <div data-testid="page-login">
        { loading ? (
          <Loading />
        ) : (
          <form>
            <label htmlFor="loginName">
              <input
                type="text"
                name="loginName"
                placeholder="NOME"
                value={ loginName }
                onChange={ this.handleChange }
                data-testid="login-name-input"
              />
            </label>

            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ loginName.length < minName }
              onClick={ this.hadleClick }
            >
              Entrar
            </button>
          </form>)}
        { logged && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
