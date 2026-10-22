
import CTASection from "../src/components/home/cta-section";
import FeaturesSection from "../src/components/home/features-section";
import HeroSection from "../src/components/home/hero-section";
import HowItWorks from "../src/components/home/how-it-works";



function App() {
  return (
    <div className="min-h-screen bg-white">
   

      <main>
        <HeroSection />
        <FeaturesSection/>
     
        <HowItWorks/>
        <CTASection/>
    
      </main>
    </div>
  );
}

export default App;