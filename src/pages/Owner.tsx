import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeInSection, SlideInSection } from "@/components/AnimatedSections";
import PageTransition from "@/components/PageTransition";
import { Linkedin, Twitter, Mail } from "lucide-react";


const Owner = () => {
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
              Meet the <span className="text-gradient">Founder</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              The visionary behind currency's success story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Owner Profile */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeInSection>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-3xl transform translate-x-4 translate-y-4" />
                <div className="relative overflow-hidden rounded-2xl border border-border">
                  <img
                    src="https://i.postimg.cc/7LkvD94h/IMG-20251215-WA0074.jpg"
                    alt="INDERJEET SINGH - Founder"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>
              </div>
            </FadeInSection>

            <SlideInSection delay={0.2}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                    INDERJEET SINGH
                  </h2>
                  <p className="text-primary text-lg font-medium">Founder & CEO</p>
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 25+ years of experience in the industry, INDERJEET Singh founded currency 
                    with a singular vision: to create products and services that stand the test of time.
                  </p>
                  <p>
                    His journey began in a small workshop, where he learned the value of craftsmanship 
                    and attention to detail. Today, he leads a team of talented professionals who share 
                    his passion for excellence.
                  </p>
                  <p>
                    Under Inderjeet'sleadership, currency has grown from a local business to an internationally 
                    recognized brand, serving clients across five continents. His philosophy is simple: 
                    never compromise on quality, and always put the client first.
                  </p>
                  <p>
                    When not at the helm of currency, James is an avid mentor to young entrepreneurs 
                    and speaks at industry conferences worldwide about innovation and sustainable business practices.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:Currencyinternational321@gmail.com"
                    className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5 text-foreground" />
                  </motion.a>
                </div>
              </div>
            </SlideInSection>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeInSection className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-display italic text-foreground leading-relaxed">
              "Excellence is not a destination but a continuous journey. Every day, we strive to be 
              better than we were yesterday, for our clients, our team, and ourselves."
            </blockquote>
            <cite className="block mt-6 text-primary font-semibold not-italic">
              — Inderjeet Singh
            </cite>
          </FadeInSection>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default Owner;
