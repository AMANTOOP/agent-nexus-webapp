
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AgentResultProps {
  result: any;
  agentId: string;
}

export function AgentResult({ result, agentId }: AgentResultProps) {
  // Helper function to render different result types based on agent ID
  const renderResultContent = () => {
    if (!result) return null;

    switch (agentId) {
      case "1": // Shopping Assistant
        return (
          <>
            <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h3 className="font-medium text-lg mb-2">Best Recommendation</h3>
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h4 className="font-bold text-xl">{result.bestRecommendation.name}</h4>
                  <p className="text-green-600 font-medium">{result.bestRecommendation.price}</p>
                  <ul className="mt-2 space-y-1">
                    {result.bestRecommendation.features.map((feature: string, i: number) => (
                      <li key={i} className="text-sm flex items-center">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-lg mb-2">Reasoning</h3>
              <p className="text-gray-600">{result.reasoning}</p>
            </div>

            {result.topResults && (
              <div>
                <h3 className="font-medium text-lg mb-2">Other Top Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.topResults.slice(0, 3).map((product: any, i: number) => (
                    <Card key={i} className={i === 0 ? "border-primary/30" : ""}>
                      <CardHeader className="p-3 pb-0">
                        <CardTitle className="text-md">{product.name}</CardTitle>
                        <CardDescription className="text-green-600">{product.price}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-3">
                        <ul className="space-y-1">
                          {product.features.slice(0, 2).map((feature: string, j: number) => (
                            <li key={j} className="text-xs text-gray-600">{feature}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        );

      case "2": // Content Summarizer
        return (
          <>
            <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h3 className="font-medium text-lg mb-2">Summary</h3>
              <p className="text-gray-700">{result.summary}</p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Key Points</h3>
              <ul className="space-y-2">
                {result.keyPoints.map((point: string, i: number) => (
                  <li key={i} className="flex">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">
                      {i + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        );

      case "3": // Travel Planner
        return (
          <>
            <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex flex-wrap justify-between mb-4">
                <div>
                  <h3 className="font-medium text-lg">Travel Itinerary</h3>
                  <h4 className="font-bold text-2xl">{result.itinerary.destination}</h4>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Duration</span>
                  <p className="font-medium">{result.itinerary.duration}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Budget</span>
                  <p className="font-medium">{result.itinerary.budget}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-lg mb-3">Daily Schedule</h3>
              <div className="space-y-4">
                {result.itinerary.schedule.map((day: any, i: number) => (
                  <Card key={i}>
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="flex justify-between items-center">
                        <span>Day {day.day}</span>
                        <span className="text-sm font-normal text-gray-500">{day.location}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <ul className="space-y-1">
                        {day.activities.map((activity: string, j: number) => (
                          <li key={j} className="text-sm">• {activity}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Recommendations</h3>
              <ul className="space-y-1">
                {result.itinerary.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="flex items-start pb-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                    <span className="text-gray-600">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        );

      default:
        return (
          <div className="p-4 bg-yellow-50 text-yellow-800 rounded">
            No specific result formatter available for this agent.
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      {renderResultContent()}
    </div>
  );
}
