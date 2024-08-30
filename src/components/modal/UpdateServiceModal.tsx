import CForm from '../../components/form/CForm'
import CInput from '../../components/form/CInput'
import { useState } from 'react'
import { Controller, FieldValues, SubmitHandler } from 'react-hook-form'
import { Button, Form, Input, Modal } from 'antd'
import { useGetServiceQuery } from '../../redux/features/service/serviceApi'

type TUpdateServiceModalProps = {
  serviceId: string
}

const UpdateServiceModal = ({ serviceId }: TUpdateServiceModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: serviceData } = useGetServiceQuery(serviceId)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const facultyData = {
      ...data
    }
    console.log(
      '🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ facultyData:',
      facultyData
    )

    // try {
    //   const res = (await addFaculties(facultyData)) as TResponse<any>

    //   if (res?.error) {
    //     toast.error(res.error.data.message, { id: toastId })
    //   } else {
    //     toast.success('Faculties added successfully', { id: toastId })
    //   }
    // } catch (error) {
    //   toast.error('Something went wrong', { id: toastId })
    // }

    handleOk()
  }

  const defaultValue = {
    ...serviceData?.data
  }

  return (
    <>
      <Button onClick={showModal}>Update</Button>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CForm onSubmit={onSubmit} defaultValues={defaultValue}>
          <CInput name='name' type='text' label='Name' />
          <CInput name='description' type='text' label='Description' />
          <CInput name='price' type='text' label='Price' />
          <CInput name='duration' type='text' label='Duration' />
          <Controller
            name='image'
            render={({ field: { onChange, value, ...field } }) => (
              <Form.Item label={'Image'}>
                <Input
                  type='file'
                  value={value?.filename}
                  size='large'
                  {...field}
                  onChange={(e) => onChange(e?.target?.files?.[0])}
                />
              </Form.Item>
            )}
          />
          <Button
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
