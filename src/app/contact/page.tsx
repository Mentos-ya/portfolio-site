export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-4">Связаться<br className="md:hidden" /> со мной</h1>
      <p className="text-xl text-gray-600 mb-12">
        Я всегда заинтересован в обсуждении новых идей продукта, возможностях сотрудничества или инсайтах по product management.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Options */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Telegram</h3>
              <a
                href="https://t.me/iak_ilia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                https://t.me/iak_ilia
              </a>
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
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <a
                href="mailto:iak.ilia.main@gmail.com"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                iak.ilia.main@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Чем я могу помочь</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-bold mb-2">Product Manager в команду</h3>
              <p className="text-gray-600 text-sm">
                Ищу позицию, где смогу применить свой опыт работы — от discovery до масштабирования
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-bold mb-2">Нетворкинг</h3>
              <p className="text-gray-600 text-sm">
                Открыт к общению. Пишите — обсудим идеи, обменяемся опытом или просто познакомимся
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
