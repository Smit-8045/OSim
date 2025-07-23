import React from 'react';
import { Menu, BookOpen, User, Settings, Bell, Search } from 'lucide-react';

const Header = ({ activeModule, setActiveModule, sidebarOpen, setSidebarOpen }) => {
  const modules = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'scheduling', label: 'CPU Scheduling' },
    { id: 'memory', label: 'Memory Management' },
    { id: 'deadlock', label: 'Deadlock Detection' },
    { id: 'tutorials', label: 'Tutorials' }
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:scale-105"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                OSim
              </h1>
              <p className="text-xs text-gray-500">Operating System Simulator</p>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search algorithms, concepts..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {modules.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeModule === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-blue-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:scale-105 relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:scale-105">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:scale-105">
            <User className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;