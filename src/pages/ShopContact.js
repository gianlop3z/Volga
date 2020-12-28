import React, { Component, Fragment } from 'react';
import { NavBar, SocialNetLink, Footer } from './components';
import './styles/ShopContact.css';

class ShopContact extends Component {
   render() {
      return (
         <Fragment>
            <NavBar/>
            <div id="contact-form">
               <h2>
                  ¿Por donde deseas contactar con *shop*?
               </h2>
               <div id="contact-ways">
                  <SocialNetLink for="instagram"/>
                  <SocialNetLink for="facebook"/>
                  <SocialNetLink for="whatsapp"/>
                  <SocialNetLink for="twitter"/>
                  <SocialNetLink for="email"/>
               </div>
            </div>
            <Footer/>
         </Fragment>
      );
   };
};

export default ShopContact;