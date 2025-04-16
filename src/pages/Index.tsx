
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedAgents } from "@/components/FeaturedAgents";
import { CategorySection } from "@/components/CategorySection";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedAgents />
        <CategorySection />
        
        {/* Testimonials/How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
              <p className="mt-2 text-gray-600">Getting started with our AI agents is simple</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Browse Agents",
                  description: "Explore our catalog of specialized AI agents designed for specific tasks"
                },
                {
                  step: "2",
                  title: "Choose & Run",
                  description: "Select the perfect agent for your needs and provide your specific requirements"
                },
                {
                  step: "3",
                  title: "Get Results",
                  description: "Receive personalized, intelligent results in seconds, not minutes"
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-xl font-medium">{item.title}</h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold">Ready to experience AI agents?</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              Browse our catalog of specialized agents and find the perfect AI assistant for any task.
            </p>
            <div className="mt-8">
              <a 
                href="/catalog" 
                className="bg-white text-primary px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Explore Agents
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
