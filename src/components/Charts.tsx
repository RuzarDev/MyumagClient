import { useRef, useEffect } from 'react';

interface ChartDataPoint {
  name: string;
  value: number;
  color: string;
}

interface LineChartProps {
  data?: { date: string; revenue: number; profit?: number }[];
}

export const LineChart = ({ data = [] }: LineChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (data.length === 0) {
      // Draw placeholder text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No data available for this chart', canvas.width / 2, canvas.height / 2);
      return;
    }
    
    // Set dimensions
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    
    // Find max value for scaling
    const maxValue = Math.max(...data.map(d => d.revenue));
    
    // Calculate scales
    const xScale = (width - padding * 2) / (data.length - 1);
    const yScale = (height - padding * 2) / maxValue;
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0';
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw grid lines
    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0';
    for (let i = 1; i <= 5; i++) {
      const y = height - padding - (i * (height - padding * 2) / 5);
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      
      // Draw y-axis labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText((maxValue * i / 5).toLocaleString('ru-RU'), padding - 10, y + 3);
    }
    ctx.stroke();
    
    // Draw revenue line
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    data.forEach((d, i) => {
      const x = padding + i * xScale;
      const y = height - padding - d.revenue * yScale;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    
    // Draw points
    data.forEach((d, i) => {
      const x = padding + i * xScale;
      const y = height - padding - d.revenue * yScale;
      
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.stroke();
    });
    
    // Draw profit line if available
    if (data[0]?.profit !== undefined) {
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      data.forEach((d, i) => {
        const x = padding + i * xScale;
        const y = height - padding - (d.profit || 0) * yScale;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
      
      // Draw points for profit
      data.forEach((d, i) => {
        if (d.profit === undefined) return;
        
        const x = padding + i * xScale;
        const y = height - padding - d.profit * yScale;
        
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.stroke();
      });
    }
    
    // Draw x-axis labels (every nth label to avoid overcrowding)
    const labelInterval = Math.ceil(data.length / 10);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    data.forEach((d, i) => {
      if (i % labelInterval === 0 || i === data.length - 1) {
        const x = padding + i * xScale;
        ctx.fillText(d.date, x, height - padding + 15);
      }
    });
    
  }, [data]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={800}
      height={400}
      className="w-full h-full"
    />
  );
};

export const BarChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set dimensions
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    
    // Mock data
    const data = [
      { label: 'Mon', value: 350000 },
      { label: 'Tue', value: 450000 },
      { label: 'Wed', value: 550000 },
      { label: 'Thu', value: 500000 },
      { label: 'Fri', value: 620000 },
      { label: 'Sat', value: 750000 },
      { label: 'Sun', value: 400000 },
    ];
    
    // Find max value for scaling
    const maxValue = Math.max(...data.map(d => d.value));
    
    // Calculate scales
    const barWidth = (width - padding * 2) / data.length - 10;
    const yScale = (height - padding * 2) / maxValue;
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0';
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw grid lines
    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0';
    for (let i = 1; i <= 5; i++) {
      const y = height - padding - (i * (height - padding * 2) / 5);
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      
      // Draw y-axis labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText((maxValue * i / 5).toLocaleString('ru-RU'), padding - 10, y + 3);
    }
    ctx.stroke();
    
    // Draw bars
    data.forEach((d, i) => {
      const x = padding + i * ((width - padding * 2) / data.length) + 5;
      const barHeight = d.value * yScale;
      const y = height - padding - barHeight;
      
      // Draw bar
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Draw x-axis label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.label, x + barWidth / 2, height - padding + 15);
    });
    
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={800}
      height={400}
      className="w-full h-full"
    />
  );
};

export const PieChart = ({ data = [] }: { data?: ChartDataPoint[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (data.length === 0) {
      // Use default data if none provided
      data = [
        { name: 'Category 1', value: 40, color: '#3B82F6' },
        { name: 'Category 2', value: 30, color: '#10B981' },
        { name: 'Category 3', value: 20, color: '#F97316' },
        { name: 'Category 4', value: 10, color: '#8B5CF6' },
      ];
    }
    
    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Set dimensions
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 60;
    
    // Draw pie chart
    let startAngle = 0;
    
    data.forEach(item => {
      // Calculate slice angle
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Fill slice
      ctx.fillStyle = item.color;
      ctx.fill();
      
      // Prepare for next slice
      startAngle = endAngle;
    });
    
    // Draw donut hole
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // Draw center text
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Total', centerX, centerY - 10);
    
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(total.toLocaleString('ru-RU'), centerX, centerY + 15);
    
    // Draw legend
    const legendX = width - 40;
    const legendY = height / 2 - ((data.length * 25) / 2);
    
    data.forEach((item, index) => {
      const y = legendY + index * 25;
      
      // Draw legend color box
      ctx.fillStyle = item.color;
      ctx.fillRect(legendX - 120, y - 8, 16, 16);
      
      // Draw legend text
      ctx.fillStyle = '#64748b';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(item.name, legendX - 100, y);
      
      // Draw legend percentage
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.round((item.value / total) * 100)}%`, legendX - 10, y);
    });
    
  }, [data]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={800}
      height={400}
      className="w-full h-full"
    />
  );
};