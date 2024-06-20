import React from 'react'
import { ProfileTop, AdminForm, AdminTable, ModeratorForm, ModeratorTable} from "../../components"

const ProfileScreen = () => {
  return (
    <div className='content-area'>
      <ProfileTop/>
      <AdminForm/>
      <AdminTable/>
      <ModeratorForm/>
      <ModeratorTable/>
    </div>
  )
}

export default ProfileScreen