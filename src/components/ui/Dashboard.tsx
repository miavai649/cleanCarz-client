import { Layout, Menu } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../redux/hook'
import {
  TUserDecoded,
  useCurrentToken
} from '../../redux/features/auth/authSlice'
import { verifyToken } from '../../utils/verifyToken'

const { Sider, Content } = Layout

const Dashboard = () => {
  const token = useAppSelector(useCurrentToken)

  let user

  if (token) {
    user = verifyToken(token)
  }

  let sidebarItems

  switch ((user as TUserDecoded)!.userRole) {
    case 'admin':
      sidebarItems = [
        {
          key: 'Service Management',
          label: (
            <NavLink to={'/admin/service-management'}>
              Service Management
            </NavLink>
          )
        },
        {
          key: 'Slot Management',
          label: (
            <NavLink to={'/admin/slot-management'}>Slot Management</NavLink>
          )
        },
        {
          key: 'User Management',
          label: 'User Management',
          children: [
            {
              key: 'Users',
              label: <NavLink to={'/admin/users'}>Users</NavLink>
            },
            {
              key: 'Bookings',
              label: <NavLink to={'/admin/booking'}>Booking</NavLink>
            }
          ]
        }
      ]
      break
    case 'user':
      sidebarItems = [
        {
          key: 'My Profile',
          label: <NavLink to={'/user'}>My Profile</NavLink>
        },
        {
          key: 'My Bookings',
          label: <NavLink to={'/user/my-booking'}>My Bookings</NavLink>
        }
      ]
      break

    default:
      break
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        style={{
          position: 'sticky',
          top: '0',
          left: '0',
          backgroundColor: '#fff',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
          borderRight: '1px solid #f0f0f0'
        }}>
        <div
          style={{
            height: '64px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            borderBottom: '1px solid #f0f0f0'
          }}>
          Dashboard
        </div>
        <Menu
          style={{
            color: '#333',
            fontSize: '16px'
          }}
          mode='inline'
          defaultSelectedKeys={['home']}
          items={sidebarItems}
        />
      </Sider>

      <Content style={{ margin: '24px 16px' }}>
        <div
          style={{
            padding: '24px',
            minHeight: '360px'
          }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  )
}

export default Dashboard
