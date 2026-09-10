export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-4">Связаться<br className="md:hidden" /> со мной</h1>
      <p className="text-xl text-zinc-400 mb-12">
        Я всегда заинтересован в обсуждении новых идей продукта, возможностях сотрудничества или инсайтах по product management.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Options */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Telegram</h3>
              <div className="relative inline-block group">
                <a
                  href="https://t.me/iak_ilia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:underline text-lg"
                >
                  https://t.me/iak_ilia
                </a>
                <span className="absolute left-0 top-full mt-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Открыть Telegram
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">LinkedIn</h3>
              <div className="relative inline-block group">
                <a
                  href="https://linkedin.com/in/ilia-iakupov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:underline text-lg"
                >
                  linkedin.com/in/ilia-iakupov
                </a>
                <span className="absolute left-0 top-full mt-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Открыть LinkedIn
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <div className="relative inline-block group">
                <a
                  href="mailto:iak.ilia.main@gmail.com"
                  className="text-white underline hover:underline text-lg"
                >
                  iak.ilia.main@gmail.com
                </a>
                <span className="absolute left-0 top-full mt-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Написать письмо
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Чем я могу помочь</h2>
          <div className="space-y-4">
            <div className="p-4 bg-night-card rounded">
              <h3 className="font-bold mb-2">Product Manager в команду</h3>
              <p className="text-zinc-400 text-sm">
                Ищу позицию, где смогу применить свой опыт работы — от discovery до масштабирования
              </p>
            </div>

            <div className="p-4 bg-night-card rounded">
              <h3 className="font-bold mb-2">Нетворкинг</h3>
              <p className="text-zinc-400 text-sm">
                Открыт к общению. Пишите — обсудим идеи, обменяемся опытом или просто познакомимся
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="mt-12 pt-12 border-t border-night-edge">
        <p className="text-zinc-400">
          <strong>Время ответа:</strong> Обычно отвечаю на сообщения в течение 24-48 часов.
          По срочным вопросам можно написать в Telegram.
        </p>
      </div>
    </div>
  )
}
