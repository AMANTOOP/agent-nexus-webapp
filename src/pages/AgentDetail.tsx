
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AgentResult } from "@/components/AgentResult";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";

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

export default function AgentDetail() {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchAgent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/src/data/agents.json');
        const data = await response.json();
        const foundAgent = data.find((a: Agent) => a.id === id);
        setAgent(foundAgent || null);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching agent:", error);
        // If fetch fails, use import for local development
        import('../data/agents.json')
          .then((module) => {
            const foundAgent = module.default.find((a: Agent) => a.id === id);
            setAgent(foundAgent || null);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Failed to load local data:", err);
            setIsLoading(false);
          });
      }
    };

    fetchAgent();
  }, [id]);

  const runAgent = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    setResult(null);
    
    try {
      // In a real app, this would be an API call to run the agent
      // Here we're using mock data from our JSON file
      const response = await fetch('/src/data/mockResponses.json');
      const mockResponses = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (id && mockResponses[id]) {
        setResult(mockResponses[id]);
      } else {
        setResult({ error: "No mock response available for this agent" });
      }
    } catch (error) {
      console.error("Error running agent:", error);
      // If fetch fails, use import for local development
      try {
        const mockModule = await import('../data/mockResponses.json');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (id && mockModule.default[id]) {
          setResult(mockModule.default[id]);
        } else {
          setResult({ error: "No mock response available for this agent" });
        }
      } catch (err) {
        console.error("Failed to load mock response:", err);
        setResult({ error: "Failed to load response" });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Get icon component
  const IconComponent = agent?.icon ? 
    (LucideIcons as any)[agent.icon.charAt(0).toUpperCase() + agent.icon.slice(1)] || LucideIcons.Bot :
    LucideIcons.Bot;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Agent not found</h1>
          <p className="text-gray-600">The agent you're looking for doesn't exist or has been removed.</p>
          <a href="/catalog" className="mt-6 text-primary hover:underline">
            Browse all agents
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <a href="/catalog" className="text-sm text-primary hover:underline inline-flex items-center">
              <LucideIcons.ChevronLeft className="h-4 w-4 mr-1" />
              Back to catalog
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Agent info section */}
            <div className="w-full md:w-1/3">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h1 className="text-2xl font-bold">{agent.name}</h1>
                    <p className="text-sm text-muted-foreground">{agent.category}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{agent.description}</p>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {agent.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <LucideIcons.Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{agent.popularityScore.toFixed(1)}/5.0</span>
                  </div>
                  <span>{agent.usageCount.toLocaleString()} uses</span>
                </div>
              </Card>

              <Card className="p-6 mt-6">
                <h3 className="font-medium mb-4">Sample Prompts</h3>
                <ul className="space-y-3">
                  {[
                    agent.id === "1" ? "Find me a phone under ₹25,000" : null,
                    agent.id === "1" ? "Recommend a laptop for video editing under $1200" : null,
                    agent.id === "2" ? "Summarize this article about climate change" : null,
                    agent.id === "2" ? "Create bullet points from this research paper" : null,
                    agent.id === "3" ? "Plan a 7-day trip to Japan for two people" : null,
                    agent.id === "3" ? "Weekend getaway ideas near New York City" : null,
                  ]
                    .filter(Boolean)
                    .map((prompt, i) => (
                      <li 
                        key={i} 
                        className="text-sm p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                        onClick={() => setPrompt(prompt || "")}
                      >
                        {prompt}
                      </li>
                    ))
                  }
                </ul>
              </Card>
            </div>
            
            {/* Agent interaction section */}
            <div className="w-full md:w-2/3">
              <Card className="p-6 mb-6">
                <h2 className="text-lg font-medium mb-3">What would you like help with?</h2>
                <Textarea
                  placeholder={`Enter your request for the ${agent.name}...`}
                  className="min-h-24 mb-4"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button 
                  className="w-full"
                  disabled={isProcessing || !prompt.trim()} 
                  onClick={runAgent}
                >
                  {isProcessing ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Run Agent'
                  )}
                </Button>
              </Card>
              
              {/* Results section */}
              {isProcessing ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <LoadingSpinner size="lg" className="mb-4" />
                  <h3 className="font-medium">Analyzing your request...</h3>
                  <p className="text-sm text-gray-500 mt-2">This might take a few moments</p>
                </div>
              ) : result ? (
                <div>
                  <h2 className="text-lg font-medium mb-4">Results</h2>
                  <AgentResult result={result} agentId={agent.id} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
