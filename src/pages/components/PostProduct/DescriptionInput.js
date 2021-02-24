import React from 'react';
import { Input } from '..';
import './styles/DescriptionInput.css';

function DescriptionInput(props) {
   let { currentLength, maxLength, ...rest } = props;

   const maxLengthHandler = ({ target }) => {
      let { value } = target;
      if (value.length >= maxLength) {
         target.value = value.substring(0, maxLength);
      };
      props.onChange({target});
   };

   return (
      <Input {...rest}>
         <textarea
            id="ppp-description"
            name="description"
            errors={undefined}
            onChange={maxLengthHandler}
            // {...rest}
         />
         <p id="ml-indicator">
            {currentLength}/{maxLength}
         </p>
      </Input>
   );
};

export default DescriptionInput;
