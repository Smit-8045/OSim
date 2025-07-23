import React, { useState, useEffect } from 'react';
import { X, Save, Palette, Clock, Zap, Target } from 'lucide-react';

const ProcessForm = ({ process, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    arrivalTime: 0,
    burstTime: 1,
    priority: 1,
    color: '#3b82f6'
  });

  const [errors, setErrors] = useState({});

  const colorPresets = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
    '#8b5cf6', '#06b6d4', '#84cc16', '#f97316',
    '#ec4899', '#6366f1', '#14b8a6', '#eab308'
  ];

  useEffect(() => {
    if (process) {
      setFormData(process);
    }
  }, [process]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Process name is required';
    }
    
    if (formData.arrivalTime < 0) {
      newErrors.arrivalTime = 'Arrival time cannot be negative';
    }
    
    if (formData.burstTime < 1) {
      newErrors.burstTime = 'Burst time must be at least 1';
    }
    
    if (formData.priority < 1 || formData.priority > 10) {
      newErrors.priority = 'Priority must be between 1 and 10';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Ensure color is a valid hex with leading #
      let color = formData.color;
      if (color && !color.startsWith('#')) {
        color = '#' + color;
      }
      onSave({ ...formData, color });
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {process ? 'Edit Process' : 'Add New Process'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Process Name */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Target className="h-4 w-4" />
              <span>Process Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="e.g., P1, Process A"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          {/* Arrival and Burst Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4" />
                <span>Arrival Time</span>
              </label>
              <input
                type="number"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.arrivalTime ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.arrivalTime && <p className="text-red-500 text-xs mt-1">{errors.arrivalTime}</p>}
            </div>
            
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Zap className="h-4 w-4" />
                <span>Burst Time</span>
              </label>
              <input
                type="number"
                name="burstTime"
                value={formData.burstTime}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.burstTime ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.burstTime && <p className="text-red-500 text-xs mt-1">{errors.burstTime}</p>}
            </div>
          </div>
          
          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <div className="relative">
              <input
                type="range"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                min="1"
                max="10"
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 (Highest)</span>
                <span className="font-bold text-blue-600">{formData.priority}</span>
                <span>10 (Lowest)</span>
              </div>
            </div>
            {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority}</p>}
          </div>
          
          {/* Color Selection */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Palette className="h-4 w-4" />
              <span>Color Theme</span>
            </label>
            
            {/* Color Presets */}
            <div className="grid grid-cols-6 gap-2 mb-3">
              {colorPresets.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                    formData.color === color ? 'border-gray-400 ring-2 ring-blue-500' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            {/* Custom Color Input */}
            <div className="flex items-center space-x-3">
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="#3b82f6"
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium hover:scale-105 shadow-lg"
            >
              <Save className="h-4 w-4" />
              <span>Save Process</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProcessForm;