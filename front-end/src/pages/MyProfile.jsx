import React from 'react'
import Profile from '../components/Profile'
import { useOutletContext } from "react-router-dom";
export default function MyProfile() {

  const [profile] = useOutletContext()
  console.log(profile);
  return (
    <div>
      <Profile props={profile}/>
      </div>
  )
}
