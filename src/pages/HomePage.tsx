import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection";
import BrandSlider from "../components/home/BrandSlider";
import FeaturedProducts from "../components/home/FeaturedProducts";
import CustomersSection from "../components/home/CustomersSection";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <BrandSlider />
      <FeaturedProducts />
      <CustomersSection />
    </motion.div>
  );
}
