
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Fuel, Zap, Building, Hammer, Home, Package } from 'lucide-react';

interface EmissionInputs {
  diesel: number;
  electricity: number;
  cement: number;
  steel: number;
  brick: number;
  concrete: number;
}

interface Props {
  onCalculate: (inputs: EmissionInputs, results: any) => void;
}

const EMISSION_FACTORS = {
  diesel: 2.68,       // kg CO2 per litre
  electricity: 0.82,  // kg CO2 per kWh
  cement: 0.93,       // kg CO2 per kg
  steel: 2.0,         // kg CO2 per kg
  brick: 0.25,        // kg CO2 per brick
  concrete: 350.0     // kg CO2 per m³
};

const EmissionForm: React.FC<Props> = ({ onCalculate }) => {
  const [inputs, setInputs] = useState<EmissionInputs>({
    diesel: 0,
    electricity: 0,
    cement: 0,
    steel: 0,
    brick: 0,
    concrete: 0
  });

  const handleInputChange = (field: keyof EmissionInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const calculateEmissions = () => {
    const categoryEmissions = {
      diesel: (inputs.diesel || 0) * EMISSION_FACTORS.diesel,
      electricity: (inputs.electricity || 0) * EMISSION_FACTORS.electricity,
      cement: (inputs.cement || 0) * EMISSION_FACTORS.cement,
      steel: (inputs.steel || 0) * EMISSION_FACTORS.steel,
      brick: (inputs.brick || 0) * EMISSION_FACTORS.brick,
      concrete: (inputs.concrete || 0) * EMISSION_FACTORS.concrete
    };

    const totalKg = Object.values(categoryEmissions).reduce((sum, emission) => sum + emission, 0);
    const totalTonnes = (totalKg / 1000).toFixed(2);

    const results = {
      total: totalTonnes,
      categoryEmissions: Object.entries(categoryEmissions).map(([key, value]) => ({
        category: key.charAt(0).toUpperCase() + key.slice(1),
        emissions: (value / 1000).toFixed(3),
        percentage: ((value / totalKg) * 100).toFixed(1)
      }))
    };

    onCalculate(inputs, results);
  };

  const inputFields = [
    { key: 'diesel', label: 'Diesel Usage', unit: 'litres', icon: Fuel, color: 'text-orange-600' },
    { key: 'electricity', label: 'Electricity Consumption', unit: 'kWh', icon: Zap, color: 'text-yellow-600' },
    { key: 'cement', label: 'Cement', unit: 'kg', icon: Building, color: 'text-gray-600' },
    { key: 'steel', label: 'Steel', unit: 'kg', icon: Hammer, color: 'text-blue-600' },
    { key: 'brick', label: 'Bricks', unit: 'pieces', icon: Home, color: 'text-red-600' },
    { key: 'concrete', label: 'Concrete', unit: 'm³', icon: Package, color: 'text-stone-600' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-blue-50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-800 flex items-center justify-center gap-3">
            <Calculator className="h-8 w-8" />
            Carbon Emission Calculator
          </CardTitle>
          <p className="text-green-700 mt-2">
            Calculate your construction project's carbon footprint using India-specific emission factors
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inputFields.map(({ key, label, unit, icon: Icon, color }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Icon className={`h-4 w-4 ${color}`} />
                  {label}
                </Label>
                <div className="relative">
                  <Input
                    id={key}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0"
                    value={inputs[key as keyof EmissionInputs] || ''}
                    onChange={(e) => handleInputChange(key as keyof EmissionInputs, e.target.value)}
                    className="pr-16 border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                    {unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">India-Specific Emission Factors:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
              <div>Diesel: 2.68 kg CO₂/L</div>
              <div>Electricity: 0.82 kg CO₂/kWh</div>
              <div>Cement: 0.93 kg CO₂/kg</div>
              <div>Steel: 2.0 kg CO₂/kg</div>
              <div>Brick: 0.25 kg CO₂/piece</div>
              <div>Concrete: 350 kg CO₂/m³</div>
            </div>
          </div>

          <Button 
            onClick={calculateEmissions}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg"
            size="lg"
          >
            Calculate Carbon Emissions
          </Button>

          <p className="text-xs text-gray-500 text-center">
            * Calculations follow GHG Protocol (Scope 1 & 2) and align with ISO 14064 standards
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmissionForm;
