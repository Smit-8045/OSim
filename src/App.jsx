import React, { useState } from 'react';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Dashboard from './components/Dashboard';
import SchedulingSimulator from './components/scheduling/SchedulingSimulator';
import MemorySimulator from './components/memory/MemorySimulator';
import DeadlockSimulator from './components/deadlock/DeadlockSimulator';
import Tutorials from './components/tutorials/Tutorials';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard setActiveModule={setActiveModule} />;
      case 'scheduling':
        return <SchedulingSimulator />;
      case 'memory':
        return <MemorySimulator />;
      case 'deadlock':
        return <DeadlockSimulator />;
      case 'tutorials':
        return <Tutorials />;
      default:
        return <Dashboard setActiveModule={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header 
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex">
        <Sidebar
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        
        <main className="flex-1 md:ml-64 transition-all duration-300">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
}

export default App;