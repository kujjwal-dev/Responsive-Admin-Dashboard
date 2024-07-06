import React from 'react'
import { CategoryTop, List } from '../../components'
import { Helmet } from 'react-helmet';

const CategoryScreen = () => {
  return (

    <div className='content-area'>
      <Helmet><title>Category</title></Helmet>
      <CategoryTop />
      <List />
    </div>
  )
}

export default CategoryScreen;