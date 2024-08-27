const Login = () => {
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
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='fullname'
            placeholder='Full Name'
          />

          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='email'
            placeholder='Email'
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='password'
            placeholder='Password'
          />
          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='confirm_password'
            placeholder='Confirm Password'
          />

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-primary-800 text-white hover:bg-green-dark focus:outline-none my-1'>
            Create Account
          </button>

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
          Already have an account?
          <a
            className='no-underline border-b border-blue text-blue'
            href='../login/'>
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  )
}

export default Login
