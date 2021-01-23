import React, { Component } from 'react';
import { RatingSelector, Input, CommentInput, ButtonLoader } from './components';
import api from '../utils/api';
import opsheader from '../assets/NewOpinion/users-opinions.svg';
import './styles/NewOpinion.css';

class NewOpinion extends Component {

   state = {
      data: {
         user: this.props.match.params['username'],
         rating: 10,
         client: '',
         email: '',
         comment: ''
      },
      loading: false,
      errors: {}
   };

   changeHandler = ({ target }) => {
      let { name, value } = target;
      if (name === 'clientname') {
         const regex = /(?!.*\s{2})^[a-zA-ZÀ-úñÑ\s]+$/
         if (!regex.test(value)) {
            target.value = value.substring(0, (value.length - 1));
         };
      };
      this.setState({
         data: {
            ...this.state.data,
            [name]: target.value
         }
      });
   };

   submitHandler = event => {
      event.preventDefault();
      this.setState({ loading: true });
      api.post('/opinions', this.state.data)
         .then(() => console.log('SUCCESS'))
         .catch(({ response }) => {
            this.setState({ errors: response.data });
         });
   };

   render() {
      return (
         <form id="opinion-form" onSubmit={this.submitHandler}>
            <div id="op-header">
               <figure>
                  <img src={opsheader} alt="opsheader-icon" />
               </figure>
               <h2>Opina sobre *shop*</h2>
               <p>Déjalo saber que piensas</p>
            </div>
            <h3>¿Cómo calificarías su servicio?</h3>
            <RatingSelector onChange={this.changeHandler} />
            <Input
               label="Tu nombre"
               name="client"
               errors={this.state.errors}
               onChange={this.changeHandler}
            />
            <Input
               label="Tu correo"
               name="email"
               type="email"
               errors={this.state.errors}
               onChange={this.changeHandler}
            />
            <CommentInput
               label="Tu opinión"
               name="comment"
               errors={this.state.errors}
               onChange={this.changeHandler}
            />
            <ButtonLoader isloading={this.state.loading} />
         </form>
      );
   };
};

export default NewOpinion;
