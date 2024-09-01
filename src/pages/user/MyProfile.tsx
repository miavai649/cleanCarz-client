import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input } from 'antd'
import { useGetMeQuery } from '../../redux/features/auth/authApi'
import 'antd/dist/reset.css' // Reset Ant Design CSS for custom styles
import CForm from '../../components/form/CForm'
import CInput from '../../components/form/CInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from '../../schemas/auth.schema'

const MyProfile = () => {
  const { data: userData } = useGetMeQuery({})
  const [isEditing, setIsEditing] = useState(false)

  // Function to toggle editing mode
  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  // Submit handler for form submission (update profile)
  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    console.log('Updated Profile Data:', formData)
    // Handle the update logic here (e.g., API call to update user data)
  }

  return (
    <div className=' bg-gray-100 flex items-center justify-center p-6'>
      <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-xl'>
        {/* <div className='flex justify-center mb-4'>
          <div className='h-12 w-12 rounded-full bg-primary-500 text-white flex items-center justify-center text-xl font-bold'>
            {userData?.data?.name?.charAt(0)}
          </div>
        </div> */}
        <h1 className='text-xl font-bold text-primary-500 text-center mb-4'>
          My Profile
        </h1>

        {/* my profile details */}
        {/* <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-gray-700 font-medium mb-1'>Name</label>
            <Input
              {...register('name')}
              defaultValue={userData?.data?.name}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Email
            </label>
            <Input
              {...register('email')}
              defaultValue={userData?.data?.email}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Phone
            </label>
            <Input
              {...register('phone')}
              defaultValue={userData?.data?.phone}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Address
            </label>
            <Input
              {...register('address')}
              defaultValue={userData?.data?.address}
              disabled={!isEditing}
            />
          </div>

          <div className='flex justify-between items-center mt-4'>
            <Button
              type='default'
              onClick={toggleEdit}
              className={`transition duration-300 ${
                isEditing ? 'bg-secondary-500' : 'bg-primary-500'
              }`}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>

            {isEditing && (
              <Button
                type='primary'
                htmlType='submit'
                className='bg-secondary-500 text-white'>
                Update Profile
              </Button>
            )}
          </div>
        </form> */}

        <CForm onSubmit={onSubmit} resolver={zodResolver(signUpSchema)}>
          <CInput name='name' type='text' label='Full Name' />
          <CInput name='email' type='email' label='Email' />
          <CInput name='phone' type='text' label='Phone Number' />
          <CInput name='address' type='text' label='Address' />
          <Button
            // loading={isLoading}
            htmlType='submit'
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: 600,
              padding: '20px 0px',
              borderRadius: '0.375rem',
              backgroundColor: '#418FC8',
              color: 'white',
              outline: 'none',
              marginTop: '0.25rem',
              marginBottom: '0.25rem'
            }}>
            Register
          </Button>
        </CForm>
      </div>
    </div>
  )
}

export default MyProfile
