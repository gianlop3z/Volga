import React, { Component, createContext } from 'react';
import { ContactNetworkInput, ButtonLoader,
         UserPageExists, ModalDisplayer } from './components';
import api from '../utils/api';
import { noBlankValidator } from '../utils/validators'
import './styles/ContactNetworks.css';

export const CNcontext = createContext({});

class ContactNetworks extends Component {

   state = {
      username: this.props.match.params['username'],
      data: {
         instagram: '', facebook: '',
         whatsapp: '', twitter: '',
         email: '', linkedin: ''
      },
      loading: false,
      errors: {}
   };

   changeHandler = ({ target }) => {
      this.setState({
         data: {
            ...this.state.data,
            [target.name]: target.value
         }
      });
   };

   fetchRequest = ({ data, nextpath }) => {
      api.post('/contact', data)
         .then(() => this.props.history.push(nextpath))
         .catch(errors => {
            this.setState({ loading: false });
            let { response, message } = errors;
            if (message === 'Network Error') {
               ModalDisplayer({ type: 'NETWORK_ERROR' });
            } else {
               if (response.status === 409) {
                  ModalDisplayer({
                     type: 'CUSTOM', title: 'Error en la petición', 
                     message: response.data.user
                  }).then(cont => cont && this.props.history.push(nextpath));
               } else {
                  this.setState({ errors: response.data });
               };            
            };
         });
   };

   submitHandler = event => {
      event.preventDefault();
      let { isValid } = noBlankValidator(this.state.data);
      let { username, data } = this.state,
      nextpath = {
         pathname: `/${username}/profile-picture`,
         state: { exists: true }};
      if (isValid) {
         this.setState({ loading: true }, () =>
            this.fetchRequest({ data, nextpath }));
      } else {
         ModalDisplayer({
            type: 'CUSTOM',
            title: `Estas redes facilitan el contacto entre tú y tus clientes. 
                    Recomendamos que llenes las que te sugerimos.`,
            message: '¿Deseas continuar así?'
         }).then(cont => cont && this.fetchRequest({ data, nextpath }))
      };
   };

   keyDownHandler = event => event.keyCode === 13 && event.preventDefault();

   render() {
      let contextContent = {
         changeHandler: this.changeHandler,
         errors: this.state.errors
      };
      return (
         <UserPageExists>
            <form id="contact-networks-form" onSubmit={this.submitHandler}
               onKeyDown={this.keyDownHandler}>
               <h2>
                  Redes para el contacto<br/>con tus clientes
               </h2>
               <CNcontext.Provider value={contextContent}>
                  <ContactNetworkInput
                     name="instagram"
                     maxLength="30"
                  />
                  <ContactNetworkInput
                     name="facebook"
                     maxLength="50"
                  />
                  <ContactNetworkInput
                     name="whatsapp"
                     maxLength="15"
                  />
                  <ContactNetworkInput
                     name="twitter"
                     maxLength="15"
                  />
                  <ContactNetworkInput
                     name="email"
                     maxLength="100"
                     type="email"
                  />
                  <ContactNetworkInput
                     name="linkedin"
                     maxLength="30"
                  />
               </CNcontext.Provider>
               <ButtonLoader isloading={this.state.loading}/>
            </form>
         </UserPageExists>
      );
   };

   componentDidMount() {
      document.title = `${this.state.username} - Redes de contacto`;
   };
};

export default ContactNetworks;

/* REVISADO Y NO HAY MÁS QUE RESUMIR: 27/02/2021 */