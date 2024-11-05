import { ClockLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <div className=' h-screen bg-black/10 fixed inset-0 backdrop-blur-md z-[999] flex justify-center items-center'>
      <ClockLoader color='#E65100' size={150} />
    </div>
  )
}

export default Spinner
