
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    description: string;
    tags: string[];
    icon: string;
    category: string;
    popularityScore: number;
    usageCount: number;
  };
}

export function AgentCard({ agent }: AgentCardProps) {
  // Dynamically get the icon from Lucide icons
  const IconComponent = (LucideIcons as any)[agent.icon.charAt(0).toUpperCase() + agent.icon.slice(1)] || LucideIcons.Bot;
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-md">
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{agent.name}</h3>
            <p className="text-xs text-muted-foreground">{agent.category}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <LucideIcons.Star className="h-3 w-3 text-yellow-500 mr-1" />
            <span className="text-xs font-medium">{agent.popularityScore}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600">{agent.description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {agent.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{agent.usageCount.toLocaleString()} uses</span>
        <Link 
          to={`/agent/${agent.id}`} 
          className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Run Agent
        </Link>
      </CardFooter>
    </Card>
  );
}
