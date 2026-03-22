"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SimpleTask, LectureTask, RevisionTask } from "@/components";

export default function AIAssistant() {
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string; breakdown?: any }[]>([
    {
      role: "assistant",
      content: "Hi there! I'm your AI learning assistant. What would you like help with today? Is it your homework or college work?"
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Adjust textarea height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [userInput]);

  const handleApproveBreakdown = async (breakdown: any) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: breakdown.title,
          juice: { subject: breakdown.subject, priority: breakdown.priority },
          subSteps: breakdown.subSteps
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Failed to post breakdown:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const currentInput = userInput;
    setUserInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setIsLoading(true);

    // Add user message to UI immediately
    const newUserMessage = { role: "user", content: currentInput };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          history: messages.map(m => ({ role: m.role, content: m.content })), 
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Try to parse breakdown JSON if it exists
      let assistantContent = data.content;
      let breakdown = null;

      try {
        const jsonMatch = assistantContent.match(/\{[\s\S]*"type":\s*"BREAKDOWN_PREVIEW"[\s\S]*\}/);
        if (jsonMatch) {
          breakdown = JSON.parse(jsonMatch[0]);
          // Clean the content of the JSON block for cleaner display
          assistantContent = assistantContent.replace(jsonMatch[0], "").trim();
        }
      } catch (e) {
        console.error("Failed to parse breakdown JSON:", e);
      }

      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: assistantContent || "Here is your breakdown preview:", 
        breakdown 
      }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">PersonifAI</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Robot Character */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            {/* Robot Body */}
            <div className="w-32 h-40 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center relative">
              {/* Robot Eyes */}
              <div className="absolute top-8 flex gap-4">
                <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              {/* Robot Mouth */}
              <div className="absolute top-20 w-16 h-6 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center">
                <div className="w-12 h-2 bg-cyan-400 rounded-full"></div>
              </div>
              {/* Robot Antenna */}
              <div className="absolute -top-6 w-2 h-8 bg-gray-400 dark:bg-gray-500 rounded-full">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              </div>
            </div>
            {/* Robot Arms */}
            <div className="absolute -left-8 top-12 w-6 h-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="absolute -right-8 top-12 w-6 h-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Hello! I'm your AI Learning Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            I can help you with your homework or any college work!
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 chat-scrollbar">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">P</span>
                      </div>
                      <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">AI Assistant</span>
                    </div>
                  )}
                  {message.role === "assistant" ? (
                    <div className="markdown-content text-sm overflow-hidden">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                          li: ({node, ...props}) => <li className="mb-1" {...props} />,
                          h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-1" {...props} />,
                          code: ({node, inline, ...props}: any) => (
                            inline 
                              ? <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-xs" {...props} />
                              : <code className="block bg-gray-900 text-gray-100 p-2 rounded my-2 overflow-x-auto text-xs" {...props} />
                          ),
                          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-indigo-500 pl-3 italic my-2" {...props} />,
                          table: ({node, ...props}) => <div className="overflow-x-auto my-2"><table className="border-collapse border border-gray-300 dark:border-gray-600 w-full text-xs" {...props} /></div>,
                          th: ({node, ...props}) => <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 bg-gray-100 dark:bg-gray-800" {...props} />,
                          td: ({node, ...props}) => <td className="border border-gray-300 dark:border-gray-600 px-2 py-1" {...props} />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>

                      {message.breakdown && (
                        <div className="mt-6 border-t border-gray-200 dark:border-gray-600 pt-6">
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/30">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{message.breakdown.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs font-medium px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full">
                                    {message.breakdown.subject}
                                  </span>
                                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                    message.breakdown.priority === 'high' ? 'bg-red-100 text-red-600' :
                                    message.breakdown.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                    'bg-green-100 text-green-600'
                                  }`}>
                                    {message.breakdown.priority}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                              {message.breakdown.subSteps.map((step: any, sIdx: number) => {
                                if (step.type === "VIDEO") return <LectureTask key={sIdx} title={step.title} description="Video lecture" videoUrl={step.content} isCompleted={false} />;
                                if (step.type === "REVISION") return <RevisionTask key={sIdx} title={step.title} description={step.content} isCompleted={false} />;
                                return <SimpleTask key={sIdx} title={step.title} description={step.content} isCompleted={false} />;
                              })}
                            </div>

                            <button
                              onClick={() => handleApproveBreakdown(message.breakdown)}
                              disabled={isLoading}
                              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {isLoading ? "Adding to Dashboard..." : "Approve & Add to Dashboard"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3 text-gray-900 dark:text-white">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-end gap-3">
              <textarea
                ref={textareaRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Tell me about your homework or college work..."
                rows={1}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none overflow-y-auto chat-scrollbar"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`${isLoading ? 'opacity-50 cursor-not-allowed' : ''} bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2 h-[46px] flex-shrink-0`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                {isLoading ? 'Wait...' : 'Send'}
              </button>
            </div>
          </form>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Math Help</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Solve equations step by step</p>
          </button>
          <button className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Study Materials</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Get personalized learning resources</p>
          </button>
          <button className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Create Task</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Add a new task to your list</p>
          </button>
        </div>
      </div>
    </div>
  );
}
