import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Ilya Yakupov
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            Product Manager & Growth Leader
          </p>
          <p className="text-lg text-gray-500 max-w-2xl">
            7+ years of experience building and scaling digital products in HotelTech and TravelTech.
            Passionate about user-centered design, data-driven decisions, and creating products that people love.
          </p>
        </div>

        <div className="flex gap-4 mb-16">
          <Link
            href="/projects"
            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-black text-black rounded hover:bg-black hover:text-white transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Key Achievement */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Key Achievement</h2>

          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">LetoPlace</h3>
            <p className="text-gray-600 mb-6">
              Built and scaled a digital rental service marketplace from zero to 50 active properties across 3 cities
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-black">5M</p>
                <p className="text-gray-600">Monthly Revenue</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-black">50+</p>
                <p className="text-gray-600">Properties</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-black">31%</p>
                <p className="text-gray-600">Margin</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Key Metrics Improvements:</p>
              <ul className="text-gray-700 space-y-1">
                <li>✓ Grew LTV by 23%</li>
                <li>✓ Increased North Star Metric from 8% to 12%</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services / What I Do */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12">What I Do</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 border border-gray-200 rounded-lg hover:border-black transition">
            <h3 className="text-xl font-bold mb-3">Product Strategy</h3>
            <p className="text-gray-600">
              Develop clear product roadmaps, define go-to-market strategies, and create lean canvases for validation.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg hover:border-black transition">
            <h3 className="text-xl font-bold mb-3">User Research</h3>
            <p className="text-gray-600">
              Conduct in-depth customer development interviews and map user lifecycle to identify key leverage points.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg hover:border-black transition">
            <h3 className="text-xl font-bold mb-3">Data & Analytics</h3>
            <p className="text-gray-600">
              Design experiments, analyze funnels, conduct cohort analysis, and drive decisions with data using Amplitude and GA.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg hover:border-black transition">
            <h3 className="text-xl font-bold mb-3">Growth & Scaling</h3>
            <p className="text-gray-600">
              Build scalable systems, manage remote teams, integrate new technologies, and drive business growth.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
