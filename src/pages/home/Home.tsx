import Banner from './Banner'
import FaqSection from './FaqSection'
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
      <FaqSection />
    </div>
  )
}

export default Home
