
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EmissionForm from '@/components/EmissionForm';
import ResultsDashboard from '@/components/ResultsDashboard';
import ReductionSuggestions from '@/components/ReductionSuggestions';
import { Calculator, Leaf, BarChart3, Lightbulb, Shield, Globe } from 'lucide-react';

type AppState = 'home' | 'form' | 'results' | 'suggestions';

interface EmissionInputs {
  diesel: number;
  electricity: number;
  cement: number;
  steel: number;
  brick: number;
  concrete: number;
}

interface Results {
  total: string;
  categoryEmissions: Array<{
    category: string;
    emissions: string;
    percentage: string;
  }>;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [results, setResults] = useState<Results | null>(null);

  const handleCalculate = (inputs: EmissionInputs, calculatedResults: Results) => {
    setResults(calculatedResults);
    setCurrentState('results');
  };

  const handleBackToForm = () => {
    setCurrentState('form');
  };

  const handleViewSuggestions = () => {
    setCurrentState('suggestions');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setResults(null);
  };

  if (currentState === 'form') {
    return <EmissionForm onCalculate={handleCalculate} />;
  }

  if (currentState === 'results' && results) {
    return (
      <div className="space-y-6">
        <ResultsDashboard results={results} onBack={handleBackToForm} />
        <div className="max-w-6xl mx-auto px-6">
          <Button 
            onClick={handleViewSuggestions}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
            size="lg"
          >
            <Lightbulb className="h-5 w-5 mr-2" />
            View Reduction Strategies
          </Button>
        </div>
      </div>
    );
  }

  if (currentState === 'suggestions' && results) {
    return (
      <div className="space-y-6">
        <ReductionSuggestions totalEmissions={results.total} />
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-4">
            <Button 
              onClick={() => setCurrentState('results')}
              variant="outline"
              className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
            >
              Back to Results
            </Button>
            <Button 
              onClick={handleBackToHome}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              New Calculation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-green-600 text-white rounded-full">
              <Calculator className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Carbon Emission Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Calculate and reduce your construction project's carbon footprint using India-specific emission factors. 
            Follow GHG Protocol standards and ISO 14064 compliance for accurate environmental impact assessment.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow bg-gradient-to-br from-green-100 to-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-800">
                <Shield className="h-6 w-6" />
                GHG Protocol Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">
                Follows international standards for greenhouse gas accounting including Scope 1 & 2 emissions with ISO 14064 alignment.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-100 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-800">
                <Globe className="h-6 w-6" />
                India-Specific Factors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">
                Uses localized emission factors for diesel, electricity, cement, steel, bricks, and concrete specific to Indian conditions.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-100 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-purple-800">
                <BarChart3 className="h-6 w-6" />
                Detailed Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-700">
                Get comprehensive emission breakdowns with visual charts and actionable reduction strategies for your project.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Leaf className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Ready to Calculate Your Impact?</h2>
              </div>
              <p className="text-green-100 mb-6">
                Input your construction materials and energy usage to get detailed carbon emission analysis with reduction recommendations.
              </p>
              <Button 
                onClick={() => setCurrentState('form')}
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Start Calculation
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h3 className="font-semibold text-gray-800 mb-4">Supported Materials & Energy Sources</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                Diesel (litres)
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                Electricity (kWh)
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                Cement (kg)
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Steel (kg)
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                Bricks (pieces)
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-stone-500 rounded-full"></div>
                Concrete (m³)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
