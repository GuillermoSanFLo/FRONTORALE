import { Container } from 'react-bootstrap';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PopularMentors from '../components/PopularMentors';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <Features />
      <PopularMentors />
      <Testimonials />
      <CallToAction />
    </div>
  );
}

export default HomePage;