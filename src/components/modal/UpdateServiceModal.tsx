import CForm from '../../components/form/CForm'
import CInput from '../../components/form/CInput'
import { useState } from 'react'
import { Controller, FieldValues, SubmitHandler } from 'react-hook-form'
import { Button, Form, Input, Modal } from 'antd'
import {
  useGetServiceQuery,
  useUpdateServiceMutation
} from '../../redux/features/service/serviceApi'
import { TResponse, TService } from '../../types'
import { toast } from 'sonner'
import CTextArea from '../form/CTextArea'

type TUpdateServiceModalProps = {
  serviceId: string
}

const UpdateServiceModal = ({ serviceId }: TUpdateServiceModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data: serviceData, isLoading } = useGetServiceQuery(serviceId)

  const [updateService] = useUpdateServiceMutation()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // uploading image into cloudinary
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

    try {
      let uploadedImageUrl = null

      // If image file is available then upload it to cloudinary
      if (data.image instanceof File) {
        uploadedImageUrl = await uploadImageToCloudinary(data.image)
      }

      //  form data
      const formData = {
        serviceId: serviceId,
        data: {
          ...data,
          price: Number(data.price),
          duration: Number(data.duration),
          ...(uploadedImageUrl && { image: uploadedImageUrl })
        }
      }

      // update the service data
      const res = (await updateService(formData)) as TResponse<TService>

      if (res.error) {
        toast.error('Failed to update service', { duration: 2000 })
      } else {
        toast.success('Service updated successfully', { duration: 2000 })
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
      handleOk()
    }
  }

  const defaultValue = {
    name: serviceData?.data?.name,
    description: serviceData?.data?.description,
    price: serviceData?.data?.price,
    duration: serviceData?.data?.duration
  }

  return (
    <>
      <Button onClick={showModal}>Update</Button>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CForm onSubmit={onSubmit} defaultValues={defaultValue}>
          <CInput disabled={isLoading} name='name' type='text' label='Name' />
          <CTextArea
            disabled={isLoading}
            name='description'
            label='Description'
            maxLength={100}
          />
          <CInput disabled={isLoading} name='price' type='text' label='Price' />
          <CInput
            disabled={isLoading}
            name='duration'
            type='text'
            label='Duration'
          />
          <Controller
            name='image'
            render={({ field: { onChange, value, ...field } }) => (
              <Form.Item label={'Image'}>
                <Input
                  type='file'
                  disabled={isLoading}
                  value={value?.filename}
                  size='large'
                  {...field}
                  onChange={(e) => onChange(e?.target?.files?.[0])}
                />
              </Form.Item>
            )}
          />
          <Button
            loading={loading}
            style={{ background: '#56A7DC', color: 'white' }}
            htmlType='submit'>
            Submit
          </Button>
        </CForm>
      </Modal>
    </>
  )
}

export default UpdateServiceModal
