import { bannerVideo } from '../../assets/video'

const Banner = () => {
  return (
    <div className='relative bg-black'>
      <video
        className='absolute top-0 left-0 h-5/6 md:w-full md:h-full object-cover'
        src={bannerVideo}
        autoPlay
        loop
        muted
      />
      <div className='relative z-10 bg-opacity-50 flex items-center justify-center min-h-screen'>
        <div className='text-center text-white space-y-5 drop-shadow-2xl px-5 md:px-10 lg:px-0'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold'>
            Experience Premium Car Wash Services.
          </h1>
          <p className='text-lg md:text-xl lg:text-2xl'>
            Convenient, professional, and tailored to meet your car's needs.
            Book your wash today!
          </p>
          <button
            className='bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-all'
            onClick={() => (window.location.href = '/services')}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
