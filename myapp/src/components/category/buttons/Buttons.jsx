import React, { useContext } from 'react'
import Audio from './Audio'
import Video from './Video'
import DisplayContent from './displaycontent/DisplayContent';
import { CategoryContext } from '../../../context/CategoryContext';

const Buttons = () => {

  const { selectedSeries } = useContext(CategoryContext);

  return (
    <>
      {selectedSeries && (
        <div className='grid gap-5'>
        <h2 style={{ backgroundColor: '#475be8', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
          Add Content in {selectedSeries.series}
          </h2>
          <br />
          <Audio />
          <br />
          <Video />
          <br/>
          <DisplayContent/>
        </div>
      )}

    </>
  )
}

export default Buttons
