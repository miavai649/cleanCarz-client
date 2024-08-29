import { FieldValues, SubmitHandler } from 'react-hook-form'
import CForm from '../../components/form/CForm'
import CInput from '../../components/form/CInput'
import CPasswordInput from '../../components/form/CPasswordInput'
import { useLoginMutation } from '../../redux/features/auth/authApi'
import { Button } from 'antd'
import { toast } from 'sonner'
import { TResponse } from '../../types'
import { TUser } from '../../types/user.type'
import { verifyToken } from '../../utils/decodeToken'
import { setUser, TUserDecoded } from '../../redux/features/auth/authSlice'
import { useAppDispatch } from '../../redux/hook'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = (await login(data).unwrap()) as TResponse<TUser>
      console.log('🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ res:', res)

      if (res.error) {
        toast.error(res?.error?.data?.message, { duration: 2000 })
      } else {
        const user = (await verifyToken(res.token as string)) as TUserDecoded
        dispatch(setUser({ user: user, token: res.token }))
        toast.success('User logged in successfully', { duration: 2000 })
        navigate('/')
      }
    } catch (error) {
      toast.error('Something went problem', {
        duration: 2000
      })
    }
  }

  return (
    <div className='container mx-auto py-12'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-extrabold text-gray-800 mb-4'>
          Welcome Back to CleanCarz
        </h2>
        <p className='text-gray-600 text-lg'>
          Log in to manage your account and schedule your next car wash
          effortlessly.
        </p>
        <div className='mt-2 w-24 mx-auto h-1 bg-primary-800 rounded'></div>
      </div>
      {/* log in form */}
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-xl text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Sign in</h1>
          <CForm onSubmit={onSubmit}>
            <CInput name='email' type='email' label='Email' />
            <CPasswordInput name='password' type='text' label='Password' />
            <Button
              loading={isLoading}
              htmlType='submit'
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 600,
                padding: '20px 0px',
                borderRadius: '0.375rem',
                backgroundColor: '#418FC8',
                color: 'white',
                outline: 'none',
                marginTop: '0.25rem',
                marginBottom: '0.25rem'
              }}>
              Register
            </Button>
          </CForm>
        </div>

        <div className='text-grey-dark mt-6'>
          Don't have an account yet?{' '}
          <a
            className='no-underline border-b border-blue text-blue'
            href='../register/'>
            Register
          </a>
          .
        </div>
      </div>
    </div>
  )
}

export default Login
