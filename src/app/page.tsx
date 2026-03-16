import { Navbar, Hero, TargetAudience, Features, HowItWorks, Testimonials, CTA, Footer } from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
      <main>
        <Hero />
        <TargetAudience />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
