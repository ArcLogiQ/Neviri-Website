import React from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "OpeninApp",
      role: "",
      company: "Smart linking & growth platform",
      content:
        "Neviri Cloud transformed our database management. We went from hours of setup to minutes, and the auto-scaling saved us in infrastructure costs.",
      rating: 5,
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      name: "VietPay",
      role: "Lead Developer",
      company: "Digital payments & fintech solutions",
      content:
        "The monitoring dashboard is incredible. Real-time insights into our MongoDB clusters help us optimize performance and reduce costs significantly.",
      rating: 5,
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      name: "PVcomBank",
      role: "DevOps Engineer",
      company: "Banking & financial services",
      content:
        "Best decision we made for our growing startup. Pay-as-you-use pricing and enterprise-grade security without the usual enterprise complexity",
      rating: 5,
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
  ];

  return (
    <section className="relative bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans antialiased border-t border-slate-200 selection:bg-sky-600/30 selection:text-black">
      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6 tracking-[-0.03em] leading-tight">
            Trusted by developers and <br className="hidden md:block" />{" "}
            companies Worldwide
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            See what our customers say about their experience with Neviri Cloud
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 lg:p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-[#3B82F6] transition-all duration-300 flex flex-col group"
            >
              <div className="flex items-center justify-between mb-8">
                {/* Deep Slate Quote Box with True Blue Icon */}
                <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Quote className="h-6 w-6 text-[#3B82F6]" />
                </div>

                {/* True Blue Stars */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-[#3B82F6] fill-[#3B82F6]"
                    />
                  ))}
                </div>
              </div>

              <p className="text-slate-600 mb-8 leading-relaxed font-medium flex-grow text-lg">
                "{testimonial.content}"
              </p>

              {/* Author Details */}
              <div className="flex items-center pt-6 border-t border-slate-100">
                <div>
                  <h4 className="text-[#0F172A] font-bold text-lg tracking-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-slate-500 text-sm font-medium mt-1">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trusted Logos Section */}
        <div className="mt-24 text-center">
          <p className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400 mb-8">
            Trusted by 100+ developers and 80+ companies
          </p>

          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 text-[#0F172A] opacity-40 font-black text-xl tracking-tight transition-opacity duration-300 hover:opacity-100">
            <div className="hover:text-[#3B82F6] hover:drop-shadow-md transition-colors cursor-default">
              OpeninApp
            </div>
            <div className="hover:text-[#3B82F6] hover:drop-shadow-md transition-colors cursor-default">
              DBTech
            </div>
            <div className="hover:text-[#3B82F6] hover:drop-shadow-md transition-colors cursor-default">
              PVcomBank
            </div>
            <div className="hover:text-[#3B82F6] hover:drop-shadow-md transition-colors cursor-default">
              VietPay
            </div>
            <div className="hover:text-[#3B82F6] hover:drop-shadow-md transition-colors cursor-default">
              StartupLab
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
