import CForm from '../../components/form/CForm'
import { useState } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Button, Modal } from 'antd'
import CSelect from '../form/CSelect'
import { useGetAllServiceQuery } from '../../redux/features/service/serviceApi'
import CDatePicker from '../form/CDatePicker'
import CTimePicker from '../form/CTimePicker'
import moment from 'moment'
import { useAddSlotMutation } from '../../redux/features/slot/slotApi'
import { TResponse, TService } from '../../types'
import { toast } from 'sonner'

const CreateSlotModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [addSlot, { isLoading: slotLoading }] = useAddSlotMutation()
  const { data: servicesData, isLoading: serviceLoading } =
    useGetAllServiceQuery({})

  const serviceOptions = servicesData?.data?.map((service) => ({
    value: service._id,
    label: service.name
  }))

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
      ...data,
      date: moment(new Date(data.date)).format('YYYY-MM-DD'),
      startTime: moment(new Date(data.time[0])).format('HH:mm'),
      endTime: moment(new Date(data.time[1])).format('HH:mm')
    }

    try {
      const res = (await addSlot(slotData)) as TResponse<TService[]>

      if (res.error) {
        toast.error('Failed to create slot', {
          duration: 2000
        })
      } else {
        toast.success('Slot created successfully', {
          duration: 2000
        })
      }
    } catch (error) {
      toast.error('Something went wrong')
    }

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
          <CSelect
            name='service'
            label='Select Slot'
            options={serviceOptions}
            disabled={serviceLoading}
          />
          <CDatePicker name='date' label='Slot Date' />
          <CTimePicker name='time' label='Slot Time' />
          <Button
            style={{ background: '#56A7DC', color: 'white' }}
            htmlType='submit'
            loading={slotLoading}>
            Submit
          </Button>
        </CForm>
      </Modal>
    </>
  )
}

export default CreateSlotModal
