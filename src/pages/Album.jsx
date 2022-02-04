import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Albuns</h1>
      </div>
    );
  }
}
