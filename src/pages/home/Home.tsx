import Banner from './Banner'
import FeaturedServices from './FeaturedServices'
import Review from './Review'
import ServiceWeProvide from './ServiceWeProvide'
import TeamMembers from './TeamMembers'

const Home = () => {
  return (
    <div>
      <Banner />
      <ServiceWeProvide />
      <FeaturedServices />
      <TeamMembers />
      <Review />
    </div>
  )
}

export default Home
