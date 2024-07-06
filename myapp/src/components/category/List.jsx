import React from 'react'
import "./List.scss";
import Buttons from './buttons/Buttons'
import FirstSection from './firstsection/FirstSection';
import SecondSection from './secondsection/SecondSection';
import ThirdSection from './thirdsection/ThirdSection';



function Category() {
  return (
    <>
      <section className='content-category'>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <Buttons />
      </section>
    </>
  )
}

export default Category