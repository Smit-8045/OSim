import React from 'react';
import { TrendingUp, Clock, Zap, Cpu, BarChart3, Target } from 'lucide-react';

const PerformanceMetrics = ({ metrics }) => {
  const metricCards = [
    {
      title: 'Average Turnaround Time',
      value: metrics.averageTurnaroundTime?.toFixed(2) || '0.00',
      unit: 'ms',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      description: 'Time from arrival to completion'
    },
    {
      title: 'Average Waiting Time',
      value: metrics.averageWaitingTime?.toFixed(2) || '0.00',
      unit: 'ms',
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100',
      description: 'Time spent waiting in ready queue'
    },
    {
      title: 'Average Response Time',
      value: metrics.averageResponseTime?.toFixed(2) || '0.00',
      unit: 'ms',
      icon: Zap,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      description: 'Time from arrival to first execution'
    },
    {
      title: 'CPU Utilization',
      value: metrics.cpuUtilization?.toFixed(1) || '0.0',
      unit: '%',
      icon: Cpu,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      description: 'Percentage of time CPU is busy'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Performance Metrics</h2>
        <BarChart3 className="h-5 w-5 text-blue-500" />
      </div>
      
      <div className="space-y-4">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className={`bg-gradient-to-r ${metric.bgColor} rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all duration-200`}>
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color} shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-1">{metric.title}</div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className="text-sm font-medium text-gray-500">{metric.unit}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{metric.description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {metrics.processMetrics && (
        <div className="mt-8">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-5 w-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-gray-900">Individual Process Metrics</h3>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-gray-700 font-semibold">Process</th>
                    <th className="text-left py-3 text-gray-700 font-semibold">Turnaround</th>
                    <th className="text-left py-3 text-gray-700 font-semibold">Waiting</th>
                    <th className="text-left py-3 text-gray-700 font-semibold">Response</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.processMetrics.map((process, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-white/50 transition-colors">
                      <td className="py-3">
                        <span className="font-medium text-gray-900 bg-white px-2 py-1 rounded-lg">
                          {process.name}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                          {process.turnaroundTime}ms
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="font-mono text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg">
                          {process.waitingTime}ms
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="font-mono text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                          {process.responseTime}ms
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Performance Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
        <h4 className="font-semibold text-indigo-900 mb-2">Performance Summary</h4>
        <div className="text-sm text-indigo-700">
          {metrics.averageWaitingTime && metrics.averageWaitingTime < 5 && (
            <p className="text-green-700">✓ Excellent waiting time performance</p>
          )}
          {metrics.cpuUtilization && metrics.cpuUtilization > 90 && (
            <p className="text-green-700">✓ High CPU utilization achieved</p>
          )}
          {metrics.averageResponseTime && metrics.averageResponseTime < 3 && (
            <p className="text-green-700">✓ Great response time for interactive processes</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;