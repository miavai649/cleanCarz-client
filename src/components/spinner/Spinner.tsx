interface SpinnerProps {
  styling?: string
}

const Spinner = ({ styling }: SpinnerProps) => {
  return (
    <div className={`relative ${styling}`}>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='relative'>
          <div className='w-12 h-12 rounded-full absolute border-8 border-dashed border-gray-200'></div>
          <div className='w-12 h-12 rounded-full animate-spin absolute border-8 border-dashed border-primary-600 border-t-transparent'></div>
        </div>
      </div>
    </div>
  )
}

export default Spinner
