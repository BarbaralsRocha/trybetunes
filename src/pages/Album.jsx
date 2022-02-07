import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends React.Component {
  state = {
    loading: true,
    musicList: [],
    favorites: [],
  }

  async componentDidMount() {
    getFavoriteSongs().then((response) => {
      const favoritesId = response.map((id) => id.trackId);
      this.setState({
        favorites: favoritesId,
      });
    });
    this.listMusics();
  }

  listMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const list = await getMusics(id);
    this.setState({
      loading: false,
      musicList: list,
    });
  };

  handleCheck = async ({ target }) => {
    const { musicList, favorites } = this.state;
    const music = musicList.find((favorite) => favorite.trackId === +target.value);
    this.setState({
      loading: true,
    });
    if (!target.checked) {
      await removeSong(music);
      this.setState({
        favorites: favorites.filter((favorite) => favorite !== +target.value),
      });
    } else {
      await addSong(music);
      this.setState({
        favorites: [...favorites, +target.value],
      });
    }
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, musicList, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading ? <Loading />
            : (
              <div>
                <h1>Albuns</h1>
                <p data-testid="artist-name">
                  Artist Name:
                  {' '}
                  {musicList[1].artistName}
                </p>
                <p data-testid="album-name">
                  Collection Name:
                  {' '}
                  {musicList[1].collectionName}
                </p>
                {
                  musicList.slice(1).map((music) => (
                    <div key={ music.trackId }>
                      <MusicCard
                        trackName={ music.trackName }
                        previewUrl={ music.previewUrl }
                        trackId={ music.trackId }
                        song={ music }
                        value={ music.trackId }
                        onInputChange={ this.handleCheck }
                        checked={ favorites
                          .some((favorite) => favorite === music.trackId) }
                      />
                    </div>
                  ))
                }
              </div>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
