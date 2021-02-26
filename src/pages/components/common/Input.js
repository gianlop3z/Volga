import React, { Component } from 'react';
import './styles/Input.css';

class Input extends Component {

   state = { error: false };

   entryValidation = event => {
      let { maxLength, regex } = this.props, { value } = event.target;
      if (value.length > maxLength) {
         event.target.value = value.substring(0, maxLength);
      };
      if (regex && !regex.test(value)) {
         event.target.value = value.substring(0, value.length - 1);
      };
      this.props.onChange(event);
   };

   render() {
      const { name, type, label, allowblank, errors, children } = this.props;
      this.name = name; this.errors = errors || {};
      return (
         <div className={`input-wrapper ${name}`}>
            <label htmlFor={name}>
               {label}: {!allowblank && <span>*</span>}
            </label>
            {children ? children : (
               <input
                  type={type || 'text'}
                  id={name}
                  autoComplete="off"
                  spellCheck="false"
                  {...this.props}
                  onChange={this.entryValidation}
                  errors={undefined}
               />
            )}
            {this.state.error && (
               <span className={`${name}-error`}>
                  { errors[name]}
               </span>
            )}
         </div>
      );
   };

   componentDidUpdate() {
      let gotError = this.errors[this.name] || false;
      if (gotError && !this.state.error) {
         this.setState({ error: true });
         setTimeout(() => {
            document.querySelector(`.${this.name}-error`)
               .style.transform = 'initial';
         }, 1);
      } else if (!gotError && this.state.error) {
         this.setState({ error: false });
      };
   };

};

export default Input;
