import React from 'react'
import { useEffect } from 'react'
import axiosInstance from '../axiosConfig'

const Profile = () => {

  useEffect(() => {
    axiosInstance.get('/')
  }, [])
  return (
    <div>Profile</div>
  )
}

export default Profile