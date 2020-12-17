import React, { Component } from 'react';
import { Uploader } from './components/';
import swal from '@sweetalert/with-react';
import shoplogohero from '../assets/ShopLogo/shoplogo-hero.svg';
import './styles/ShopLogo.css';

class ShopLogo extends Component {
   
   state = {};

   changeHandler = event => {
      this.setState({
         logo: event.target.files[0]
      })
   };

   submitHandler = event => {
      event.preventDefault();      
      const skipmsg = (
         <p>
            Pueden haber muchas tienda llamadas *shop*, el logo de tu tienda es irrelevante
            para que tus clientes la reconozcan.<br/>
            <span>
               ¿Estás segur@ que deseas continuar sin un logo?
            </span>
         </p>
      )
      
      swal({
         title: 'No cargaste un logo',
         icon: 'warning',
         content: skipmsg,
         dangerMode: true,
         buttons: ['No, déjame cargar uno', 'Si, Continuar']
      }).then(allowBlank => {
         if (allowBlank) {
            console.log('MAKE FETCH...');
         };
      });  
   };

   render() {
      return (
         <form id="shoplogo-form" encType="multipart/form-data" onSubmit={this.submitHandler}>
            <div id="shoplogo-header">
               <img src={shoplogohero} alt="shoplogo-hero"/>
               <h1>Selecciona un logo<br/>para tu tienda</h1>               
            </div>
            <div id="actions-btns">
               <Uploader onChange={this.changeHandler} isLoaded={this.state.logo || false}/>
               <div>
                  <button id="skip">
                     Omitir
                  </button>
                  <button id="continue">
                     Continuar
                  </button>
               </div>
            </div>
         </form>
      );
   };

};

export default ShopLogo;