import AboutContent from "./AboutContent";

export const metadata = {
  title: "About Neviri – A Dedicated Cloud Platform for Modern Teams",
  description:
    "Neviri is a dedicated cloud platform for teams who would rather build products than babysit infrastructure — compute, managed databases, secure networking, and real-time observability from one dashboard, on one predictable bill, with no hyperscaler lock-in.",
  keywords:
    "about neviri, neviri cloud, dedicated cloud platform, managed databases, cloud infrastructure for startups, transparent cloud pricing, cloud for SMEs",
  alternates: {
    canonical: "https://neviri.com/about",
  },
  openGraph: {
    title: "About Neviri – A Dedicated Cloud Platform for Modern Teams",
    description:
      "Neviri makes production-grade cloud infrastructure effortless: compute, managed databases, secure networking, and real-time observability from one dashboard — on one predictable bill.",
    url: "https://neviri.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
