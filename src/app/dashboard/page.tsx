"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SubStep {
  id: string;
  title: string;
  isCompleted: boolean;
  type: string;
}

interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "completed" | "in-progress";
  priority: "high" | "medium" | "low";
  subSteps: SubStep[];
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error (${res.status}): ${errorText.substring(0, 100)}...`);
      }
      
      const dbTasks = await res.json();
      
      const formattedTasks = dbTasks.map((t: any) => {
        const totalSteps = t.subSteps?.length || 0;
        const completedSteps = t.subSteps?.filter((s: any) => s.isCompleted).length || 0;
        
        let status: "pending" | "completed" | "in-progress" = "pending";
        if (totalSteps > 0 && completedSteps === totalSteps) status = "completed";
        else if (completedSteps > 0) status = "in-progress";

        return {
          id: t.id,
          title: t.title,
          subject: t.juice?.subject || "General",
          dueDate: new Date(t.createdAt).toLocaleDateString(),
          status,
          priority: t.juice?.priority || "medium",
          subSteps: t.subSteps || []
        };
      });
      
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks from DB:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleSubStep = async (taskId: string, subStepId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/substeps/${subStepId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !currentStatus }),
      });

      if (res.ok) {
        // Refresh tasks to update overall status
        await fetchTasks();
      }
    } catch (error) {
      console.error("Failed to toggle substep:", error);
    }
  };

  const filteredTasks = filter === "all" 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      default:
        return "text-green-500";
    }
  };

  const completedCount = tasks.filter(t => t.status === "completed").length;
  const inProgressCount = tasks.filter(t => t.status === "in-progress").length;
  const pendingCount = tasks.filter(t => t.status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            </div>
            <Link 
              href="/ai-assistant"
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center gap-2 animate-pulse"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Let's Do a New Task!
            </Link>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{inProgressCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Tasks</h2>
              <div className="flex gap-2">
                {["all", "pending", "in-progress", "completed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filter === status
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        task.status === "completed" 
                          ? "bg-green-500 border-green-500" 
                          : "border-gray-300 dark:border-gray-600"
                      }`}>
                        {task.status === "completed" && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg text-gray-900 dark:text-white ${
                          task.status === "completed" ? "line-through text-gray-400" : ""
                        }`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">{task.subject}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Due: {task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status.replace("-", " ")}
                      </span>
                      <span className={`text-lg ${getPriorityColor(task.priority)}`} title={`${task.priority} priority`}>
                        ●
                      </span>
                    </div>
                  </div>

                  {/* Sub-steps */}
                  {task.subSteps && task.subSteps.length > 0 && (
                    <div className="ml-10 space-y-3 bg-gray-50/50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Sub-tasks</p>
                      {task.subSteps.map((step) => (
                        <div key={step.id} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={step.isCompleted}
                            onChange={() => handleToggleSubStep(task.id, step.id, step.isCompleted)}
                            className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          />
                          <div className="flex flex-col">
                            <span className={`text-sm ${step.isCompleted ? "text-gray-400 line-through" : "text-gray-700 dark:text-gray-200"}`}>
                              {step.title}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium uppercase">{step.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">You don't have any tasks in this category.</p>
                <Link 
                  href="/ai-assistant"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Ask AI Assistant for help
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
