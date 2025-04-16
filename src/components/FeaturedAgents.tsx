
import { useState, useEffect } from "react";
import { AgentCard } from "./AgentCard";

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

export function FeaturedAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchAgents = async () => {
      try {
        const response = await fetch('/src/data/agents.json');
        const data = await response.json();
        // Get top 4 agents by popularity
        const topAgents = [...data].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 4);
        setAgents(topAgents);
      } catch (error) {
        console.error("Error fetching agents:", error);
        // If fetch fails, use import for local development
        import('../data/agents.json')
          .then((module) => {
            const topAgents = [...module.default].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 4);
            setAgents(topAgents);
          })
          .catch((err) => console.error("Failed to load local data:", err));
      }
    };

    fetchAgents();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Agents</h2>
            <p className="mt-2 text-gray-600">Discover our most popular AI agents</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
}
