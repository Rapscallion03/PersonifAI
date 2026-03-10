export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Learning?
        </h2>
        <p className="text-xl text-indigo-100 mb-10">
          Join thousands of students already learning smarter with PersonifAI
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            Get Started Free
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-white hover:bg-white/10 transition-all">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}
