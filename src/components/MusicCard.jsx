import { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      favoriteSong: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false });
    const { trackId } = this.props;
    const isFavorite = favoriteSongs.some((song) => song.trackId === trackId);
    this.setState({ favoriteSong: isFavorite });
  }

  handleCheckboxChange = async () => {
    const { trackId } = this.props;
    this.setState({ loading: true });
    await addSong(trackId);
    this.setState((prevState) => ({ favoriteSong: !prevState.favoriteSong }));
    this.setState({ loading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favoriteSong } = this.state;
    return (
      <>
        <p>{ trackName }</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita:
          <input
            type="checkbox"
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleCheckboxChange }
            disabled={ loading }
            checked={ favoriteSong }
          />
        </label>
        {loading && <Loading />}
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
