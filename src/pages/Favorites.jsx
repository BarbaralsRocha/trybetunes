import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Favorites extends React.Component {
  state ={
    loading: false,
    checked: true,
    favoriteTrack: [],
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const favoriteSong = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteTrack: favoriteSong,
    });
  }

  handleCheck = async (trackId) => {
    const { favoriteTrack, checked } = this.state;
    const music = favoriteTrack.find((track) => track.trackId === trackId);
    const newArr = favoriteTrack.filter((track) => track.trackId !== music.trackId);
    if (checked) {
      this.setState({
        loading: true,
      });
      await removeSong(music);
      this.setState({
        loading: false,
        favoriteTrack: newArr,
      });
    }
  }

  render() {
    const { loading, checked, favoriteTrack } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          {
            favoriteTrack.map((favorites) => (
              <div key={ favorites.trackId }>
                <MusicCard
                  trackName={ favorites.trackName }
                  previewUrl={ favorites.previewUrl }
                  trackId={ favorites.trackId }
                  song={ favorites }
                  value={ favorites.trackId }
                  onInputChange={ () => this.handleCheck(favorites.trackId) }
                  checked={ checked }
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
