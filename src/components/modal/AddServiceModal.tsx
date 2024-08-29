import CForm from '../../components/form/CForm'
import CInput from '../../components/form/CInput'
import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react'
import { Controller, FieldValues, SubmitHandler } from 'react-hook-form'
import { Button, Form, Input, Modal } from 'antd'
import { zodResolver } from '@hookform/resolvers/zod'
import addServiceSchema from '../../schemas/service.schema'

const AddServiceModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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

export default AddServiceModal
