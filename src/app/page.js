"use client";


import Hero from "@/components/home/Hero";
import Services from "@/components/home/WhyChooseNeviri";
import Features from "@/components/home/Features";
import Pricing from "@/components/home/Pricing";
import Footer from "@/components/common/Footer";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseNeviri from "@/components/home/WhyChooseNeviri";
import HowItWorks from "@/components/home/HowItWorks";
import Navbar from "@/components/common/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen gradient-bg">
      <Navbar />
      <Hero />
      <Features />
      {/* <HowItWorks /> */}
      <WhyChooseNeviri />
      {/*  */}
      <Testimonials />
      {/* <Footer /> */}
    </main>
  );
}
