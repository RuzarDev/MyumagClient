"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data that matches the pattern from the image






interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Выручка: {payload[0].value.toLocaleString('ru-RU')} KZT
          </p>
        </div>
    );
  }
  return null;
};

const formatYAxis = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }
  return value.toString();
};

export default function RevenueDashboard(props) {
  const [activeTab, setActiveTab] = useState('день');
  const monthData = props.month;
  const dayData = props.day

  const getData = () => {
    switch (activeTab) {
      case 'месяц':
        return monthData;
      default:
        return dayData;
    }
  };

  const getMaxValue = () => {
    const data = getData();
    return Math.max(...data.map(item => item.value));
  };

  return (
      <Card className="w-full max-w-10xl mx-auto bg-white shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Выручка</h2>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-10/16 grid-cols-3 mb-6 bg-gray-100">
              <TabsTrigger
                  value="день"
                  className="px-6 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                День
              </TabsTrigger>

              {dayData.length>=32 &&
                  <TabsTrigger
                      value="месяц"
                      className="px-6 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Месяц
                  </TabsTrigger>}
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                      data={getData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        opacity={0.5}
                    />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        interval={activeTab === 'день' ? 2 : 0}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        tickFormatter={formatYAxis}
                        domain={[0, getMaxValue(  ) * 1.1]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{
                          fill: '#3b82f6',
                          strokeWidth: 2,
                          r: 4,
                          stroke: '#ffffff'
                        }}
                        activeDot={{
                          r: 6,
                          stroke: '#3b82f6',
                          strokeWidth: 2,
                          fill: '#ffffff'
                        }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
  );
}