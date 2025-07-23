import React from 'react';
import { 
  Cpu, 
  HardDrive, 
  AlertTriangle, 
  BookOpen, 
  TrendingUp,
  Users,
  Clock,
  Award,
  Play,
  BarChart3,
  Zap,
  Target,
  ArrowRight,
  Star
} from 'lucide-react';

const Dashboard = ({ setActiveModule }) => {
  const modules = [
    {
      id: 'scheduling',
      title: 'CPU Scheduling',
      description: 'Master process scheduling algorithms with interactive visualizations',
      icon: Cpu,
      color: 'from-green-400 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      stats: '8 Algorithms',
      progress: 75,
      difficulty: 'Intermediate'
    },
    {
      id: 'memory',
      title: 'Memory Management',
      description: 'Explore memory allocation strategies and paging systems',
      icon: HardDrive,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      stats: '5 Strategies',
      progress: 45,
      difficulty: 'Advanced'
    },
    {
      id: 'deadlock',
      title: 'Deadlock Detection',
      description: 'Understand deadlock scenarios and prevention techniques',
      icon: AlertTriangle,
      color: 'from-red-400 to-red-600',
      bgColor: 'from-red-50 to-red-100',
      stats: '3 Algorithms',
      progress: 30,
      difficulty: 'Expert'
    }
  ];

  const recentActivity = [
    { 
      title: 'Completed Round Robin simulation', 
      time: '2 hours ago', 
      type: 'success',
      icon: Cpu,
      score: '95%'
    },
    { 
      title: 'Studied Memory Allocation', 
      time: '4 hours ago', 
      type: 'info',
      icon: HardDrive,
      score: '87%'
    },
    { 
      title: 'Solved Deadlock scenario', 
      time: '1 day ago', 
      type: 'warning',
      icon: AlertTriangle,
      score: '92%'
    },
    { 
      title: 'Learned about SJF algorithm', 
      time: '2 days ago', 
      type: 'info',
      icon: BookOpen,
      score: '89%'
    }
  ];

  const achievements = [
    { name: 'Algorithm Master', description: 'Completed all scheduling algorithms', earned: true },
    { name: 'Memory Expert', description: 'Mastered memory management', earned: false },
    { name: 'Deadlock Detective', description: 'Solved 10 deadlock scenarios', earned: true },
    { name: 'Speed Runner', description: 'Completed simulation in under 5 minutes', earned: false }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome to OSim</h1>
              <p className="text-blue-100 text-lg mb-6">Your comprehensive operating system learning platform</p>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setActiveModule('tutorials')}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  Start Learning
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;