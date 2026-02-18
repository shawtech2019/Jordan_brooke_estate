import { Building2 } from 'lucide-react';
import Images from '../../../components/constants/Images';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';


const ContactHero = () => {
    const {ref: titleRef,  inView: titleInView} = useInView({
        threshold: 0.5,
        triggerOnce: true,
      });
  return (
    <section
    className="relative bg-cover bg-center bg-no-repeat min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
    style={{ backgroundImage: `url(${Images.PropertiesImgTwo})` }}
  >
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-[#031F22] opacity-60"></div>

    {/* Content */}
    <motion.div 
    ref={titleRef}
    initial={{ opacity:0, y: -50 }}
    animate={{  opacity: titleInView ? 1 :  0, y: titleInView ? 0 : 50}}
    transition={{ duration: 1.5, ease: "easeInOut" }}
    className="relative max-w-3xl text-center text-[#ffffff] py-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e5383b]/10 text-[#e5383b] rounded-full mb-6">
      <Building2 className="w-4 h-4" />
       <span className="text-sm font-medium text-accent">Contact Us</span>
    </div>
      <h1 className="text-6xl font-inter  font-extrabold text-[#e5383b] shadow-lg mb-4"> Get in Touch</h1>
      <p className="text-xl  leading-relaxed">
      Have questions about our services? We're here to help. Reach out to our team 
              and we'll get back to you as soon as possible.
      </p>
    </motion.div>
  </section>
  )
}

export default ContactHero
