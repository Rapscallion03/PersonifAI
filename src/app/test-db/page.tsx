"use client";

import { useState, useEffect } from "react";
import { SimpleTask, LectureTask, RevisionTask } from "@/components";

export default function TestDBPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch data from DB
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error (${res.status}): ${errorText.substring(0, 100)}...`);
        // console.log("Error")
      }
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Post sample data to DB
  const createSampleTask = async () => {
    setIsPosting(true);
    const sampleData = {
      title: "Sample AI Generated Task " + Math.floor(Math.random() * 100),
      juice: { level: "Beginner", time: "30 mins" },
      subSteps: [
        { type: "TEXT", title: "Read Intro", content: "Learn what AI is." },
        { type: "VIDEO", title: "Watch Video", content: "https://www.youtube.com/embed/aircAruvnKk" },
        { type: "REVISION", title: "Quick Quiz", content: "Test your knowledge." }
      ]
    };

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sampleData),
      });
      if (res.ok) {
        await fetchTasks(); // Refresh list
      }
    } catch (err) {
      console.error("Post failed:", err);
    } finally {
      setIsPosting(false);
    }
  };

  // 3. Toggle completion
  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/substeps/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !currentStatus }),
      });
      fetchTasks(); // Refresh to show updated state
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">DB Sync Test Page</h1>
          <button 
            onClick={createSampleTask}
            disabled={isPosting}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all"
          >
            {isPosting ? "Posting..." : "POST Sample Task"}
          </button>
        </div>

        {isLoading ? (
          <p className="text-gray-500">Loading from NeonDB...</p>
        ) : (
          <div className="space-y-12">
            {tasks.map((task) => (
              <div key={task.id} className="border-l-4 border-indigo-500 pl-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{task.title}</h2>
                <div className="space-y-4">
                  {task.subSteps.map((step: any) => {
                    if (step.type === "VIDEO") {
                      return (
                        <LectureTask 
                          key={step.id}
                          title={step.title}
                          description="Video lecture from DB"
                          videoUrl={step.content}
                          isCompleted={step.isCompleted}
                          onToggle={() => handleToggle(step.id, step.isCompleted)}
                        />
                      );
                    }
                    if (step.type === "REVISION") {
                      return (
                        <RevisionTask 
                          key={step.id}
                          title={step.title}
                          description={step.content}
                          isCompleted={step.isCompleted}
                          onToggle={() => handleToggle(step.id, step.isCompleted)}
                        />
                      );
                    }
                    return (
                      <SimpleTask 
                        key={step.id}
                        title={step.title}
                        description={step.content}
                        isCompleted={step.isCompleted}
                        onToggle={() => handleToggle(step.id, step.isCompleted)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            {tasks.length === 0 && <p className="text-gray-500">No tasks in database yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
