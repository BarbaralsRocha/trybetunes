import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  state = {
    loading: true,
    musicList: [],
  }

  componentDidMount() {
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

  render() {
    const { loading, musicList } = this.state;
    console.log(musicList);
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
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
              />
            </div>
          ))
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
