import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCards extends React.Component {
    state ={
      loading: false,
      checked: false,
    }

    async componentDidMount() {
      const { trackId } = this.props;
      const favoriteSong = await getFavoriteSongs();
      const favoriteChecked = favoriteSong.find((favorite) => (
        favorite.trackId === trackId
      ));
      if (favoriteChecked) {
        this.setState({ checked: true });
      }
    }

    handleChange = async ({ target }) => {
      const { song } = this.props;
      this.setState({
        loading: true,
        checked: true,
      });
      await addSong(song);
      this.setState({
        loading: false,
      });
    }

    render() {
      const { trackName, previewUrl, trackId } = this.props;
      const { loading, checked } = this.state;
      if (loading) return <Loading />;
      return (
        <div>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorites">
            Favorita
            <input
              type="checkbox"
              name={ trackId }
              onChange={ this.handleChange }
              checked={ checked }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </div>
      );
    }
}

MusicCards.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.string.isRequired,
};
