export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-4">Связаться со мной</h1>
      <p className="text-xl text-gray-600 mb-12">
        Я всегда заинтересован в обсуждении новых идей продукта, возможностях сотрудничества или инсайтах по product management.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Options */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>

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
              <p className="text-gray-600 text-sm mt-1">Быстрая связь по срочным вопросам</p>
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
              <p className="text-gray-600 text-sm mt-1">Professional networking и обновления</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Локация</h3>
              <p className="text-gray-700 text-lg">Белград, Сербия</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Чем я могу помочь</h2>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-bold mb-2">Product Strategy Консультации</h3>
              <p className="text-gray-600 text-sm">
                Рекомендации по product roadmaps, go-to-market стратегиям и marketplace dynamics
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-bold mb-2">PM Менторство</h3>
              <p className="text-gray-600 text-sm">
                Помощь product managers любого уровня в развитии своих навыков
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-bold mb-2">Product Сотрудничество</h3>
              <p className="text-gray-600 text-sm">
                Возможности партнерства в HotelTech, TravelTech или Marketplace платформах
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-bold mb-2">Выступления & Статьи</h3>
              <p className="text-gray-600 text-sm">
                Интересуюсь обсуждением тенденций product management и best practices
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="mt-12 pt-12 border-t border-gray-200">
        <p className="text-gray-600">
          <strong>Время ответа:</strong> Обычно отвечаю на сообщения в течение 24-48 часов.
          По срочным вопросам можно написать в Telegram.
        </p>
      </div>
    </div>
  )
}
