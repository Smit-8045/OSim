import React, { useState } from 'react';
// @ts-ignore
import Sidebar from './components/common/Sidebar';
// @ts-ignore
import Header from './components/common/Header';
// @ts-ignore
import Dashboard from './components/Dashboard';
// @ts-ignore
import SchedulingSimulator from './components/scheduling/SchedulingSimulator';
// @ts-ignore
import MemorySimulator from './components/memory/MemorySimulator';
// @ts-ignore
import DeadlockSimulator from './components/deadlock/DeadlockSimulator';
// @ts-ignore
import Tutorials from './components/tutorials/Tutorials';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-4">
          {activeModule === 'dashboard' && <Dashboard setActiveModule={setActiveModule} />}
          {activeModule === 'scheduling' && <SchedulingSimulator />}
          {activeModule === 'memory' && <MemorySimulator />}
          {activeModule === 'deadlock' && <DeadlockSimulator />}
          {activeModule === 'tutorials' && <Tutorials />}
          {activeModule === 'ai' && <AITutor />}
        </main>
      </div>
    </div>
  );
}

export default App;
