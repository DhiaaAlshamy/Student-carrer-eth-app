import React from 'react'
import Profile from '../components/Profile'
const profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'User',
    publicAddress: '0x1234567890ABCDEF'
  };
export default function MyProfile() {
  return (
    <div><Profile props={profile}/></div>
  )
}
