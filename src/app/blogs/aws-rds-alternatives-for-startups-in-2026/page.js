import Navbar from "@/components/common/Navbar";
import RdsArticle from "./RdsArticle";

export const metadata = {
  title:
    "AWS RDS Alternatives for Startups in 2026: Best Managed Databases for Faster Growth",
  description:
    "In 2026, AWS RDS is no longer the default for every startup. Compare the best managed database alternatives — Neviri Cloud, Neon, Supabase, PlanetScale, Crunchy Bridge, and DigitalOcean — for better developer experience, predictable pricing, and faster growth.",
  alternates: {
    canonical:
      "https://neviri.com/blogs/aws-rds-alternatives-for-startups-in-2026",
  },
  openGraph: {
    title:
      "AWS RDS Alternatives for Startups in 2026: Best Managed Databases for Faster Growth",
    description:
      "Compare the best managed database alternatives to AWS RDS for startups in 2026 — Neviri Cloud, Neon, Supabase, PlanetScale, Crunchy Bridge, and DigitalOcean.",
    url: "https://neviri.com/blogs/aws-rds-alternatives-for-startups-in-2026",
    type: "article",
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <RdsArticle />
    </div>
  );
}
