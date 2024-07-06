import React from 'react'
import { ProfileTop, AdminForm, AdminTable, ModeratorForm, ModeratorTable} from "../../components"
import { Helmet } from 'react-helmet';

const ProfileScreen = () => {
  return (
    <div className='content-area'>
        <Helmet><title>Profile</title></Helmet>
      <ProfileTop/>
      <AdminForm/>
      <AdminTable/>
      <ModeratorForm/>
      <ModeratorTable/>
    </div>
  )
}

export default ProfileScreen