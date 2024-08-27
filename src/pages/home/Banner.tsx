import { bannerVideo } from '../../assets/video'

const Banner = () => {
  return (
    <div className='relative bg-black'>
      <video
        className='absolute top-0 left-0 w-full h-full object-cover'
        src={bannerVideo}
        autoPlay
        loop
        muted
      />
      <div className='relative z-10 bg-black bg-opacity-50 flex items-center justify-center min-h-screen'>
        <div className='text-center text-white space-y-6 drop-shadow-lg px-6 md:px-10 lg:px-12'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight'>
            Experience Premium Car Wash Services
          </h1>
          <p className='text-lg md:text-xl lg:text-2xl font-light'>
            Convenient, professional, and tailored to meet your car's needs.
            Book your wash today!
          </p>
          <button
            className='bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-primary-700 transition-transform transform hover:scale-105'
            onClick={() => (window.location.href = '/services')}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
