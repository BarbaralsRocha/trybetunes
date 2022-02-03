import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends React.Component {
    state={
      loading: false,
      user: '',
    }

    async componentDidMount() {
      this.setState({ loading: true });
      const userLogin = await getUser();
      this.setState({
        loading: false,
        user: userLogin.name,
      });
    }

    render() {
      const { loading, user } = this.state;
      if (loading) return <Loading />;
      return (
        <header data-testid="header-component">
          <p data-testid="header-user-name">{user}</p>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link to="/album:id">Album</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
          <Link to="/profile/edit">ProfileEdit</Link>
        </header>
      );
    }
}
