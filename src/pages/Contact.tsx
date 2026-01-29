import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import WhatsAppSection from "@/components/WhatsAppSection";
import PageTransition from "@/components/PageTransition";

const Contact = () => {
  return (
    <PageTransition>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Need  <span className="text-gradient">Assistance !</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions or need assistance? We're here to help. Reach out to us and our team will get back to you promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Section */}
      <WhatsAppSection chatLink="https://wa.me/+918595507825" />

      {/* Contact Form Section */}
      <ContactForm />

      <Footer />
    </PageTransition>
  );
};

export default Contact;
