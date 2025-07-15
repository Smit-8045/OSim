import React from 'react';
import { Edit2, Trash2, Clock, Zap, Target } from 'lucide-react';

const ProcessTable = ({ processes, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Process Management</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{processes.length} processes</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>Process</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Arrival Time</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Burst Time</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Color Theme
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {processes.map((process, index) => (
              <tr key={process.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-6 h-6 rounded-lg shadow-md border-2 border-white"
                      style={{ backgroundColor: process.color }}
                    />
                    <div>
                      <span className="text-sm font-bold text-gray-900">{process.name}</span>
                      <div className="text-xs text-gray-500">Process #{index + 1}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono font-bold text-gray-900 bg-blue-50 px-2 py-1 rounded-lg">
                      {process.arrivalTime}
                    </span>
                    <span className="text-xs text-gray-500">ms</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono font-bold text-gray-900 bg-green-50 px-2 py-1 rounded-lg">
                      {process.burstTime}
                    </span>
                    <span className="text-xs text-gray-500">ms</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      process.priority === 1 ? 'bg-red-100 text-red-700' :
                      process.priority === 2 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {process.priority}
                    </span>
                    <span className="text-xs text-gray-500">
                      {process.priority === 1 ? 'High' : process.priority === 2 ? 'Medium' : 'Low'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-lg border-2 border-gray-200 shadow-sm"
                      style={{ backgroundColor: process.color }}
                    />
                    <div>
                      <span className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
                        {process.color}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(process)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Edit Process"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(process.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Delete Process"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {processes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No processes defined</h3>
          <p className="text-gray-500">Add some processes to start the simulation</p>
        </div>
      )}
    </div>
  );
};

export default ProcessTable;