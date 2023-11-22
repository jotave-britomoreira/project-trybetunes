import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.handleUser = this.handleUser.bind(this);

    this.state = {
      loginName: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    const user = await getUser();
    this.setState({ loginName: user.name }, () => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { loginName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        { isLoading ? <Loading /> : <p data-testid="header-user-name">{ loginName }</p> }
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}
