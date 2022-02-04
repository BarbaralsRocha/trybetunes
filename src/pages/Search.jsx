import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends React.Component {
  state = {
    search: '',
    dissableButton: true,
    loading: false,
    artist: '',
    albuns: [],
  };

   handleChange = ({ target }) => {
     const MIN_SEARCH = 2;
     const { name, value } = target;
     this.setState({ [name]: value });
     if (value.length >= MIN_SEARCH) {
       this.setState({ dissableButton: false });
     } else {
       this.setState({ dissableButton: true });
     }
   }

   buttonClick = async () => {
     const { search } = this.state;
     this.setState({
       loading: true,
     });
     const albunsSearch = await searchAlbumsAPIs(search);
     console.log(albunsSearch);
     this.setState({
       artist: search,
       search: '',
       loading: false,
       albuns: albunsSearch,
     });
   }

   render() {
     const { search, dissableButton, loading, artist, albuns } = this.state;
     if (loading) return <Loading />;
     return (
       <div data-testid="page-search">
         <Header />
         <div><p>Search</p></div>
         <input
           type="text"
           name="search"
           id="search"
           value={ search }
           onChange={ this.handleChange }
           data-testid="search-artist-input"
         />
         <button
           type="button"
           disabled={ dissableButton }
           onClick={ this.buttonClick }
           data-testid="search-artist-button"
         >
           Procurar
         </button>
         <p>
           Resultado de álbuns de:
           {' '}
           { artist }
         </p>

         {
           albuns.length !== 0 ? albuns.map((album) => (
             <div
               key={ album.collectionId }
             >
               <p>{album.artistName}</p>
               <img src={ album.artworkUrl100 } alt={ album.artistName } />
               <Link
                 data-testid={ `link-to-album-${album.collectionId}` }
                 to={ `/album/${album.collectionId}` }
               >
                 {album.collectionName}
               </Link>
             </div>
           )) : <p>Nenhum álbum foi encontrado</p>
         }

       </div>
     );
   }
}
