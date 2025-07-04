
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingDown, Leaf, AlertTriangle, Download } from 'lucide-react';

interface CategoryEmission {
  category: string;
  emissions: string;
  percentage: string;
}

interface Results {
  total: string;
  categoryEmissions: CategoryEmission[];
}

interface Props {
  results: Results;
  onBack: () => void;
}

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899'];

const ResultsDashboard: React.FC<Props> = ({ results, onBack }) => {
  const chartData = results.categoryEmissions.map((item, index) => ({
    name: item.category,
    emissions: parseFloat(item.emissions),
    fill: COLORS[index % COLORS.length]
  }));

  const getEmissionLevel = (total: number) => {
    if (total < 1) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
    if (total < 5) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const emissionLevel = getEmissionLevel(parseFloat(results.total));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Card */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
            <Leaf className="h-8 w-8" />
            Carbon Emission Results
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-bold mb-2">{results.total}</div>
          <div className="text-xl">tonnes CO₂e</div>
          <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full ${emissionLevel.bg} ${emissionLevel.color} font-semibold`}>
            <AlertTriangle className="h-4 w-4" />
            {emissionLevel.level} Impact Level
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <TrendingDown className="h-5 w-5" />
              Emissions by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value) => [`${value} tonnes`, 'Emissions']}
                  labelStyle={{ color: '#374151' }}
                />
                <Bar dataKey="emissions" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <TrendingDown className="h-5 w-5" />
              Emission Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="emissions"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} tonnes`, 'Emissions']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-800">Detailed Emission Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.categoryEmissions.map((category, index) => (
              <div key={category.category} className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{category.category}</h3>
                  <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{category.emissions} tonnes</div>
                <div className="text-sm text-gray-600">{category.percentage}% of total</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
        >
          Calculate Again
        </Button>
        <Button 
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => window.print()}
        >
          <Download className="h-4 w-4 mr-2" />
          Print Report
        </Button>
      </div>
    </div>
  );
};

export default ResultsDashboard;
