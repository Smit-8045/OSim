import React from 'react';
import { 
  BarChart3, 
  Cpu, 
  HardDrive, 
  AlertTriangle, 
  Bot, 
  BookOpen,
  ChevronRight,
  X,
  Zap,
  Award,
  TrendingUp
} from 'lucide-react';

const Sidebar = ({ activeModule, setActiveModule, isOpen, setIsOpen }) => {
  const modules = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Overview and analytics',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'scheduling',
      label: 'CPU Scheduling',
      icon: Cpu,
      description: 'Process scheduling algorithms',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'memory',
      label: 'Memory Management',
      icon: HardDrive,
      description: 'Memory allocation strategies',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'deadlock',
      label: 'Deadlock Detection',
      icon: AlertTriangle,
      description: 'Resource allocation & deadlock',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'tutorials',
      label: 'Tutorials',
      icon: BookOpen,
      description: 'Interactive learning guides',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white/90 backdrop-blur-md shadow-2xl transform transition-all duration-300 z-50 border-r border-blue-100 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:z-30`}>
        
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-100 md:hidden">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">OSim</h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Modules</h3>
          {modules.map(module => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => {
                  setActiveModule(module.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group hover:scale-105 ${
                  activeModule === module.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeModule === module.id 
                    ? 'bg-white/20' 
                    : `bg-gradient-to-r ${module.color}`
                }`}>
                  <Icon className={`h-4 w-4 ${
                    activeModule === module.id ? 'text-white' : 'text-white'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{module.label}</div>
                  <div className={`text-xs truncate ${
                    activeModule === module.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {module.description}
                  </div>
                </div>
                {activeModule === module.id && (
                  <ChevronRight className="h-4 w-4 text-white" />
                )}
              </button>
            );
          })}
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-blue-100">
          
        </div>
      </div>
    </>
  );
};

export default Sidebar;