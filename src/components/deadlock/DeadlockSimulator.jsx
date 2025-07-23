import React, { useState } from 'react';
import { AlertTriangle, Plus, Shield, Users, Package } from 'lucide-react';

const DeadlockSimulator = () => {
  const [processes, setProcesses] = useState([
    { id: 'P1', name: 'Process 1', allocation: [0, 1, 0], max: [7, 5, 3], need: [7, 4, 3] },
    { id: 'P2', name: 'Process 2', allocation: [2, 0, 0], max: [3, 2, 2], need: [1, 2, 2] },
    { id: 'P3', name: 'Process 3', allocation: [3, 0, 2], max: [9, 0, 2], need: [6, 0, 0] },
    // Corrected: max[0] for P4 is now 4, not 2, to avoid negative need
    { id: 'P4', name: 'Process 4', allocation: [4, 1, 1], max: [4, 2, 2], need: [0, 1, 1] },
    { id: 'P5', name: 'Process 5', allocation: [0, 0, 2], max: [4, 3, 3], need: [4, 3, 1] },
    { id: 'P6', name: 'Process 6', allocation: [0, 0, 0], max: [1, 1, 1], need: [1, 1, 1] }
  ]);

  const [available, setAvailable] = useState([3, 3, 2]);
  const [safeSequence, setSafeSequence] = useState([]);
  const [isSystemSafe, setIsSystemSafe] = useState(null);
  const [simulationSteps, setSimulationSteps] = useState([]);

  const resourceTypes = ['R1', 'R2', 'R3'];

  // Helper to recalculate needs safely
  const recalculateNeeds = (procs) => {
    return procs.map(proc => ({
      ...proc,
      need: proc.max.map((max, i) =>
        Math.max(0, max - proc.allocation[i]) // Always non-negative
      )
    }));
  };

  // Main Banker's Algorithm
  const runBankersAlgorithm = () => {
    const work = [...available];
    const finish = new Array(processes.length).fill(false);
    const sequence = [];
    const steps = [];
    let localProcs = recalculateNeeds(processes); // Always up-to-date needs

    let found = true;
    while (found && sequence.length < localProcs.length) {
      found = false;
      for (let i = 0; i < localProcs.length; i++) {
        if (!finish[i]) {
          const process = localProcs[i];
          const canAllocate = process.need.every((need, j) => need <= work[j]);
          if (canAllocate) {
            finish[i] = true;
            sequence.push(process.id);
            for (let j = 0; j < work.length; j++) {
              work[j] += process.allocation[j];
            }
            steps.push({
              process: process.id,
              work: [...work],
              action: `${process.id} completes and releases resources`
            });
            found = true;
            break;
          }
        }
      }
    }
    const safe = sequence.length === localProcs.length;
    setSafeSequence(sequence);
    setIsSystemSafe(safe);
    setSimulationSteps(steps);
  };

  // Add Process
  const addProcess = () => {
    const newId = `P${processes.length + 1}`;
    const newProcess = {
      id: newId,
      name: `Process ${processes.length + 1}`,
      allocation: [0, 0, 0],
      max: [1, 1, 1],
      need: [1, 1, 1]
    };
    setProcesses(recalculateNeeds([...processes, newProcess]));
  };

  // Update Process: Enforce max >= alloc, recalc needs
  const updateProcess = (index, field, resourceIndex, value) => {
    let newProcesses = [...processes];
    let v = Math.max(0, parseInt(value) || 0);

    if (field === 'allocation') {
      // Never allow allocation > max
      v = Math.min(newProcesses[index].max[resourceIndex], v);
      newProcesses[index].allocation[resourceIndex] = v;
    } else if (field === 'max') {
      // Always allow max >= allocation at least
      v = Math.max(newProcesses[index].allocation[resourceIndex], v);
      newProcesses[index].max[resourceIndex] = v;
    }
    // Always recalculate need after any change
    newProcesses = recalculateNeeds(newProcesses);
    setProcesses(newProcesses);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Deadlock Detection & Avoidance</h1>
            <p className="text-red-100">Banker's Algorithm and Resource Allocation Graph</p>
          </div>
          <div className="hidden lg:block">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <Package className="h-5 w-5 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">Available Resources:</label>
            {available.map((value, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span className="text-sm text-gray-600">{resourceTypes[index]}:</span>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => {
                    const newAvailable = [...available];
                    newAvailable[index] = Math.max(0, parseInt(e.target.value) || 0);
                    setAvailable(newAvailable);
                  }}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  min="0"
                />
              </div>
            ))}
          </div>
          <button
            onClick={runBankersAlgorithm}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
          >
            <Shield className="h-4 w-4" />
            <span>Run Banker's Algorithm</span>
          </button>
          <button
            onClick={addProcess}
            className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            <span>Add Process</span>
          </button>
        </div>
        {/* System Status */}
        {isSystemSafe !== null && (
          <div className={`p-4 rounded-xl border-2 ${
            isSystemSafe 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center space-x-2">
              {isSystemSafe ? (
                <Shield className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
              <span className="font-semibold">
                System is {isSystemSafe ? 'SAFE' : 'UNSAFE (Potential Deadlock)'}
              </span>
            </div>
            {isSystemSafe && safeSequence.length > 0 && (
              <div className="mt-2">
                <span className="font-medium">Safe Sequence: </span>
                <span className="font-mono">{safeSequence.join(' → ')}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Process Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Resource Allocation Table</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Process</th>
                <th className="px-4 py-3 text-center text-sm font-bold text-gray-700" colSpan={resourceTypes.length}>
                  Allocation
                </th>
                <th className="px-4 py-3 text-center text-sm font-bold text-gray-700" colSpan={resourceTypes.length}>
                  Max Need
                </th>
                <th className="px-4 py-3 text-center text-sm font-bold text-gray-700" colSpan={resourceTypes.length}>
                  Remaining Need
                </th>
              </tr>
              <tr className="bg-gray-50 border-t">
                <th className="px-4 py-2"></th>
                {resourceTypes.map(type => (
                  <th key={`alloc-${type}`} className="px-2 py-2 text-xs text-gray-600">{type}</th>
                ))}
                {resourceTypes.map(type => (
                  <th key={`max-${type}`} className="px-2 py-2 text-xs text-gray-600">{type}</th>
                ))}
                {resourceTypes.map(type => (
                  <th key={`need-${type}`} className="px-2 py-2 text-xs text-gray-600">{type}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {processes.map((process, processIndex) => (
                <tr key={process.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{process.name}</td>
                  {/* Allocation */}
                  {process.allocation.map((value, resourceIndex) => (
                    <td key={`alloc-${processIndex}-${resourceIndex}`} className="px-2 py-3 text-center">
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => updateProcess(processIndex, 'allocation', resourceIndex, e.target.value)}
                        className="w-12 px-1 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max={process.max[resourceIndex]}
                      />
                    </td>
                  ))}
                  {/* Max */}
                  {process.max.map((value, resourceIndex) => (
                    <td key={`max-${processIndex}-${resourceIndex}`} className="px-2 py-3 text-center">
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => updateProcess(processIndex, 'max', resourceIndex, e.target.value)}
                        className="w-12 px-1 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        min={process.allocation[resourceIndex]}
                      />
                    </td>
                  ))}
                  {/* Need (calculated) */}
                  {process.need.map((value, resourceIndex) => (
                    <td key={`need-${processIndex}-${resourceIndex}`} className="px-2 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-sm font-mono ${
                        value > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {value}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Simulation Steps */}
      {simulationSteps.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Algorithm Execution Steps</h2>
          <div className="space-y-3">
            {simulationSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{step.action}</div>
                  <div className="text-sm text-gray-600">
                    Available resources: [{step.work.join(', ')}]
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeadlockSimulator;
