import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class ProfileEdit extends React.Component {
  state = {
    loading: false,
    name: '',
    email: '',
    description: '',
    image: '',
    saveProfile: false,
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      loading: false,
    });
    const { name, email, description, image } = user;
    this.setState({
      name,
      email,
      description,
      image,
    });
  }

  handleChange = async ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  buttonCLick = async () => {
    const { name, email, description, image } = this.state;
    const infos = { name, email, description, image };
    this.setState({ loading: true });
    await updateUser(infos);
    this.setState({ saveProfile: true, loading: false });
  }

  render() {
    const { loading, name, email, description, image, saveProfile } = this.state;
    const buttonValidate = () => {
      let dissableButton = true;
      const profile = [name, description, image];
      const validateButton = profile.every((perfil) => perfil.length !== 0);
      const re = /\S+@\S+\.\S+/;
      const validateEmail = re.test(email);
      if (validateButton && validateEmail) {
        dissableButton = false;
        return dissableButton;
      }
      return dissableButton;
    };
    if (loading) return <Loading />;
    if (saveProfile) return <Redirect to="/profile" />;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loading ? <Loading />
            : (
              <div>
                <h1>Editar Profile</h1>
                <label htmlFor="nome">
                  Nome:
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    name="name"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="email">
                  Email:
                  <input
                    data-testid="edit-input-email"
                    type="email"
                    name="email"
                    value={ email }
                    onChange={ this.handleChange }
                    required
                  />
                </label>
                <label htmlFor="descrição">
                  Descrição:
                  <input
                    data-testid="edit-input-description"
                    type="text"
                    name="description"
                    value={ description }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="imagem">
                  Imagem:
                  <input
                    data-testid="edit-input-image"
                    name="image"
                    onChange={ this.handleChange }
                    value={ image }
                    type="text"
                    required
                  />
                </label>
                <button
                  data-testid="edit-button-save"
                  type="button"
                  disabled={ buttonValidate() }
                  onClick={ this.buttonCLick }
                >
                  Salvar
                </button>
              </div>
            )
        }
      </div>
    );
  }
}
