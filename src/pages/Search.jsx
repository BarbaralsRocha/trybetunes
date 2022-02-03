import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  state = {
    search: '',
    dissableButton: true,
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

   render() {
     const { search, dissableButton } = this.state;
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
           data-testid="search-artist-button"
         >
           Procurar
         </button>
       </div>
     );
   }
}
