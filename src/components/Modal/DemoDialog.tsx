"use client";

interface DemoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoDialog({ isOpen, onClose }: DemoDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 transform transition-all text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Coming Soon!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          A demo will be available soon. Stay tuned for an interactive experience!
        </p>

        {/* Notify Me Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5"
        >
          Notify Me
        </button>

        {/* Close Text */}
        <button
          onClick={onClose}
          className="mt-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}
