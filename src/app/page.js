"use client";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseNeviri from "@/components/home/WhyChooseNeviri";
import Navbar from "@/components/common/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen gradient-bg">
      <Navbar />
      <Hero />
      <Features />
      <WhyChooseNeviri />
      <Testimonials />
    </main>
  );
}
