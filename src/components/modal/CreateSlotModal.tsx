import CForm from '../../components/form/CForm'
import CInput from '../../components/form/CInput'
import { useState } from 'react'
import { Controller, FieldValues, SubmitHandler } from 'react-hook-form'
import { Button, Form, Input, Modal } from 'antd'
import CTextArea from '../form/CTextArea'

const CreateSlotModal = () => {
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
    const slotData = {
      ...data
    }
    console.log(
      '🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ slotData:',
      slotData
    )

    // try {
    //   const res = (await addService(serviceData)) as TResponse<TService>

    //   if (res.error) {
    //     toast.error('Failed to create service', {
    //       duration: 2000
    //     })
    //   } else {
    //     toast.success('Service created successfully', {
    //       duration: 2000
    //     })
    //   }
    // } catch (error) {
    //   toast.error('Something went wrong')
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
        Create Slot
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CForm onSubmit={onSubmit}>
          <CInput name='name' type='text' label='Name' />
          <Button
            style={{ background: '#56A7DC', color: 'white' }}
            htmlType='submit'
            // loading={loading}
          >
            Submit
          </Button>
        </CForm>
      </Modal>
    </>
  )
}

export default CreateSlotModal
