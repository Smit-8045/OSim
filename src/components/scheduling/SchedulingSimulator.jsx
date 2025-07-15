import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Plus, Settings, Download, Share2, Info } from 'lucide-react';
import GanttChart from './GanttChart';
import ProcessTable from './ProcessTable';
import ProcessForm from './ProcessForm';
import AlgorithmSelector from './AlgorithmSelector';
import PerformanceMetrics from './PerformanceMetrics';
import { schedulingAlgorithms } from '../../utils/algorithms';

const SchedulingSimulator = () => {
  const [processes, setProcesses] = useState([]); // Start with an empty process list
  
  const [algorithm, setAlgorithm] = useState('fcfs');
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [currentTime, setCurrentTime] = useState(0);
  const [ganttData, setGanttData] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [showProcessForm, setShowProcessForm] = useState(false);
  const [editingProcess, setEditingProcess] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const runSimulation = useCallback(() => {
    if (processes.length === 0) return;
    
    const result = schedulingAlgorithms[algorithm](processes, timeQuantum);
    setGanttData(result.ganttChart);
    setMetrics(result.metrics);
  }, [processes, algorithm, timeQuantum]);

  useEffect(() => {
    runSimulation();
  }, [runSimulation]);

  useEffect(() => {
    let interval;
    if (ganttData.length > 0) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const maxTime = Math.max(...ganttData.map(item => item.endTime));
          return prev >= maxTime ? 0 : prev + 1;
        });
      }, 100); // Keep a small interval for continuous updates
    }
    return () => clearInterval(interval);
  }, [ganttData]);

  const handleAddProcess = (processData) => {
    const newProcess = {
      ...processData,
      id: Date.now(),
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    };
    setProcesses([...processes, newProcess]);
    setShowProcessForm(false);
  };

  const handleEditProcess = (processData) => {
    setProcesses(processes.map(p => 
      p.id === editingProcess.id ? { ...processData, id: editingProcess.id } : p
    ));
    setEditingProcess(null);
    setShowProcessForm(false);
  };

  const handleDeleteProcess = (id) => {
    setProcesses(processes.filter(p => p.id !== id));
  };

  const resetSimulation = () => {
    setCurrentTime(0);
    runSimulation();
  };

  const exportResults = () => {
    const data = {
      algorithm,
      processes,
      ganttData,
      metrics,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scheduling-simulation-${algorithm}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">CPU Scheduling Simulator</h1>
            <p className="text-green-100">Visualize and compare different CPU scheduling algorithms</p>
          </div>
          <div className="hidden lg:block">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Play className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <AlgorithmSelector 
            value={algorithm} 
            onChange={setAlgorithm}
            timeQuantum={timeQuantum}
            onTimeQuantumChange={setTimeQuantum}
          />
          
          <div className="flex items-center space-x-3">
            <button
              onClick={resetSimulation}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-3">
            <label className="text-sm font-medium text-gray-700">Speed:</label>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={100} // Keep a fixed value for speed
              onChange={(e) => {}} // No effect on simulation speed
              className="w-24 accent-blue-500"
            />
            <span className="text-sm text-gray-600 font-mono">100ms</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowProcessForm(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Plus className="h-4 w-4" />
              <span>Add Process</span>
            </button>
            
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center space-x-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all duration-200"
            >
              <Info className="h-4 w-4" />
              <span>Info</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
          </div>
        </div>

        {/* Algorithm Info */}
        {showInfo && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Algorithm Information</h3>
            <p className="text-blue-700 text-sm">
              {algorithm === 'fcfs' && 'First Come First Serve (FCFS) executes processes in the order they arrive. Simple but can cause convoy effect.'}
              {algorithm === 'sjf' && 'Shortest Job First (SJF) executes the shortest process first. Optimal for average waiting time but can cause starvation.'}
              {algorithm === 'roundRobin' && 'Round Robin gives each process a fixed time quantum. Fair scheduling but context switching overhead.'}
              {algorithm === 'priority' && 'Priority Scheduling executes higher priority processes first. Can cause starvation of low priority processes.'}
            </p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Gantt Chart */}
        <div className="xl:col-span-2">
          <GanttChart 
            data={ganttData} 
            currentTime={currentTime}
            isRunning={false} // Always false as simulation is continuous
            processes={processes}
          />
        </div>
        
        {/* Performance Metrics */}
        <div>
          <PerformanceMetrics metrics={metrics} />
        </div>
      </div>

      {/* Process Table */}
      <div>
        <ProcessTable 
          processes={processes}
          onEdit={(process) => {
            setEditingProcess(process);
            setShowProcessForm(true);
          }}
          onDelete={handleDeleteProcess}
        />
      </div>

      {/* Process Form Modal */}
      {showProcessForm && (
        <ProcessForm
          process={editingProcess}
          onSave={editingProcess ? handleEditProcess : handleAddProcess}
          onCancel={() => {
            setShowProcessForm(false);
            setEditingProcess(null);
          }}
        />
      )}
    </div>
  );
};

export default SchedulingSimulator;