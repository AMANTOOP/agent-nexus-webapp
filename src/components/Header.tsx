
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener to create a solid background when scrolled
  useState(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300", 
        isScrolled ? "bg-white shadow-sm py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold text-primary flex items-center">
          <span className="bg-primary text-white p-1 rounded mr-2">AI</span>
          Agent Marketplace
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">
            Browse Agents
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">
            Categories
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Search className="h-5 w-5 text-gray-600" />
          </button>
          <button className="hidden md:block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
