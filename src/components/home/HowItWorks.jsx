import React from "react";
import { FileText, Zap, Key } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Key,
      title: "Register & Login",
      description:
        "Create your account in seconds and access our intuitive dashboard to manage your  infrastructure.",
      step: "01",
    },
    {
      icon: FileText,
      title: "Select Requirements",
      description:
        "Choose from VMs, databases, storage, or load balancers.",
      step: "02",
    },
    {
      icon: Zap,
      title: "Configuration & Deployment",
      description:
        "Select region, size, replicas, and other configurations",
      step: "03",
    },
    {
      icon: FileText,
      title: "Automated Deployment",
      description:
        "Platform automatically provisions and configures resources",
      step: "04",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative bg-[#F7F9FC] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Decoration Circles */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-[#E5EAF1] rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#E8F1FF] rounded-full blur-3xl opacity-50"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1F2C] mb-6">
            How It Works
          </h2>
          <p className="text-xl text-[#4B5565] max-w-2xl mx-auto">
            Get your infrastructure up and running in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-sky-500 to-sky-600 transform translate-x-4"></div>
              )}

              <div className="text-center group">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-600 text-white rounded-full font-bold text-xl mb-6 group-hover:scale-90 transition-transform duration-200">
                  {step.step}
                </div>

                {/* Icon Box */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-[#F2F4F8] rounded-xl border border-[#DDE3EA] group-hover:border-sky-600 transition-all duration-200">
                    <step.icon className="h-8 w-8 text-sky-600" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#1A1F2C] mb-4 group-hover:text-sky-600 transition-colors duration-200">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#4B5565] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;