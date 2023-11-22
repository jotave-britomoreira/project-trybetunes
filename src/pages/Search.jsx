import { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
    };
  }

  hadleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      artistName: value,
    });
  };

  render() {
    const { artistName } = this.state;
    const minName = 2;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        <form>
          <label htmlFor={ artistName }>
            <input
              type="text"
              name={ artistName }
              value={ artistName }
              placeholder="Nome do Artista"
              data-testid="search-artist-input"
              onChange={ this.hadleChange }
            />
          </label>

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artistName.length < minName }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
