import React from 'react'
import { ParentTop, ParentTable } from "../../components"
import { Helmet } from 'react-helmet';

const ParentScreen = () => {
  return (
    <div className='content-area'>
      <Helmet><title>Parent</title></Helmet>
      <ParentTop/>
      <ParentTable/>
    </div>
  )
}

export default ParentScreen;