import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      album: [],
      infos: {},
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  async fetchMusic() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);

    this.setState({
      album: musics.slice(1),
      infos: musics[0],
    });
  }

  render() {
    const { album, infos } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{ infos.artistName }</h2>
          <h3 data-testid="album-name">{ infos.collectionName }</h3>
        </div>
        {album.map((music) => (<MusicCard
          key={ music.trackId }
          trackId={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
        />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
