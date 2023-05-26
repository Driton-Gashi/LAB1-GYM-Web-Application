import React, { useEffect, useRef, useState } from 'react';

export default function ShopNProgram() {
  const contentRef = useRef(null);
  const contentRef2= useRef(null);

  const[element,setElement] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {

      const entry = entries[0];
      setElement(entry.isIntersecting);
      console.log(entry.isVisible)
    },
    {
      threshold:0.99,
    }
    );
    observer.observe(contentRef.current);
  
    const programObserver = new IntersectionObserver(() => {
      
      setElement(!element);
    }, {
      threshold: 0.99,
    });
    programObserver.observe(contentRef2.current);

  }, []);
  console.log("element", element)
  return (
    <section  className='SNP-container'>
      <div ref={contentRef} className={`split-content ${element ? 'stick' : ''}`}>lmao</div>
      <span  className='shopping-content'></span>
      <span  className='program-content'>
        <div ref={contentRef2} className='end-stick'></div>
      </span>
    </section>
  );
}
