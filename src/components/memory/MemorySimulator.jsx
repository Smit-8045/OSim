import React, { useState, useEffect } from 'react';
import { HardDrive, Plus, Trash2, RefreshCw, BarChart3, Zap } from 'lucide-react';

const MemorySimulator = () => {
  const [memorySize, setMemorySize] = useState(1024);
  const [memoryBlocks, setMemoryBlocks] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [algorithm, setAlgorithm] = useState('firstFit');
  const [showAddProcess, setShowAddProcess] = useState(false);
  const [newProcess, setNewProcess] = useState({ name: '', size: 100 });

  useEffect(() => {
    // Initialize memory with free blocks
    setMemoryBlocks([{ id: 1, start: 0, size: memorySize, type: 'free', process: null }]);
  }, [memorySize]);

  const allocateMemory = (processName, processSize) => {
    const newBlocks = [...memoryBlocks];
    let allocated = false;

    for (let i = 0; i < newBlocks.length; i++) {
      const block = newBlocks[i];
      if (block.type === 'free' && block.size >= processSize) {
        // Allocate memory
        const allocatedBlock = {
          id: Date.now(),
          start: block.start,
          size: processSize,
          type: 'allocated',
          process: processName,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`
        };

        if (block.size > processSize) {
          // Split the block
          const remainingBlock = {
            ...block,
            start: block.start + processSize,
            size: block.size - processSize
          };
          newBlocks.splice(i, 1, allocatedBlock, remainingBlock);
        } else {
          // Use entire block
          newBlocks[i] = allocatedBlock;
        }

        allocated = true;
        break;
      }
    }

    if (allocated) {
      setMemoryBlocks(newBlocks);
      setProcesses([...processes, { name: processName, size: processSize, allocated: true }]);
    } else {
      alert('Not enough memory available!');
    }
  };

  const deallocateMemory = (processName) => {
    const newBlocks = memoryBlocks.map(block => 
      block.process === processName 
        ? { ...block, type: 'free', process: null, color: undefined }
        : block
    );

    // Merge adjacent free blocks
    const mergedBlocks = [];
    for (let i = 0; i < newBlocks.length; i++) {
      const current = newBlocks[i];
      if (current.type === 'free' && mergedBlocks.length > 0) {
        const last = mergedBlocks[mergedBlocks.length - 1];
        if (last.type === 'free' && last.start + last.size === current.start) {
          last.size += current.size;
          continue;
        }
      }
      mergedBlocks.push(current);
    }

    setMemoryBlocks(mergedBlocks);
    setProcesses(processes.filter(p => p.name !== processName));
  };

  const handleAddProcess = () => {
    if (newProcess.name && newProcess.size > 0) {
      allocateMemory(newProcess.name, newProcess.size);
      setNewProcess({ name: '', size: 100 });
      setShowAddProcess(false);
    }
  };

  const getMemoryStats = () => {
    const totalAllocated = memoryBlocks
      .filter(block => block.type === 'allocated')
      .reduce((sum, block) => sum + block.size, 0);
    
    const totalFree = memorySize - totalAllocated;
    const fragmentation = memoryBlocks.filter(block => block.type === 'free').length - 1;
    
    return {
      totalAllocated,
      totalFree,
      utilization: ((totalAllocated / memorySize) * 100).toFixed(1),
      fragmentation
    };
  };

  const stats = getMemoryStats();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Memory Management Simulator</h1>
            <p className="text-purple-100">Visualize memory allocation strategies and fragmentation</p>
          </div>
          <div className="hidden lg:block">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <HardDrive className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Memory Size:</label>
            <input
              type="number"
              value={memorySize}
              onChange={(e) => setMemorySize(Number(e.target.value))}
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              min="256"
              max="4096"
              step="256"
            />
            <span className="text-sm text-gray-600">KB</span>
          </div>

          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Algorithm:</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="firstFit">First Fit</option>
              <option value="bestFit">Best Fit</option>
              <option value="worstFit">Worst Fit</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddProcess(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            <span>Add Process</span>
          </button>
        </div>

        {/* Add Process Form */}
        {showAddProcess && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Process name"
                value={newProcess.name}
                onChange={(e) => setNewProcess({...newProcess, name: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                placeholder="Size (KB)"
                value={newProcess.size}
                onChange={(e) => setNewProcess({...newProcess, size: Number(e.target.value)})}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                min="1"
              />
              <button
                onClick={handleAddProcess}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddProcess(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Memory Visualization and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Memory Visualization */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Memory Layout</h2>
          <div className="space-y-2">
            {memoryBlocks.map((block, index) => (
              <div
                key={block.id}
                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 ${
                  block.type === 'allocated' 
                    ? 'border-blue-300 shadow-sm' 
                    : 'border-gray-200 border-dashed'
                }`}
                style={{
                  backgroundColor: block.type === 'allocated' ? block.color + '20' : '#f9fafb',
                  height: `${Math.max(40, (block.size / memorySize) * 200)}px`
                }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: block.type === 'allocated' ? block.color : '#d1d5db' }}
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      {block.type === 'allocated' ? block.process : 'Free Space'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {block.start} - {block.start + block.size - 1} ({block.size} KB)
                    </div>
                  </div>
                </div>
                {block.type === 'allocated' && (
                  <button
                    onClick={() => deallocateMemory(block.process)}
                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Memory Statistics</h2>
              <BarChart3 className="h-5 w-5 text-purple-500" />
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-700">Allocated</span>
                  <span className="text-lg font-bold text-blue-900">{stats.totalAllocated} KB</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-700">Free</span>
                  <span className="text-lg font-bold text-green-900">{stats.totalFree} KB</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-purple-700">Utilization</span>
                  <span className="text-lg font-bold text-purple-900">{stats.utilization}%</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-orange-700">Fragmentation</span>
                  <span className="text-lg font-bold text-orange-900">{stats.fragmentation} blocks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Process List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Active Processes</h2>
              <Zap className="h-5 w-5 text-green-500" />
            </div>
            
            <div className="space-y-2">
              {processes.map((process, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{process.name}</div>
                    <div className="text-sm text-gray-500">{process.size} KB</div>
                  </div>
                  <button
                    onClick={() => deallocateMemory(process.name)}
                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {processes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No active processes
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemorySimulator;