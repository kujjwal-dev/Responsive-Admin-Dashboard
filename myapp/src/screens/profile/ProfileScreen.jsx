import React from 'react'
import { ProfileTop, AdminForm, AdminTable, ModeratorForm, ModeratorTable } from "../../components"
import { Helmet } from 'react-helmet';
import ProfileProvider from '../../context/ProfileContext'

const ProfileScreen = () => {
  return (
    <div className='content-area'>
      <Helmet><title>Profile</title></Helmet>
      <ProfileTop />
      <ProfileProvider>
        <AdminForm />
        <AdminTable />
        <ModeratorForm />
        <ModeratorTable />
      </ProfileProvider>
    </div>
  )
}

export default ProfileScreen