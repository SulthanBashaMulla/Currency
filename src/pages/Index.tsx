import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import ContactForm from "@/components/ContactForm";
import WhatsAppSection from "@/components/WhatsAppSection";
import { FadeInSection } from "@/components/AnimatedSections";
import PageTransition from "@/components/PageTransition";

import heroBg from "@/assets/hero-bg.png";
import carousel1 from "@/assets/carousel-1.png";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.png";

const carouselImages = [
  { src: heroBg, alt: "Premium background" },
  { src: carousel1, alt: "Luxury products" },
  { src: carousel2, alt: "Modern office" },
  { src: carousel3, alt: "Abstract design" },
];

const Index = () => {
  return (
    <PageTransition>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroCarousel images={carouselImages} interval={6000} />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Experience <span className="text-gradient">Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Where innovation meets craftsmanship. Discover premium solutions that redefine industry standards.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/catalogue"
                className="px-8 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-lg hover:shadow-glow transition-all duration-300"
              >
                Explore Catalogue
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-20 md:py-32 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <FadeInSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Built on <span className="text-gradient">Passion</span>, Driven by <span className="text-gradient">Innovation</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              For over a decade, we've been at the forefront of delivering exceptional products and services. 
              Our commitment to quality and innovation has made us a trusted partner for businesses worldwide.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <FadeInSection delay={0.1}>
              <div className="p-8 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">25+</span>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Years of Excellence</h3>
                <p className="text-muted-foreground text-sm">Delivering premium solutions since 2014.</p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="p-8 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">100+</span>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Happy Clients</h3>
                <p className="text-muted-foreground text-sm">Trusted by leading businesses globally.</p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <div className="p-8 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">24/7</span>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Support</h3>
                <p className="text-muted-foreground text-sm">Always here when you need us.</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* WhatsApp Section */}
      <WhatsAppSection chatLink="https://wa.me/+918595507825" />

      {/* Contact Section */}
      <ContactForm />

      <Footer />
    </PageTransition>
  );
};

export default Index;
