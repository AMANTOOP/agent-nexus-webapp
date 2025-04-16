
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-xl font-bold text-primary flex items-center">
              <span className="bg-primary text-white p-1 rounded mr-2">AI</span>
              Agent Marketplace
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Your personal app store for autonomous intelligence.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary">Features</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary">Use Cases</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary">Pricing</Link></li>
              <li><Link to="/catalog" className="text-sm text-gray-600 hover:text-primary">Browse Agents</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary">Documentation</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary">Blog</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary">Support</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary">About</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary">Careers</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AI Agent Marketplace. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="#" className="text-xs text-gray-500 hover:text-primary mr-6">
              Privacy
            </Link>
            <Link to="#" className="text-xs text-gray-500 hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
