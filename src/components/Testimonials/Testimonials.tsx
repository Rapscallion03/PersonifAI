interface Testimonial {
  name: string;
  role: string;
  initials: string;
  gradient: string;
  rating: number;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rahul Sharma",
    role: "High School Student",
    initials: "RS",
    gradient: "from-blue-400 to-blue-600",
    rating: 5,
    content: "PersonifAI helped me improve my math grades from C to A in just 3 months. The AI tutor explains concepts in a way I actually understand!"
  },
  {
    name: "Priya Kumar",
    role: "Engineering Student",
    initials: "PK",
    gradient: "from-purple-400 to-purple-600",
    rating: 5,
    content: "As a college student juggling multiple courses, PersonifAI's adaptive learning feature saved my semester. Highly recommended!"
  },
  {
    name: "Arjun Patel",
    role: "Class 12 Student",
    initials: "AP",
    gradient: "from-green-400 to-green-600",
    rating: 5,
    content: "The practice tests are incredibly accurate. I felt so prepared for my board exams thanks to PersonifAI!"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Students Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of students who have transformed their learning
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
