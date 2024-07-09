import React from 'react'
import { CategoryTop, List } from '../../components'
import { Helmet } from 'react-helmet';
import CategoryProvider from '../../context/CategoryContext'

const CategoryScreen = () => {
  return (

    <div className='content-area'>
      <Helmet><title>Category</title></Helmet>
      <CategoryTop />
      <CategoryProvider>
      <List />
      </CategoryProvider>
    </div>
  )
}

export default CategoryScreen;