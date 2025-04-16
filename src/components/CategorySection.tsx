
import { ArrowRight, ShoppingBag, FileText, Map, Code, HeartPulse, BarChart2, Utensils, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Shopping", icon: ShoppingBag, color: "bg-blue-500", textColor: "text-blue-500" },
  { name: "Writing", icon: FileText, color: "bg-purple-500", textColor: "text-purple-500" },
  { name: "Travel", icon: Map, color: "bg-green-500", textColor: "text-green-500" },
  { name: "Development", icon: Code, color: "bg-yellow-500", textColor: "text-yellow-500" },
  { name: "Health", icon: HeartPulse, color: "bg-pink-500", textColor: "text-pink-500" },
  { name: "Finance", icon: BarChart2, color: "bg-indigo-500", textColor: "text-indigo-500" },
  { name: "Food", icon: Utensils, color: "bg-red-500", textColor: "text-red-500" },
  { name: "Education", icon: BookOpen, color: "bg-cyan-500", textColor: "text-cyan-500" }
];

export function CategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
          <p className="mt-2 text-gray-600">Find the perfect AI agent for your specific needs</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/catalog?category=${category.name.toLowerCase()}`}
              className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`p-3 ${category.color} bg-opacity-10 rounded-full`}>
                <category.icon className={`h-7 w-7 ${category.textColor}`} />
              </div>
              <h3 className="mt-4 font-medium text-gray-900">{category.name}</h3>
              <span className="mt-1 text-xs text-gray-500">View agents</span>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/catalog"
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            View all categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
