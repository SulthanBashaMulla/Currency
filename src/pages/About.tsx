import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeInSection, SlideInSection } from "@/components/AnimatedSections";
import PageTransition from "@/components/PageTransition";
import { Target, Eye, Heart } from "lucide-react";

const About = () => {
  return (
    <PageTransition>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              About <span className="text-gradient">currency</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A legacy of excellence, innovation, and unwavering commitment to quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideInSection>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Brand Itself CurrencY Exist from us Since 2001. An Official store
                Founded in 2006, currency began with a simple vision: to deliver products and services 
                that exceed expectations. What started as a small team of passionate individuals has 
                grown into a leading force in our industry.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our journey has been defined by innovation, resilience, and an unwavering commitment 
                to our clients. We believe that excellence is not a destination but a continuous journey.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we serve clients worldwide, helping them achieve their goals with our 
                comprehensive suite of currency solutions.
              </p>
            </SlideInSection>

            <FadeInSection delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-3xl" />
                <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <span className="text-4xl md:text-5xl font-display font-bold text-gradient">25+</span>
                      <p className="text-muted-foreground text-sm mt-2">Years Experience</p>
                    </div>
                    <div className="text-center">
                      <span className="text-4xl md:text-5xl font-display font-bold text-gradient">100+</span>
                      <p className="text-muted-foreground text-sm mt-2">Clients Served</p>
                    </div>
                    <div className="text-center">
                      <span className="text-4xl md:text-5xl font-display font-bold text-gradient">99%</span>
                      <p className="text-muted-foreground text-sm mt-2">Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              What <span className="text-gradient">Drives</span> Us
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInSection delay={0.1}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-colors duration-300">
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver innovative, high-quality solutions that empower businesses and individuals 
                  to achieve their full potential, while maintaining the highest standards of integrity 
                  and service.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-colors duration-300">
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the global leader in currency solutions, recognized for our innovation, 
                  excellence, and the lasting impact we create for our clients and communities.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-colors duration-300">
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                  <Heart className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4">Our Values</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Excellence in everything we do. Integrity in every interaction. Innovation at our core. 
                  Client success as our ultimate goal. These values guide every decision we make.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default About;
