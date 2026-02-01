import { Navbar, Hero, Marquee, Stats, Problem, Features, HowItWorks, TargetAudience, Examples, Pricing, FAQ, Footer } from "@/components/landing";

export default function Home() {
  return (
    <main className="bg-background-dark min-h-screen text-foreground selection:bg-primary/30">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] bg-center" />
      </div>

      <Navbar />
      <Hero />
      <Marquee />
      <Problem />
      <Stats />
      <Features />
      <HowItWorks />
      <TargetAudience />
      <Examples />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
