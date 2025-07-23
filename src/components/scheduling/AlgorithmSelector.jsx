import React from 'react';
import { HelpCircle, Settings, Info } from 'lucide-react';

const AlgorithmSelector = ({ value, onChange, timeQuantum, onTimeQuantumChange }) => {
  const algorithms = [
    {
      id: 'fcfs',
      name: 'First Come First Serve (FCFS)',
      description: 'Processes are executed in order of arrival',
      complexity: 'O(n)',
      pros: 'Simple, fair ordering',
      cons: 'Convoy effect, poor response time'
    },
    {
      id: 'sjf',
      name: 'Shortest Job First (SJF)',
      description: 'Shortest process is executed first',
      complexity: 'O(n log n)',
      pros: 'Optimal average waiting time',
      cons: 'Starvation of long processes'
    },
    {
      id: 'roundRobin',
      name: 'Round Robin',
      description: 'Each process gets a fixed time quantum',
      complexity: 'O(n)',
      pros: 'Fair, good response time',
      cons: 'Context switching overhead'
    },
    {
      id: 'priority',
      name: 'Priority Scheduling',
      description: 'Processes with higher priority execute first',
      complexity: 'O(n log n)',
      pros: 'Important processes first',
      cons: 'Starvation possible'
    }
  ];

  const selectedAlgorithm = algorithms.find(alg => alg.id === value);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-3">
          <Settings className="h-5 w-5 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">Algorithm:</label>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm min-w-[200px]"
          >
            {algorithms.map(alg => (
              <option key={alg.id} value={alg.id}>
                {alg.name}
              </option>
            ))}
          </select>
        </div>
        
        {value === 'roundRobin' && (
          <div className="flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-xl">
            <label className="text-sm font-medium text-blue-700">Time Quantum:</label>
            <input
              type="number"
              value={timeQuantum}
              onChange={(e) => onTimeQuantumChange(Number(e.target.value))}
              min="1"
              max="10"
              className="w-16 px-2 py-1 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-mono"
            />
            <span className="text-sm text-blue-600">ms</span>
          </div>
        )}
      </div>
      
      {selectedAlgorithm && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">{selectedAlgorithm.name}</h3>
                <p className="text-blue-700 text-sm">{selectedAlgorithm.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-white/50 rounded-lg p-2">
                  <span className="font-medium text-blue-800">Complexity:</span>
                  <span className="ml-1 font-mono text-blue-600">{selectedAlgorithm.complexity}</span>
                </div>
                <div className="bg-white/50 rounded-lg p-2">
                  <span className="font-medium text-green-800">Pros:</span>
                  <span className="ml-1 text-green-700">{selectedAlgorithm.pros}</span>
                </div>
                <div className="bg-white/50 rounded-lg p-2">
                  <span className="font-medium text-red-800">Cons:</span>
                  <span className="ml-1 text-red-700">{selectedAlgorithm.cons}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmSelector;