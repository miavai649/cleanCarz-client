import { FieldValues, SubmitHandler } from 'react-hook-form'
import CForm from '../../components/form/CForm'
import CInput from '../../components/form/CInput'
import CPasswordInput from '../../components/form/CPasswordInput'
import { signUpSchema } from '../../schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'

const Register = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <div className='container mx-auto py-12'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-extrabold text-gray-800 mb-4'>
          Join CleanCarz Today
        </h2>
        <p className='text-gray-600 text-lg'>
          Create an account to start booking car wash services with ease and
          manage your appointments anytime.
        </p>
        <div className='mt-2 w-24 mx-auto h-1 bg-primary-800 rounded'></div>
      </div>

      {/* register form */}
      <div className='container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-xl text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
          <CForm onSubmit={onSubmit} resolver={zodResolver(signUpSchema)}>
            <CInput name='name' type='text' label='Full Name' />
            <CInput name='email' type='email' label='Email' />
            <CPasswordInput name='password' type='text' label='Password' />
            <CInput name='phoneNumber' type='text' label='Phone Number' />
            <CInput name='address' type='text' label='Address' />
            <button
              type='submit'
              className='w-full text-center py-3 rounded bg-primary-800 text-white hover:bg-green-dark focus:outline-none my-1'>
              Register
            </button>
          </CForm>

          <div className='text-center text-sm text-grey-dark mt-4'>
            By signing up, you agree to the
            <a
              className='no-underline border-b border-grey-dark text-grey-dark'
              href='#'>
              Terms of Service
            </a>{' '}
            and
            <a
              className='no-underline border-b border-grey-dark text-grey-dark'
              href='#'>
              Privacy Policy
            </a>
          </div>
        </div>

        <div className='text-grey-dark mt-6'>
          Already have an account?{' '}
          <a
            className='no-underline border-b border-blue text-blue'
            href='/login'>
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  )
}

export default Register
