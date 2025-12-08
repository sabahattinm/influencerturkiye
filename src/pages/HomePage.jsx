import HeroSection from '../components/HeroSection';
import CardGrid from '../components/CardGrid';
import ServicesSection from '../components/ServicesSection';
import MicroInfluencerSection from '../components/MicroInfluencerSection';
import StatsSection from '../components/StatsSection';
import PortfolioSection from '../components/PortfolioSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

/**
 * HomePage - Ana Sayfa
 */
const HomePage = () => {
  return (
    <>
      {/* Hero Section - Original Design */}
      <HeroSection />
      
      {/* Card Grid - Original Design */}
      <CardGrid />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Micro Influencer Strategy */}
      <MicroInfluencerSection />
      
      {/* Statistics */}
      <StatsSection />
      
  
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Contact */}
      <ContactSection />
    </>
  );
};

export default HomePage;

