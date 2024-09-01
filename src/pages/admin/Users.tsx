import { Button, Space, Table, TableColumnsType, Tag } from 'antd'
import {
  useGetAllUsersQuery,
  useUpdateRoleMutation
} from '../../redux/features/auth/authApi'
import { TResponse, TUser } from '../../types'
import { toast } from 'sonner'

export type TTableData = Pick<
  TUser,
  'name' | 'email' | 'phone' | 'address' | 'role'
>

const Users = () => {
  const { data: usersData, isLoading } = useGetAllUsersQuery({})

  const [updateRole] = useUpdateRoleMutation()

  const handleUpdateRole = async (role: string, id: string) => {
    const updateData = {
      id,
      data: {
        role
      }
    }

    try {
      const res = (await updateRole(updateData)) as TResponse<TUser>
      if (res?.error) {
        toast.error('Failed to update user role')
      } else {
        toast.success(`User role updated to ${role}`)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  // table data
  const tableData = usersData?.data?.map(
    ({ _id, name, email, phone, address, role }) => ({
      key: _id,
      name,
      email,
      phone,
      address,
      role
    })
  )

  // Table columns
  const columns: TableColumnsType<TTableData> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name'
    },
    {
      key: 'email',
      title: 'Email',
      align: 'center',
      dataIndex: 'email'
    },
    {
      key: 'phone',
      title: 'Phone No.',
      align: 'center',
      dataIndex: 'phone'
    },
    {
      key: 'address',
      title: 'Address',
      align: 'center',
      dataIndex: 'address'
    },
    {
      key: 'role',
      title: 'Role',
      align: 'center',
      dataIndex: 'role',
      render: (item) => {
        let color
        let text

        if (item === 'admin') {
          color = 'green'
          text = 'Admin'
        }
        if (item === 'user') {
          color = 'blue'
          text = 'User'
        }

        return <Tag color={color}>{text}</Tag>
      }
    },

    {
      key: 'action',
      title: 'Action',
      align: 'center',
      render: (item) => {
        return (
          <Space key={item.key}>
            {item?.role === 'admin' ? (
              <Button
                onClick={() => handleUpdateRole('user', item.key)}
                style={{ backgroundColor: 'blue', color: 'white' }}>
                Make User
              </Button>
            ) : (
              <Button
                onClick={() => handleUpdateRole('admin', item.key)}
                style={{ backgroundColor: 'green', color: 'white' }}>
                Make Admin
              </Button>
            )}
          </Space>
        )
      },
      width: '1%'
    }
  ]

  return (
    <div>
      <div className='flex justify-between w-full'>
        <h1 className='text-2xl mb-6 font-bold'>Users Management</h1>
      </div>
      <Table
        loading={isLoading}
        scroll={{ x: 1300 }}
        style={{ scrollBehavior: 'auto' }}
        columns={columns}
        dataSource={tableData}
        rowKey='_id'
      />
    </div>
  )
}

export default Users
