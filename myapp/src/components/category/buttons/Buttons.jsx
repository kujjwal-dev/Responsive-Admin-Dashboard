import React, { useContext } from 'react'
import Content from './Content';
import DisplayContent from './displaycontent/DisplayContent';
import { CategoryContext } from '../../../context/CategoryContext';
import { ContentProvider } from '../../../context/ContentContext';

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
          
          <br />
          <br />
          <ContentProvider>
          <DisplayContent />
          </ContentProvider>
        </div>
      )}

    </>
  )
}

export default Buttons
