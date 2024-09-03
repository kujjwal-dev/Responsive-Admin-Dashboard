// src/components/Category/Category.js
import React from 'react';
import "./List.scss";
import Buttons from './buttons/Buttons';
import FirstSection from './firstsection/FirstSection';
import SecondSection from './secondsection/SecondSection';
import ThirdSection from './thirdsection/ThirdSection';

function Category() {
  return (
    <>
      <section className='content-category'>
      <div style={{ width: '60%',  margin: '0 auto' }}>
        <FirstSection />
        </div>
        <div style={{ width: '60%', margin: '0 auto' }}>
        <SecondSection />
        </div>
        <div style={{ width: '60%', margin: '0 auto' }}>
        <ThirdSection />
        </div>
        <div style={{ width: '120%', maxWidth: '1200px', marginRight: '120px', paddingRight: '120px' }}>
          <Buttons />
        </div>
      </section>
    </>
  )
}

export default Category;
