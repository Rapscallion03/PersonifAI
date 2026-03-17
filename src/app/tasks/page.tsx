"use client";

import { useState } from "react";
import { Footer, SimpleTask, LectureTask, RevisionTask } from "@/components";

export default function TaskBucket() {
  // State management to demonstrate the "reusable status" logic
  const [tasks, setTasks] = useState({
    research: false,
    neural: false,
    calculus: true, // Example of a pre-completed task
  });

  const toggleTask = (id: keyof typeof tasks, val: boolean) => {
    setTasks(prev => ({ ...prev, [id]: val }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
      <main className="max-w-4xl mx-auto pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Task Bucket</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track your learning progress with specialized task types.</p>
        </div>

        <div className="space-y-6">
          <SimpleTask 
            title="Research Project"
            description="Complete the initial research for your AI project. Steps: 1. Identify core problem, 2. Research existing solutions."
            isCompleted={tasks.research}
            onToggle={(val) => toggleTask('research', val)}
          />

          <LectureTask 
            title="Introduction to Neural Networks"
            description="Watch this foundational lecture to understand the basics of AI."
            videoUrl="https://www.youtube.com/embed/aircAruvnKk"
            isCompleted={tasks.neural}
            onToggle={(val) => toggleTask('neural', val)}
          />

          <RevisionTask 
            title="Calculus: Limits & Continuity"
            description="Review the core concepts of limits and continuity. Practice problems 1-15 in the workbook."
            isCompleted={tasks.calculus}
            onToggle={(val) => toggleTask('calculus', val)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
