import Banner from './Banner'
import FeaturedServices from './FeaturedServices'
import Review from './Review'
import ServiceWeProvide from './ServiceWeProvide'

const Home = () => {
  return (
    <div>
      <Banner />
      <ServiceWeProvide />
      <FeaturedServices />
      <Review />
    </div>
  )
}

export default Home
