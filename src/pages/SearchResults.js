import React, { Component, Fragment } from 'react';
import { FilterSelector, UserProduct, UserCard, CustomMessage } from './components';
import loupeicon from '../assets/SearchResults/loupe-icon.svg';
import './styles/SearchResults.css';
import api from '../utils/api';

class SearchResult extends Component {

   state = { filter: 'products' };

   getQuery = () => {
      let { state } = this.props.location;
      return state ? state.query : '';
   };

   loadRequest = () => {
      let query = this.getQuery(), { filter, results } = this.state;
      if (results ? !results[filter] : true) {
         api.get('/get-data/search', { query, filter }, false)
            .then(({ data }) => 
               this.setState({
                  results: { ...results, [filter]: data ? data : [] }, query }));
      };
   };

   filterChangeHandler = filter => {
      if (filter !== this.state.filter) {
         this.setState({ filter }, this.loadRequest);
      };
   };

   render() {
      let { filter, query, results } = this.state,
      items = results ? filter in results ? results[filter] : [] : {};
      return (
         <div id="search-results-page">
            {query ?
               <Fragment>
                  <div id="srp-header">
                     <h2>Resultados para "{query}"</h2>
                     <FilterSelector onChange={this.filterChangeHandler} />
                     <h4>Encontrados: {items.length}</h4>
                  </div>
                  <div id="srp-results">
                     {items.length ?
                        items.map((item, index) =>
                           filter === 'products' ?
                              <UserProduct data={item} key={index} /> :
                              <UserCard data={item} key={index} />) :
                        <p id="blank-results">
                           No se ha encontrado un producto
                           que coincida con tu consulta.
                        </p>}
                  </div>
               </Fragment> :
               <CustomMessage
                  msgimage={loupeicon}
                  message="Realiza una consulta para ver los resultados."
               />}
         </div>
      );
   };

   componentDidMount() {
      document.title = 'Volga - Resultados';
      if (this.getQuery()) {
         this.loadRequest();
      };
   };

   componentDidUpdate() {
      let propQuery = this.getQuery();
      if (this.state.query !== propQuery) {
         this.setState({ results: {}, query: propQuery }, this.loadRequest);
      };
   };

};

export default SearchResult;
