import React, { Component } from 'react';
import './styles/Input.css';

class Input extends Component {

   state = { error: false };

   maxLengthHandler = ({ target }) => {
      let { maxLength } = this.props, { value } = target;
      if (value.length >= maxLength) {
         target.value = value.substring(0, maxLength - 1);
      };
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
                  onKeyDown={this.maxLengthHandler}
                  {...this.props}
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
      let { regex } = this.props;
      if (regex) {
         const input = document.querySelector(`input#${this.name}`), { value } = input;
         if (!regex.test(value)) {
            input.value = value.substring(0, value.length - 1);
         };
      };
   };

};

export default Input;
