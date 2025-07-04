
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Leaf, Recycle, Zap, Building, Fuel } from 'lucide-react';

interface Props {
  totalEmissions: string;
}

const ReductionSuggestions: React.FC<Props> = ({ totalEmissions }) => {
  const suggestions = [
    {
      icon: Fuel,
      title: "Optimize Equipment Usage",
      description: "Use energy-efficient construction equipment and maintain regular servicing schedules.",
      impact: "10-15% reduction",
      color: "text-orange-600 bg-orange-100"
    },
    {
      icon: Zap,
      title: "Renewable Energy Sources",
      description: "Switch to solar power for construction sites and use LED lighting systems.",
      impact: "20-30% reduction",
      color: "text-yellow-600 bg-yellow-100"
    },
    {
      icon: Building,
      title: "Sustainable Materials",
      description: "Use fly ash concrete, recycled steel, and locally sourced materials to reduce transport emissions.",
      impact: "15-25% reduction",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: Recycle,
      title: "Waste Management",
      description: "Implement proper waste segregation and recycling programs on construction sites.",
      impact: "5-10% reduction",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Leaf,
      title: "Green Building Practices",
      description: "Follow green building standards like IGBC and use prefabricated components.",
      impact: "25-40% reduction",
      color: "text-emerald-600 bg-emerald-100"
    }
  ];

  const emissionLevel = parseFloat(totalEmissions);
  const priority = emissionLevel > 5 ? "High Priority" : emissionLevel > 2 ? "Medium Priority" : "Maintain Current Practices";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-blue-50 mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-800 flex items-center justify-center gap-3">
            <Lightbulb className="h-6 w-6" />
            Carbon Reduction Strategies
          </CardTitle>
          <p className="text-green-700 mt-2">
            Actionable recommendations to reduce your construction project's carbon footprint
          </p>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-lg border border-green-200 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Current Emissions: {totalEmissions} tonnes CO₂e</h3>
                <p className="text-sm text-gray-600">Reduction Priority: <span className="font-semibold">{priority}</span></p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {emissionLevel > 5 ? '50-70%' : emissionLevel > 2 ? '30-50%' : '20-30%'}
                </div>
                <div className="text-sm text-gray-600">Potential Reduction</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${suggestion.color}`}>
                      <suggestion.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">{suggestion.title}</h3>
                      <p className="text-gray-600 mb-3">{suggestion.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                          Impact: {suggestion.impact}
                        </span>
                        <span className="text-xs text-gray-500">
                          Recommended for Indian construction sites
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Additional Resources</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Bureau of Energy Efficiency (BEE) guidelines for construction</li>
              <li>• Indian Green Building Council (IGBC) certification programs</li>
              <li>• Ministry of Environment & Climate Change emission standards</li>
              <li>• Carbon Trust footprint calculation methodologies</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReductionSuggestions;
