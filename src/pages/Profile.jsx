import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  state = {
    loading: true,
    userLogin: {},
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      loading: false,
      userLogin: user,
    });
  }

  render() {
    const { loading, userLogin } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading />
            : (
              <div>
                <h1>Profile</h1>
                <img
                  data-testid="profile-image"
                  src={ userLogin.image }
                  alt={ userLogin.name }
                />
                <p>Nome:</p>
                <p>{userLogin.name }</p>
                <p>Email:</p>
                <p>{userLogin.email}</p>
                <p>Descrição:</p>
                <p>{userLogin.description}</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )
        }
      </div>
    );
  }
}
