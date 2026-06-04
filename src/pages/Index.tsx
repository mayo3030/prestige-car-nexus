import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { ServicesSection } from "@/components/home/ServicesSection";
import { BrandsSection } from "@/components/home/BrandsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCars />
      <ServicesSection />
      <BrandsSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
