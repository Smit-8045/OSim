// CPU Scheduling Algorithms Implementation

export const schedulingAlgorithms = {
  fcfs: (processes) => {
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const ganttChart = [];
    const processMetrics = [];
    let currentTime = 0;
    
    sortedProcesses.forEach(process => {
      const startTime = Math.max(currentTime, process.arrivalTime);
      const endTime = startTime + process.burstTime;
      
      ganttChart.push({
        processId: process.id,
        processName: process.name,
        startTime,
        endTime
      });
      
      const turnaroundTime = endTime - process.arrivalTime;
      const waitingTime = turnaroundTime - process.burstTime;
      const responseTime = startTime - process.arrivalTime;
      
      processMetrics.push({
        name: process.name,
        turnaroundTime,
        waitingTime,
        responseTime
      });
      
      currentTime = endTime;
    });
    
    const averageTurnaroundTime = processMetrics.reduce((sum, p) => sum + p.turnaroundTime, 0) / processMetrics.length;
    const averageWaitingTime = processMetrics.reduce((sum, p) => sum + p.waitingTime, 0) / processMetrics.length;
    const averageResponseTime = processMetrics.reduce((sum, p) => sum + p.responseTime, 0) / processMetrics.length;
    const totalBurstTime = processes.reduce((sum, p) => sum + p.burstTime, 0);
    const cpuUtilization = (totalBurstTime / currentTime) * 100;
    
    return {
      ganttChart,
      metrics: {
        averageTurnaroundTime,
        averageWaitingTime,
        averageResponseTime,
        cpuUtilization,
        processMetrics
      }
    };
  },

  sjf: (processes) => {
    const processQueue = [...processes].map(p => ({ ...p, remainingTime: p.burstTime }));
    const ganttChart = [];
    const processMetrics = [];
    let currentTime = 0;
    
    while (processQueue.length > 0) {
      const availableProcesses = processQueue.filter(p => p.arrivalTime <= currentTime);
      
      if (availableProcesses.length === 0) {
        currentTime++;
        continue;
      }
      
      const shortestProcess = availableProcesses.reduce((min, p) => 
        p.burstTime < min.burstTime ? p : min
      );
      
      const startTime = currentTime;
      const endTime = startTime + shortestProcess.burstTime;
      
      ganttChart.push({
        processId: shortestProcess.id,
        processName: shortestProcess.name,
        startTime,
        endTime
      });
      
      const turnaroundTime = endTime - shortestProcess.arrivalTime;
      const waitingTime = turnaroundTime - shortestProcess.burstTime;
      const responseTime = startTime - shortestProcess.arrivalTime;
      
      processMetrics.push({
        name: shortestProcess.name,
        turnaroundTime,
        waitingTime,
        responseTime
      });
      
      currentTime = endTime;
      processQueue.splice(processQueue.indexOf(shortestProcess), 1);
    }
    
    const averageTurnaroundTime = processMetrics.reduce((sum, p) => sum + p.turnaroundTime, 0) / processMetrics.length;
    const averageWaitingTime = processMetrics.reduce((sum, p) => sum + p.waitingTime, 0) / processMetrics.length;
    const averageResponseTime = processMetrics.reduce((sum, p) => sum + p.responseTime, 0) / processMetrics.length;
    const totalBurstTime = processes.reduce((sum, p) => sum + p.burstTime, 0);
    const cpuUtilization = (totalBurstTime / currentTime) * 100;
    
    return {
      ganttChart,
      metrics: {
        averageTurnaroundTime,
        averageWaitingTime,
        averageResponseTime,
        cpuUtilization,
        processMetrics
      }
    };
  },

  roundRobin: (processes, timeQuantum = 2) => {
    const processQueue = [...processes].map(p => ({ 
      ...p, 
      remainingTime: p.burstTime,
      responseTime: -1
    }));
    const ganttChart = [];
    const processMetrics = [];
    let currentTime = 0;
    const readyQueue = [];
    
    // Add processes to ready queue based on arrival time
    while (processQueue.length > 0 || readyQueue.length > 0) {
      // Add newly arrived processes to ready queue
      while (processQueue.length > 0 && processQueue[0].arrivalTime <= currentTime) {
        readyQueue.push(processQueue.shift());
      }
      
      if (readyQueue.length === 0) {
        currentTime++;
        continue;
      }
      
      const currentProcess = readyQueue.shift();
      const startTime = currentTime;
      const executionTime = Math.min(timeQuantum, currentProcess.remainingTime);
      const endTime = startTime + executionTime;
      
      if (currentProcess.responseTime === -1) {
        currentProcess.responseTime = startTime - currentProcess.arrivalTime;
      }
      
      ganttChart.push({
        processId: currentProcess.id,
        processName: currentProcess.name,
        startTime,
        endTime
      });
      
      currentTime = endTime;
      currentProcess.remainingTime -= executionTime;
      
      // Add newly arrived processes
      while (processQueue.length > 0 && processQueue[0].arrivalTime <= currentTime) {
        readyQueue.push(processQueue.shift());
      }
      
      if (currentProcess.remainingTime > 0) {
        readyQueue.push(currentProcess);
      } else {
        const turnaroundTime = currentTime - currentProcess.arrivalTime;
        const waitingTime = turnaroundTime - currentProcess.burstTime;
        
        processMetrics.push({
          name: currentProcess.name,
          turnaroundTime,
          waitingTime,
          responseTime: currentProcess.responseTime
        });
      }
    }
    
    const averageTurnaroundTime = processMetrics.reduce((sum, p) => sum + p.turnaroundTime, 0) / processMetrics.length;
    const averageWaitingTime = processMetrics.reduce((sum, p) => sum + p.waitingTime, 0) / processMetrics.length;
    const averageResponseTime = processMetrics.reduce((sum, p) => sum + p.responseTime, 0) / processMetrics.length;
    const totalBurstTime = processes.reduce((sum, p) => sum + p.burstTime, 0);
    const cpuUtilization = (totalBurstTime / currentTime) * 100;
    
    return {
      ganttChart,
      metrics: {
        averageTurnaroundTime,
        averageWaitingTime,
        averageResponseTime,
        cpuUtilization,
        processMetrics
      }
    };
  },

  priority: (processes) => {
    const processQueue = [...processes].map(p => ({ ...p, remainingTime: p.burstTime }));
    const ganttChart = [];
    const processMetrics = [];
    let currentTime = 0;
    
    while (processQueue.length > 0) {
      const availableProcesses = processQueue.filter(p => p.arrivalTime <= currentTime);
      
      if (availableProcesses.length === 0) {
        currentTime++;
        continue;
      }
      
      const highestPriorityProcess = availableProcesses.reduce((min, p) => 
        p.priority < min.priority ? p : min
      );
      
      const startTime = currentTime;
      const endTime = startTime + highestPriorityProcess.burstTime;
      
      ganttChart.push({
        processId: highestPriorityProcess.id,
        processName: highestPriorityProcess.name,
        startTime,
        endTime
      });
      
      const turnaroundTime = endTime - highestPriorityProcess.arrivalTime;
      const waitingTime = turnaroundTime - highestPriorityProcess.burstTime;
      const responseTime = startTime - highestPriorityProcess.arrivalTime;
      
      processMetrics.push({
        name: highestPriorityProcess.name,
        turnaroundTime,
        waitingTime,
        responseTime
      });
      
      currentTime = endTime;
      processQueue.splice(processQueue.indexOf(highestPriorityProcess), 1);
    }
    
    const averageTurnaroundTime = processMetrics.reduce((sum, p) => sum + p.turnaroundTime, 0) / processMetrics.length;
    const averageWaitingTime = processMetrics.reduce((sum, p) => sum + p.waitingTime, 0) / processMetrics.length;
    const averageResponseTime = processMetrics.reduce((sum, p) => sum + p.responseTime, 0) / processMetrics.length;
    const totalBurstTime = processes.reduce((sum, p) => sum + p.burstTime, 0);
    const cpuUtilization = (totalBurstTime / currentTime) * 100;
    
    return {
      ganttChart,
      metrics: {
        averageTurnaroundTime,
        averageWaitingTime,
        averageResponseTime,
        cpuUtilization,
        processMetrics
      }
    };
  }
};