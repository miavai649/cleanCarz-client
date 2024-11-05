import { useState } from 'react'
import { Button, Modal } from 'antd'
import './AuthenticationModal.css'
import { useNavigate } from 'react-router-dom'

const AuthenticationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button
        onClick={showModal}
        style={{
          backgroundColor: '#56A7DC',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          padding: '0.6rem 1.2rem',
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
        Submit Review
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        className='simple-modal'>
        <div className='modal-content'>
          <h2 className='modal-title'>Welcome to Our Community!</h2>
          <p className='modal-description'>
            To leave a review, please log in or create an account.
          </p>
          <div className='modal-buttons'>
            <Button
              className='login-button'
              onClick={() => {
                handleCancel()
                navigate('/login')
              }}>
              Log In
            </Button>
            <Button
              className='register-button'
              onClick={() => {
                handleCancel()
                navigate('/register')
              }}>
              Register
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AuthenticationModal
