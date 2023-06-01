import React, { useEffect, useRef } from 'react';

export default function ShopNProgram() {
  const contentRef = useRef(null);
  const contentRef2= useRef(null);
  const contentRef3= useRef(null);

 
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === contentRef.current) {
          if (entry.isIntersecting) {
            contentRef.current.classList.add('stick');
            contentRef.current.classList.remove('is-bottom');
          } else {
            contentRef.current.classList.remove('stick');
          }
        } else if (entry.target === contentRef2.current) {
          if (entry.isIntersecting) {
            contentRef.current.classList.remove('stick');
            contentRef.current.classList.add('is-bottom');
          } else {
            contentRef.current.classList.remove('is-bottom');
          }
        }else if(entry.target === contentRef3.current){
          contentRef.current.classList.remove('stick');
        }
      });
    }, {
      threshold: 0.99
    });
    
    observer.observe(contentRef.current);
    observer.observe(contentRef2.current);
    observer.observe(contentRef3.current)
    
  
  

  }, []);
 
  return (
    <>
    <div ref={contentRef3} className="test"></div>
    <section  className='SNP-container'>
      <div ref={contentRef} className={'split-content'}>lmao</div>
      <span  className='shopping-content'></span>
      <span  className='program-content'>
        <div ref={contentRef2} className='end-stick'></div>
      </span>
    </section>
    </>
  );
}
