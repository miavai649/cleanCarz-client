import { Button, Dropdown, Table, TableColumnsType, Tag } from 'antd'

import {
  useGetAllSlotQuery,
  useUpdateSlotStatusMutation
} from '../../redux/features/slot/slotApi'
import CreateSlotModal from '../../components/modal/CreateSlotModal'
import { useState } from 'react'
import { toast } from 'sonner'
import { TResponse, TSlot } from '../../types'

export type TTableData = {
  key: string
  name: string
  date: string
  startTime: string
  endTime: string
  status: string
}

const items = [
  {
    key: 'available',
    label: 'Available'
  },
  {
    key: 'canceled',
    label: 'Canceled'
  }
]

const SlotManagement = () => {
  const [slotId, setSlotId] = useState('')

  // getting all slot data
  const { data: slotsData, isLoading: slotLoading } = useGetAllSlotQuery({})

  // updating slot status
  const [updateSlotStatus] = useUpdateSlotStatusMutation()

  // table data
  const tableData = slotsData?.data?.map(
    ({ _id, service, date, startTime, endTime, isBooked }) => ({
      key: _id,
      name: service?.name,
      date,
      startTime,
      endTime,
      status: isBooked
    })
  )

  // handle update slot status function
  const handleMenuClick = async (data: any) => {
    const toastId = toast.loading('Updating...')
    const updateData = {
      id: slotId,
      data: {
        isBooked: data.key
      }
    }

    try {
      const res = (await updateSlotStatus(updateData)) as TResponse<TSlot>
      if (res?.error) {
        toast.error('Failed to update slot status', { id: toastId })
      } else {
        toast.success(`Slot status updated to ${data.key}`, { id: toastId })
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId })
    }
  }

  const menuProps = {
    items,
    onClick: handleMenuClick
  }

  // Table columns
  const columns: TableColumnsType<TTableData> = [
    {
      key: 'name',
      title: 'Service Name',
      dataIndex: 'name'
    },
    {
      key: 'startTime',
      title: 'Start Time',
      align: 'center',
      dataIndex: 'startTime'
    },
    {
      key: 'endTime',
      title: 'End Time',
      align: 'center',
      dataIndex: 'endTime'
    },
    {
      key: 'date',
      title: 'Date',
      align: 'center',
      dataIndex: 'date'
    },
    {
      key: 'status',
      title: 'Status',
      align: 'center',
      dataIndex: 'status',
      render: (item) => {
        let color

        if (item === 'available') {
          color = 'blue'
        }
        if (item === 'booked') {
          color = 'green'
        }
        if (item === 'canceled') {
          color = 'red'
        }

        return <Tag color={color}>{item}</Tag>
      }
    },

    {
      key: 'action',
      title: 'Action',
      align: 'center',
      render: (item) => {
        return (
          <Dropdown key={item?.key} menu={menuProps} trigger={['click']}>
            <Button onClick={() => setSlotId(item?.key)}>Update</Button>
          </Dropdown>
        )
      },
      width: '1%'
    }
  ]

  return (
    <div>
      <div className='flex justify-between w-full'>
        <h1 className='text-2xl mb-6 font-bold'>Service Management</h1>
        <CreateSlotModal />
      </div>
      <Table
        loading={slotLoading}
        scroll={{ x: 1300 }}
        style={{ scrollBehavior: 'auto' }}
        columns={columns}
        dataSource={tableData}
        rowKey='_id'
        pagination={false}
      />
    </div>
  )
}

export default SlotManagement
