import React, { Component } from 'react';
import { Input } from '../';
import { logupContext } from '../../Logup';

class LogupInput extends Component {

   static contextType = logupContext;

   render = () => (
      <Input
         changeHandler={this.context.changeHandler}
         errors={this.context.errors}
         maxLength={this.props.maxLength}
         {...this.props}
      />
   );
   
};

export default LogupInput;
