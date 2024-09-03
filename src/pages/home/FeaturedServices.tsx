import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import FeatureCard from '../../components/cards/FeatureCard'
import { useGetAllServiceQuery } from '../../redux/features/service/serviceApi'
import Spinner from '../../components/spinner/Spinner'

const FeaturedServices = () => {
  const { data: serviceData, isLoading } = useGetAllServiceQuery({})

  return (
    <div className='container mx-auto py-8 md:py-12 px-4 md:px-8'>
      {/* Header */}
      <div className='text-center mb-8 md:mb-12'>
        <h2 className='text-2xl md:text-4xl font-extrabold text-gray-800 mb-4'>
          Featured Services
        </h2>
        <p className='text-gray-600 text-base md:text-lg'>
          Explore our most popular car wash packages
        </p>
        <div className='mt-2 w-16 md:w-24 mx-auto h-1 bg-primary-800 rounded'></div>
      </div>

      {/* feature services */}
      <div>
        {isLoading ? (
          <Spinner styling='h-screen' />
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40
              }
            }}
            autoplay={true}
            modules={[Pagination, Autoplay, Navigation]}
            className='!pb-10'>
            {serviceData?.data?.slice(0, 6)?.map((service) => (
              <SwiperSlide key={service._id}>
                <FeatureCard service={service} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  )
}

export default FeaturedServices
