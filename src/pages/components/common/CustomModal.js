import React from 'react';
import swal from '@sweetalert/with-react';

/* This component isn't a react Component */

const CustomModal = (content, buttons, outsideClose=true) => (
   swal({
      icon: 'error',
      content: (
         <div className="swal-modal-text">
            {content}
         </div>
      ),
      buttons: buttons || ['No', 'Si'],
      dangerMode: true,
      closeOnClickOutside: outsideClose
   })
);

export default CustomModal;
