import Hero from '../component/Hero'
import Categories from '../component/Categories'
import FeaturedCourses from '../component/FeaturedCourses'
import AiAssistant from '../component/AIAssistant'
import Stats from '../component/Stats'
import Leaderboard from '../component/Leaderboard'

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-white antialiased font-sans">
      <main>
        <Hero />
        <Leaderboard/>
        <Categories />
        <FeaturedCourses />
        <AiAssistant />
        <Stats />
      </main>
    </div>
  )
}

export default Home