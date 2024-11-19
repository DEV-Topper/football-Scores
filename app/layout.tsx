import "./globals.css";
// import Navbar from "./components/Navbar/index";
// import Footer from "./components/Footer/index";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Unicon Tech | Your Source for Tech Solutions",
  description:
    "Explore cutting-edge tech solutions at Unicon Tech, specializing in innovation and performance.",
  keywords: [
    "Unicon Tech",
    "Unicon",
    "Tech",
    "Build website",
    "Unicon website",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="canonical" href="https://unicon-tech.vercel.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://unicon-tech.vercel.app/",
              name: "Unicon Tech",
              logo: "https://unicon-tech.vercel.app/logo.png",
              sameAs: [
                "https://www.linkedin.com/company/unicon-tech",
                "https://twitter.com/unicon_tech",
              ],
            }),
          }}
        />
        <meta property="og:title" content="Unicon Tech" />
        <meta
          property="og:description"
          content="Your source for tech solutions."
        />
        <meta property="og:url" content="https://unicon-tech.vercel.app/" />
        <meta
          property="og:image"
          content="https://unicon-tech.vercel.app/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
