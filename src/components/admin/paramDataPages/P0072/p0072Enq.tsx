import React, { forwardRef, useEffect, useState } from 'react'
import CustomModal from '../../../../utilities/modal/CustomModal';

const P0072Enq = forwardRef(({open, handleClose}: any) => {
    const [htmlContent, setHtmlContent] = useState('');
    const getHTML =()=>{
      fetch(`/p0072.html`)

      .then(response => response.text())
      .then(content => setHtmlContent(content))
      .catch(error => console.error('Error fetching HTML file:', error));
  }

  useEffect(() => {
    getHTML();
    return () => {}
  }, [])
  
  return (
    <div>
        <CustomModal open={open} handleClose={handleClose}>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </CustomModal>
    </div>
  )
});


export default P0072Enq;
