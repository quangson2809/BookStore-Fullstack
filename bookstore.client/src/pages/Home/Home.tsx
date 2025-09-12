import Banner from '../../components/Banner';
import FeaturedBooksByCategory from '../../components/FeaturedBooksByCategory';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Banner Section */}
      <section className="banner-section">
        <div className="container">
          <Banner />
        </div>
      </section>

      {/* Featured Books by Category */}
      <FeaturedBooksByCategory />
    </div>
  );
};

export default Home;