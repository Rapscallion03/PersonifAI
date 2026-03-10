interface Step {
  number: number;
  title: string;
  description: string;
  gradient: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Create Account",
    description: "Sign up for free and tell us about your learning goals",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    number: 2,
    title: "AI Assessment",
    description: "Take a quick assessment so AI understands your level",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    number: 3,
    title: "Get Personalized Plan",
    description: "Receive a custom learning path tailored just for you",
    gradient: "from-pink-500 to-orange-500"
  },
  {
    number: 4,
    title: "Start Learning",
    description: "Begin your journey with AI-guided lessons and support",
    gradient: "from-orange-500 to-red-500"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How PersonifAI Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get started in minutes and transform your learning experience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold`}>
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
