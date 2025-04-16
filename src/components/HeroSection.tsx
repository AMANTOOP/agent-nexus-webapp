
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white pt-32 pb-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Your Personal App Store for{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Autonomous Intelligence
          </span>
        </h1>
        
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Discover and run powerful AI agents that help you get things done. From shopping assistants to content summarizers, find the perfect AI for any task.
        </p>
        
        <div className="mt-10">
          <Link 
            to="/catalog"
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Explore Agents
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { title: "Shopping", count: "24+ Agents" },
            { title: "Writing", count: "18+ Agents" },
            { title: "Productivity", count: "32+ Agents" },
            { title: "Research", count: "15+ Agents" }
          ].map((category, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <h3 className="font-medium text-gray-900">{category.title}</h3>
              <p className="text-sm text-gray-500">{category.count}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-20 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
      </div>
    </div>
  );
}
