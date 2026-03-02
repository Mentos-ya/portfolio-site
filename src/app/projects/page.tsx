export default function Projects() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-4">Projects</h1>
      <p className="text-xl text-gray-600 mb-12">
        A selection of key projects I've worked on as a Product Manager
      </p>

      <div className="space-y-12">
        {/* LetoPlace */}
        <div className="border-b border-gray-200 pb-12 last:border-b-0">
          <h2 className="text-3xl font-bold mb-2">LetoPlace</h2>
          <p className="text-gray-500 mb-4">Product Manager & Growth PM | 2018 - June 2025</p>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="font-bold mb-2">Overview</h3>
              <p className="text-gray-700">
                Built and scaled a digital rental service marketplace connecting property owners with travelers.
                Launched in 3 cities with 50+ active properties generating 5M RUB monthly revenue.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Key Metrics</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• <strong>5M RUB</strong> monthly revenue</li>
                <li>• <strong>50+</strong> active properties</li>
                <li>• <strong>31%</strong> margin</li>
                <li>• <strong>+23%</strong> LTV growth</li>
              </ul>
            </div>
          </div>

          <h3 className="font-bold mb-2">Responsibilities</h3>
          <ul className="text-gray-700 space-y-1 mb-6">
            <li>✓ Defined product vision and strategy for marketplace expansion</li>
            <li>✓ Conducted customer development interviews with 50+ property owners and travelers</li>
            <li>✓ Designed and implemented A/B tests resulting in 23% LTV improvement</li>
            <li>✓ Managed B2B partnerships with property management companies</li>
            <li>✓ Built and led remote team of developers and designers</li>
            <li>✓ Integrated IoT systems and developed Telegram bot for property management</li>
            <li>✓ Set up analytics with Amplitude for funnel and cohort analysis</li>
            <li>✓ Grew North Star Metric from 8% to 12% through product optimizations</li>
          </ul>

          <h3 className="font-bold mb-2">Tech Stack & Tools</h3>
          <div className="flex flex-wrap gap-2">
            {['Lean Canvas', 'User Research', 'A/B Testing', 'Amplitude', 'Asana', 'Notion', 'amoCRM', 'API Integration', 'Telegram Bot', 'Funnel Analysis'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Other Experience */}
      <div className="mt-16 pt-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-8">Other Experience</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold">Product Manager - HotelTech & TravelTech</h3>
            <p className="text-gray-500 text-sm">Various Projects | 7+ years total experience</p>
            <p className="text-gray-700 mt-2">
              Extensive experience in hospitality and travel tech industries, building products from 0-1 and scaling
              to millions in revenue. Expertise in marketplace dynamics, user onboarding, and sustainable growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
