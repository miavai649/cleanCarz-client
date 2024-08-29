import CForm from '../../components/form/CForm'
import CInput from '../../components/form/CInput'
import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react'
import { Controller, FieldValues, SubmitHandler } from 'react-hook-form'
import { Button, Form, Input, Modal } from 'antd'
import { zodResolver } from '@hookform/resolvers/zod'
import addServiceSchema from '../../schemas/service.schema'
import { useAddServiceMutation } from '../../redux/features/service/serviceApi'
import { toast } from 'sonner'
import { TResponse, TService } from '../../types'

const AddServiceModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [addService] = useAddServiceMutation()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'imageUpload')
    formData.append('cloud_name', 'dupg5agtg')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dupg5agtg/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )
      const data = await response.json()
      return data.secure_url
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true)
    let uploadedImageUrl = null

    if (data.image instanceof File) {
      uploadedImageUrl = await uploadImageToCloudinary(data.image)
    }

    if (uploadedImageUrl) {
      const serviceData = {
        ...data,
        price: Number(data.price),
        duration: Number(data.duration),
        image: uploadedImageUrl
      }

      try {
        const res = (await addService(serviceData)) as TResponse<TService>

        if (res.error) {
          toast.error('Failed to create service', {
            duration: 2000
          })
        } else {
          toast.success('Service created successfully', {
            duration: 2000
          })
        }
      } catch (error) {
        toast.error('Something went wrong')
      }
    }

    setLoading(false)
    handleOk()
  }

  return (
    <>
      <Button
        onClick={showModal}
        style={{
          backgroundColor: '#56A7DC', // Primary color
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          padding: '0.5rem 1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease, transform 0.2s ease'
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = '#4691C7')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = '#56A7DC')
        }
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
        <FaPlus className='mr-1' style={{ marginRight: '8px' }} />
        Add Service
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CForm onSubmit={onSubmit} resolver={zodResolver(addServiceSchema)}>
          <CInput name='name' type='text' label='Name' />
          <CInput name='description' type='text' label='Description' />
          <CInput name='price' type='number' label='Price' />
          <CInput name='duration' type='number' label='Duration' />
          <Controller
            name='image'
            render={({ field: { onChange, value, ...field } }) => (
              <Form.Item label={'Image'}>
                <Input
                  type='file'
                  size='large'
                  {...field}
                  onChange={(e) => onChange(e?.target?.files?.[0])}
                />
              </Form.Item>
            )}
          />
          <Button
            style={{ background: '#56A7DC', color: 'white' }}
            htmlType='submit'
            loading={loading}>
            Submit
          </Button>
        </CForm>
      </Modal>
    </>
  )
}

export default AddServiceModal
