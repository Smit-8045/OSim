import React, { useEffect, useRef } from 'react';

const GanttChart = ({ data, currentTime, isRunning, processes }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !data.length) return;
    
    const ctx = canvas.getContext('2d');
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas size
    canvas.width = rect.width * dpr;
    canvas.height = 250 * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = '250px';
    
    ctx.scale(dpr, dpr);
    
    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, 250);
    
    // Calculate dimensions
    const maxTime = Math.max(...data.map(item => item.endTime));
    const timeScale = Math.max(1, (rect.width - 120) / maxTime);
    const barHeight = 50;
    const barY = 100;
    
    // Draw grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= maxTime; i += Math.max(1, Math.ceil(maxTime / 20))) {
      const x = 60 + i * timeScale;
      ctx.beginPath();
      ctx.moveTo(x, barY - 20);
      ctx.lineTo(x, barY + barHeight + 40);
      ctx.stroke();
    }
    
    // Draw time axis
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, barY + barHeight + 20);
    ctx.lineTo(rect.width - 60, barY + barHeight + 20);
    ctx.stroke();
    
    // Draw time markers
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 12px ui-monospace, monospace';
    ctx.textAlign = 'center';
    
    for (let i = 0; i <= maxTime; i += Math.max(1, Math.ceil(maxTime / 20))) {
      const x = 60 + i * timeScale;
      ctx.beginPath();
      ctx.moveTo(x, barY + barHeight + 20);
      ctx.lineTo(x, barY + barHeight + 30);
      ctx.stroke();
      ctx.fillText(i.toString(), x, barY + barHeight + 45);
    }
    
    // Draw Gantt bars with enhanced styling
    function safeColor(color) {
      return /^#[0-9A-Fa-f]{6}$/.test(color) ? color : '#3b82f6';
    }
    data.forEach((item, index) => {
      const x = 60 + item.startTime * timeScale;
      const width = (item.endTime - item.startTime) * timeScale;
      const process = processes.find(p => p.id === item.processId);
      const mainColor = safeColor(process?.color || '#3b82f6');
      
      // Create gradient for bar
      const barGradient = ctx.createLinearGradient(x, barY, x, barY + barHeight);
      barGradient.addColorStop(0, mainColor);
      barGradient.addColorStop(1, adjustBrightness(mainColor, -20));
      
      // Draw shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(x + 2, barY + 2, width, barHeight);
      
      // Draw main bar
      ctx.fillStyle = barGradient;
      ctx.fillRect(x, barY, width, barHeight);
      
      // Draw border with rounded corners effect
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, barY, width, barHeight);
      
      // Draw inner highlight
      ctx.strokeStyle = adjustBrightness(mainColor, 30);
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 1, barY + 1, width - 2, barHeight - 2);
      
      // Draw process name with better styling
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px ui-sans-serif, sans-serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 2;
      ctx.fillText(
        item.processName,
        x + width / 2,
        barY + barHeight / 2 + 5
      );
      ctx.shadowBlur = 0;
      
      // Draw time labels on bars
      if (width > 40) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '10px ui-monospace, monospace';
        ctx.fillText(
          `${item.startTime}-${item.endTime}`,
          x + width / 2,
          barY + barHeight - 8
        );
      }
    });
    
    // Draw current time indicator with enhanced styling
    if (isRunning && currentTime <= maxTime) {
      const x = 60 + currentTime * timeScale;
      
      // Draw animated pulse effect
      const pulseRadius = 8 + Math.sin(Date.now() / 200) * 2;
      const pulseGradient = ctx.createRadialGradient(x, barY - 15, 0, x, barY - 15, pulseRadius);
      pulseGradient.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
      pulseGradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = pulseGradient;
      ctx.fillRect(x - pulseRadius, barY - 15 - pulseRadius, pulseRadius * 2, pulseRadius * 2);
      
      // Draw main indicator line
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(x, barY - 30);
      ctx.lineTo(x, barY + barHeight + 35);
      ctx.stroke();
      
      // Draw indicator arrow
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(x, barY - 30);
      ctx.lineTo(x - 6, barY - 20);
      ctx.lineTo(x + 6, barY - 20);
      ctx.closePath();
      ctx.fill();
      
      // Current time label with enhanced styling
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px ui-sans-serif, sans-serif';
      ctx.textAlign = 'center';
      
      // Draw label background
      const labelWidth = 30;
      const labelHeight = 18;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(x - labelWidth/2, barY - 50, labelWidth, labelHeight);
      
      // Draw label text
      ctx.fillStyle = '#ffffff';
      ctx.fillText(currentTime.toString(), x, barY - 38);
    }
    
    // Draw labels with enhanced styling
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 14px ui-sans-serif, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('CPU Timeline', 50, barY + barHeight / 2 + 5);
    ctx.fillText('Time Units', 50, barY + barHeight + 40);
    
  }, [data, currentTime, isRunning, processes]);
  
  // Helper function to adjust color brightness
  function adjustBrightness(color, amount) {
    const usePound = color[0] === '#';
    const col = usePound ? color.slice(1) : color;
    const num = parseInt(col, 16);
    let r = (num >> 16) + amount;
    let g = (num >> 8 & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;
    r = r > 255 ? 255 : r < 0 ? 0 : r;
    g = g > 255 ? 255 : g < 0 ? 0 : g;
    b = b > 255 ? 255 : b < 0 ? 0 : b;
    return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Gantt Chart Visualization</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live Simulation</span>
        </div>
      </div>
      
      <div ref={containerRef} className="w-full">
        <canvas 
          ref={canvasRef} 
          className="w-full border border-gray-200 rounded-xl shadow-inner"
          style={{ height: '250px' }}
        />
      </div>
      
      {/* Enhanced Legend */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Process Legend</h3>
        <div className="flex flex-wrap gap-4">
          {processes.map(process => (
            <div key={process.id} className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg shadow-sm">
              <div 
                className="w-4 h-4 rounded shadow-sm border border-white"
                style={{ backgroundColor: process.color }}
              />
              <div>
                <span className="text-sm font-medium text-gray-900">{process.name}</span>
                <div className="text-xs text-gray-500">
                  Burst: {process.burstTime}ms | Priority: {process.priority}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;