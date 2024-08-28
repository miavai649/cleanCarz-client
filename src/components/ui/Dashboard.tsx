import { Layout, Menu } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'

const { Sider, Content } = Layout

const Dashboard = () => {
  const sidebarItems = [
    {
      key: 'Service Management',
      label: (
        <NavLink to={'/admin/service-management'}>Service Management</NavLink>
      )
    },
    {
      key: 'Slot Management',
      label: <NavLink to={'/admin/slot-management'}>Slot Management</NavLink>
    },
    {
      key: 'User Management',
      label: <NavLink to={'/admin/user-management'}>User Management</NavLink>
    }
  ]

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
