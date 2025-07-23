import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Clock, Star, ArrowRight, Users, Award } from 'lucide-react';

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [completedTutorials, setCompletedTutorials] = useState(['tutorial-1', 'tutorial-3']);

  const categories = [
    { id: 'all', name: 'All Tutorials', count:  6},
    { id: 'scheduling', name: 'CPU Scheduling', count: 2 },
    { id: 'memory', name: 'Memory Management', count: 2 },
    { id: 'deadlock', name: 'Deadlock', count: 1 },
    { id: 'basics', name: 'OS Basics', count: 1 }
  ];

  const tutorials = [
    {
      id: 'tutorial-1',
      title: 'Introduction to CPU Scheduling',
      description: 'Learn the fundamentals of process scheduling and different algorithms',
      category: 'scheduling',
      difficulty: 'Beginner',
      duration: '15 min',
      rating: 4.8,
      students: 1234,
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['FCFS', 'SJF', 'Round Robin', 'Priority Scheduling'],
      youtubeUrl: 'https://www.youtube.com/watch?v=Jkmy2YLUbUY'
    },
    {
      id: 'tutorial-2',
      title: 'Advanced Scheduling Algorithms',
      description: 'Explore multilevel queue and multilevel feedback queue scheduling',
      category: 'scheduling',
      difficulty: 'Advanced',
      duration: '25 min',
      rating: 4.9,
      students: 856,
      thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Multilevel Queue', 'MLFQ', 'Real-time Scheduling'],
      youtubeUrl: 'https://www.youtube.com/watch?v=1KLuC0knvs8'
    },
    {
      id: 'tutorial-3',
      title: 'Memory Allocation Strategies',
      description: 'Understanding first fit, best fit, and worst fit allocation methods',
      category: 'memory',
      difficulty: 'Intermediate',
      duration: '20 min',
      rating: 4.7,
      students: 967,
      thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['First Fit', 'Best Fit', 'Worst Fit', 'Fragmentation'],
      youtubeUrl: 'https://www.youtube.com/watch?v=N3rG_1CEQkQ'
    },
    {
      id: 'tutorial-4',
      title: 'Virtual Memory and Paging',
      description: 'Deep dive into virtual memory systems and page replacement algorithms',
      category: 'memory',
      difficulty: 'Advanced',
      duration: '30 min',
      rating: 4.9,
      students: 743,
      thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Virtual Memory', 'Paging', 'LRU', 'FIFO', 'Optimal'],
      youtubeUrl: 'https://www.youtube.com/watch?v=A9WLYbE0p-I'
    },
    {
      id: 'tutorial-5',
      title: 'Deadlock Detection and Prevention',
      description: 'Master the Banker\'s algorithm and deadlock prevention techniques',
      category: 'deadlock',
      difficulty: 'Intermediate',
      duration: '22 min',
      rating: 4.8,
      students: 654,
      thumbnail: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Banker\'s Algorithm', 'Resource Allocation', 'Safe State'],
      youtubeUrl: 'https://www.youtube.com/watch?v=y7DOHyBTWps'
    },
    {
      id: 'tutorial-6',
      title: 'Operating System Fundamentals',
      description: 'Essential concepts every computer science student should know',
      category: 'basics',
      difficulty: 'Beginner',
      duration: '18 min',
      rating: 4.6,
      students: 1567,
      thumbnail: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Processes', 'Threads', 'System Calls', 'Kernel'],
      youtubeUrl: 'https://www.youtube.com/watch?v=9GDX-IyZ_C8'
    }
  ];

  const filteredTutorials = selectedCategory === 'all' 
    ? tutorials 
    : tutorials.filter(tutorial => tutorial.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const isCompleted = (tutorialId) => completedTutorials.includes(tutorialId);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Interactive Tutorials</h1>
            <p className="text-orange-100">Step-by-step guided learning experiences for all OS concepts</p>
          </div>
          <div className="hidden lg:block">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map(tutorial => (
          <div key={tutorial.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={tutorial.thumbnail} 
                alt={tutorial.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <a href={tutorial.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                  <Play className="h-6 w-6 text-orange-600 ml-1" />
                </a>
              </div>
              
              {/* Completion Badge */}
              {isCompleted(tutorial.id) && (
                <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                </div>
              )}
              
              {/* Difficulty Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                  {tutorial.difficulty}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-orange-600 font-medium uppercase tracking-wide">
                  {tutorial.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{tutorial.rating}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                {tutorial.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {tutorial.description}
              </p>
              
              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tutorial.topics.slice(0, 3).map((topic, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                    {topic}
                  </span>
                ))}
                {tutorial.topics.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                    +{tutorial.topics.length - 3} more
                  </span>
                )}
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{tutorial.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{tutorial.students.toLocaleString()}</span>
                  </div>
                </div>
                
                <a href={tutorial.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 font-medium text-sm group">
                  <span>Start</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;