import React, { useState } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Avatar, Button, Modal, Upload, UploadProps } from 'antd'
import {
  useGetMeQuery,
  useUpdateUserMutation
} from '../../redux/features/auth/authApi'
import 'antd/dist/reset.css'
import CForm from '../../components/form/CForm'
import CInput from '../../components/form/CInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserSchema } from '../../schemas/auth.schema'
import { toast } from 'sonner'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import Spinner from '../../components/spinner/Spinner'
import { TResponse, TUser } from '../../types'

const UploadImage: React.FC<{
  isUploading: boolean
  isEditing: boolean
  onImageUpload: (url: string) => void
  setUploading: (uploading: boolean) => void
}> = ({ onImageUpload, setUploading, isUploading, isEditing }) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [previewTitle, setPreviewTitle] = useState<string>('')

  const handleCancel = () => setPreviewVisible(false)

  const handlePreview = async (file: any) => {
    setPreviewImage(file.url || file.thumbUrl)
    setPreviewVisible(true)
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    )
  }

  const props: UploadProps = {
    name: 'image',
    action: `https://api.imgbb.com/1/upload?key=5fb7c3dc38b2a1a41a17cd76e06ddcdc`,
    beforeUpload(_file, _fileList) {
      return true
    },
    onChange(info) {
      if (info.file.status === 'uploading') {
        setUploading(true)
      }
      if (info.file.status === 'done') {
        toast.success(`${info.file.name} file uploaded successfully`)
        onImageUpload(info.file.response.data.url)
        setUploading(false)
      } else if (info.file.status === 'error') {
        toast.error(`${info.file.name} file upload failed.`)
        setUploading(false)
      }
    },
    onPreview: handlePreview,
    maxCount: 1,
    listType: 'picture-card'
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8, color: '#418FC8' }}>Upload</div>
    </button>
  )

  return (
    <>
      <Upload {...props} listType='picture-circle' disabled={!isEditing}>
        {uploadButton}
      </Upload>
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img alt='preview' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string>('')

  // Function to toggle editing mode
  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const { data: userData, isLoading } = useGetMeQuery({})

  const [updateUser] = useUpdateUserMutation()

  // Submit handler for form submission (update profile)
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Updating...')
    const updateUserData = {
      id: userData?.data?._id,
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        image: uploadedImageUrls
      }
    }

    try {
      const res = (await updateUser(
        updateUserData
      ).unwrap()) as TResponse<TUser>

      if (res.error) {
        toast.error('Failed to update user', { id: toastId, duration: 2000 })
      } else {
        toast.success('User updated successfully', {
          id: toastId,
          duration: 2000
        })
        setIsEditing(false)
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 })
    }
  }

  const handleImageUpload = (url: string) => {
    setUploadedImageUrls(url)
  }

  const defaultValues = {
    name: userData?.data?.name,
    email: userData?.data?.email,
    phone: userData?.data?.phone,
    address: userData?.data?.address
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-6'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl'>
        <div className='mt-4 flex justify-end space-x-4'>
          <Button
            type='default'
            onClick={toggleEdit}
            className={`px-6 py-2 rounded-md text-white ${
              isEditing ? 'bg-red-500' : 'bg-primary-500'
            }`}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
        <div className='flex flex-col items-center mb-8'>
          <div className='relative'>
            <Avatar
              size={100}
              src={userData?.data?.image}
              alt={userData?.data?.name}
              style={{
                backgroundColor: '#418FC8',
                verticalAlign: 'middle'
              }}>
              {!userData?.data?.image && (
                <span
                  style={{
                    fontSize: '3rem',
                    lineHeight: '100px',
                    fontWeight: 'bold'
                  }}>
                  {userData?.data?.name?.charAt(0)}
                </span>
              )}
            </Avatar>
          </div>
        </div>

        {/* Profile Image Upload */}
        <div className='mb-8'>
          <label className='block text-base font-medium text-gray-700 mb-4 text-center'>
            Change Profile Image
          </label>
          <div className='flex justify-center'>
            <UploadImage
              isEditing={isEditing}
              isUploading={isUploading}
              onImageUpload={handleImageUpload}
              setUploading={setIsUploading}
            />
          </div>
        </div>

        {isLoading ? (
          <Spinner styling='h-screen' />
        ) : (
          <>
            <CForm
              onSubmit={onSubmit}
              resolver={zodResolver(updateUserSchema)}
              defaultValues={defaultValues}>
              <CInput
                name='name'
                type='text'
                label='Full Name'
                disabled={!isEditing}
                style={
                  !isEditing
                    ? {
                        backgroundColor: '#f0f0f0',
                        color: '#333',
                        border: '1px solid #d1d5db'
                      }
                    : {}
                }
              />
              <CInput
                name='email'
                type='email'
                label='Email'
                disabled={true}
                style={{
                  backgroundColor: '#f0f0f0',
                  color: '#333',
                  border: '1px solid #d1d5db'
                }}
              />
              <CInput
                name='phone'
                type='text'
                label='Phone Number'
                disabled={!isEditing}
                style={
                  !isEditing
                    ? {
                        backgroundColor: '#f0f0f0',
                        color: '#333',
                        border: '1px solid #d1d5db'
                      }
                    : {}
                }
              />
              <CInput
                name='address'
                type='text'
                label='Address'
                disabled={!isEditing}
                style={
                  !isEditing
                    ? {
                        backgroundColor: '#f0f0f0',
                        color: '#333',
                        border: '1px solid #d1d5db'
                      }
                    : {}
                }
              />
              <Button
                disabled={isUploading || !isEditing}
                htmlType='submit'
                className='px-6 py-2 rounded-md text-white bg-primary-500'>
                Update Profile
              </Button>
            </CForm>
          </>
        )}
      </div>
    </div>
  )
}

export default MyProfile
