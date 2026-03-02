export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
      <p className="text-xl text-gray-600 mb-12">
        I'm always interested in discussing new product ideas, collaboration opportunities, or product management insights.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Options */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <a
                href="mailto:iak.ilia.main@gmail.com"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                iak.ilia.main@gmail.com
              </a>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Telegram</h3>
              <a
                href="https://t.me/iak_ilia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                @iak_ilia
              </a>
              <p className="text-gray-600 text-sm mt-1">Quick communication for urgent matters</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">LinkedIn</h3>
              <a
                href="https://linkedin.com/in/iakupov-ilia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                linkedin.com/in/iakupov-ilia
              </a>
              <p className="text-gray-600 text-sm mt-1">Professional networking and updates</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p className="text-gray-700 text-lg">Belgrad, Serbia</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <h2 className="text-2xl font-bold mb-6">How I Can Help</h2>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-bold mb-2">Product Strategy Consultation</h3>
              <p className="text-gray-600 text-sm">
                Advice on product roadmaps, go-to-market strategies, and marketplace dynamics
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-bold mb-2">PM Mentorship</h3>
              <p className="text-gray-600 text-sm">
                Guidance for product managers at any level looking to develop their skills
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-bold mb-2">Product Collaboration</h3>
              <p className="text-gray-600 text-sm">
                Partnership opportunities in HotelTech, TravelTech, or Marketplace platforms
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-bold mb-2">Speaking & Articles</h3>
              <p className="text-gray-600 text-sm">
                Interested in discussing product management trends and best practices
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="mt-12 pt-12 border-t border-gray-200">
        <p className="text-gray-600">
          <strong>Response time:</strong> I typically respond to messages within 24-48 hours.
          For urgent matters, feel free to reach out via Telegram.
        </p>
      </div>
    </div>
  )
}
