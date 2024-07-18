import React, { useContext } from 'react'
import Content from './Content';
import DisplayContent from './displaycontent/DisplayContent';
import { CategoryContext } from '../../../context/CategoryContext';

const Buttons = () => {

  const { selectedSeries } = useContext(CategoryContext);

  return (
    <>
      {selectedSeries && (
        <div className='grid gap-5'>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h2 style={{ backgroundColor: '#475be8', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center', width: '50%' }}>
              Add Content in {selectedSeries.series}
            </h2>
          </div>

          <br />
          <br />
          <Content />
          <br />
          <br />
          <DisplayContent />
        </div>
      )}

    </>
  )
}

export default Buttons
