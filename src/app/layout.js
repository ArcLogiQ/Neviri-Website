import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ConditionalFooter from "@/components/common/ConditionalFooter";
import { Toaster } from "react-hot-toast";
import { ProcessingProvider } from "@/context/ProcessingContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Neviri Cloud – Dedicated Cloud Platform for Modern Infrastructure, Databases & Compliance",
  description:
    "Neviri is a dedicated cloud platform to build, deploy, and operate modern infrastructure with compliant VMs, managed databases, secure networking, and real‑time observability—without hyperscaler lock‑in.",
  keywords:
    "dedicated cloud platform, modern infrastructure cloud, managed databases and VMs, compliant cloud hosting, secure cloud networking, cloud observability platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
          className="rounded-md"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
          className="rounded-md"
        />
        <meta
          property="og:title"
          content="Neviri Cloud – Dedicated Cloud Platform for Modern Infrastructure, Databases & Compliance"
        />
        <meta
          property="og:description"
          content="Neviri is a dedicated cloud platform to build, deploy, and operate modern infrastructure with compliant VMs, managed databases, secure networking, and real‑time observability—without hyperscaler lock‑in."
        />
        <meta property="og:image" content="/images/favicon-32x32.png" />
        <meta property="og:url" content="https://neviri.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Neviri Cloud – Dedicated Cloud Platform for Modern Infrastructure, Databases & Compliance"
        />
        <meta
          name="twitter:description"
          content="Neviri is a dedicated cloud platform to build, deploy, and operate modern infrastructure with compliant VMs, managed databases, secure networking, and real‑time observability—without hyperscaler lock‑in."
        />
        <meta name="twitter:image" content="/images/favicon-32x32.png" />
      </head>
      <body className={plusJakartaSans.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T7C75JD80Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T7C75JD80Z');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4433335416812537');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4433335416812537&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Apollo.io Website Tracker */}
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`
            function initApollo() {
              var n = Math.random().toString(36).substring(7),
                o = document.createElement("script");
              o.src =
                "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" +
                n;
              o.async = !0;
              o.defer = !0;
              o.onload = function () {
                window.trackingFunctions.onLoad({ appId: "6a5098a6663f1d000cdd0056" });
              };
              document.head.appendChild(o);
            }
            initApollo();
          `}
        </Script>

        {/* <Navbar /> */}
        <ProcessingProvider>
          <main>{children}</main>
          <ConditionalFooter />
          {/* z-index above any modal overlay (modals use z-[9999]) so
              toasts are always readable, never blurred behind a
              modal backdrop. ``containerStyle`` is the documented
              react-hot-toast knob for this. */}
          <Toaster
            position="top-right"
            containerStyle={{ zIndex: 100000 }}
            toastOptions={{
              duration: 4000,
              style: {
                maxWidth: 460,
                fontSize: 14,
                padding: "12px 16px",
              },
              error: {
                duration: 6000,
                iconTheme: { primary: "#dc2626", secondary: "#fff" },
              },
              success: {
                iconTheme: { primary: "#059669", secondary: "#fff" },
              },
            }}
          />
        </ProcessingProvider>
      </body>
    </html>
  );
}
