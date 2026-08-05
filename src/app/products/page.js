import ProductsPageClient from "./ProductsPageClient";

export const metadata = {
  title: "Cloud Products: VMs, Managed Databases, Storage & Networking | Neviri",
  description:
    "Explore every Neviri product — virtual machines from $4.26/mo, managed MongoDB, MySQL and PostgreSQL clusters, NVMe block storage, S3-compatible object storage, load balancers, VPC, and cloud firewalls. Provisioned in under a minute.",
  keywords:
    "cloud products, virtual machines, managed mongodb, managed mysql, managed postgresql, nvme block storage, s3 compatible object storage, load balancer, vpc, cloud firewall, ssl certificates, cloud infrastructure platform",
  alternates: {
    canonical: "https://neviri.com/products",
  },
  openGraph: {
    title:
      "Cloud Products: VMs, Managed Databases, Storage & Networking | Neviri",
    description:
      "Explore every Neviri product — virtual machines from $4.26/mo, managed MongoDB, MySQL and PostgreSQL clusters, NVMe block storage, S3-compatible object storage, load balancers, VPC, and cloud firewalls. Provisioned in under a minute.",
    url: "https://neviri.com/products",
    type: "website",
  },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
