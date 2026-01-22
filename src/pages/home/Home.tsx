import React from 'react'
import HeroSection from './components/HeroSection'
import FeaturedProperties from './components/FeatureProperties'
import ServicesSection from './components/ServicesSection'
import RolesSection from './components/RolesSection'
import Footer from '../../components/layout/footer/Footer'

const Home = () => {
  return (
    <>
    <HeroSection />
    <FeaturedProperties />
    <ServicesSection />
    <RolesSection />
    <Footer />
    </>
  )
}

export default Home
