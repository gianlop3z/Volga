import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ibtnsicons } from '../../../assets/'
import './ShopProduct.css';

class ShopProduct extends Component {
   
   InteractionButton = props => {
      return (
         <Link>
            <img
               src={ibtnsicons[props.type]}
               alt={`${props.type}-icon`}
            />
         </Link>
      );
   };
   
   render() {
      return (
         <div className={`product ${this.props.shop}-product`}>
            <div className="shop">
            <img className="logo" src="https://i.pinimg.com/originals/77/b6/6f/77b66fa7469f75773d5eb443056f2f8f.jpg" alt="shop-logo"/>
               <div className="info">
                  <h2>ovotheshop</h2>
                  <span>Drake lorem lorem</span>
               </div>
            </div>
            <figure>
               <img src="https://magic-custom.com/8693-large_default/ovo-hoodie-black-original-owl-by-drake.jpg" alt="here goes the product formated name"/>
            </figure>
            <div className="product-footer">
               <p className="product-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum maxime illum. Possimus, debi
               </p>
               <this.InteractionButton type="fav"/>
               <this.InteractionButton type="wishlist"/>
               <this.InteractionButton type="askforprice"/>      
            </div>
         </div>
      );
   };
};

export default ShopProduct;
