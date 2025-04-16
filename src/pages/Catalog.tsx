
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgentCard } from "@/components/AgentCard";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface Agent {
  id: string;
  name: string;
  description: string;
  tags: string[];
  icon: string;
  category: string;
  popularityScore: number;
  usageCount: number;
}

export default function Catalog() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract categories and tags from agents
  const categories = [...new Set(agents.map(agent => agent.category))];
  const allTags = [...new Set(agents.flatMap(agent => agent.tags))];

  // Filter agents based on search query, selected category, and tags
  useEffect(() => {
    const filtered = agents.filter(agent => {
      const matchesSearch = !searchQuery || 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || agent.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => agent.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });
    
    setFilteredAgents(filtered);
  }, [agents, searchQuery, selectedCategory, selectedTags]);

  useEffect(() => {
    // Get category parameter from URL if it exists
    const queryParams = new URLSearchParams(window.location.search);
    const categoryParam = queryParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1));
    }
    
    // In a real app, this would be an API call
    const fetchAgents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/src/data/agents.json');
        const data = await response.json();
        setAgents(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching agents:", error);
        // If fetch fails, use import for local development
        import('../data/agents.json')
          .then((module) => {
            setAgents(module.default);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Failed to load local data:", err);
            setIsLoading(false);
          });
      }
    };

    fetchAgents();
  }, []);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agent Catalog</h1>
              <p className="mt-2 text-gray-600">
                Browse our collection of specialized AI agents
              </p>
            </div>
            <div className="mt-4 md:mt-0 relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search agents..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Filters */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <h3 className="font-medium">Filters</h3>
            </div>
            
            {/* Categories filter */}
            <div className="mb-4">
              <h4 className="text-sm text-gray-500 mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      selectedCategory === category 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-primary/50'
                    } transition-colors`}
                    onClick={() => {
                      setSelectedCategory(
                        selectedCategory === category ? null : category
                      );
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tags filter */}
            <div>
              <h4 className="text-sm text-gray-500 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      selectedTags.includes(tag) 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-primary/50'
                    } transition-colors`}
                    onClick={() => toggleTag(tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Active filters */}
            {(selectedCategory || selectedTags.length > 0 || searchQuery) && (
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {selectedCategory && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory(null)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    #{tag}
                    <button onClick={() => toggleTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
                <button 
                  className="text-sm text-primary hover:underline"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedTags([]);
                    setSearchQuery("");
                  }}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
          
          {/* Agent grid */}
          {isLoading ? (
            <div className="py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No agents found</h3>
              <p className="text-gray-600 mt-2">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
