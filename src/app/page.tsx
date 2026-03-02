'use client'

import Image from 'next/image'
import homeData from '@/data/home.json'
import projectsData from '@/data/projects.json'
import ProjectCard from '@/components/ProjectCard'
import { useState } from 'react'

const skillCategories = [
  {
    name: 'Product & Strategy',
    skills: ['Product Strategy', 'Roadmap Planning', 'Customer Lifecycle Mapping', 'Lean Canvas', 'Go-To-Market Strategy', 'Hypothesis Testing'],
  },
  {
    name: 'Analytics & Data',
    skills: ['A/B Testing', 'Funnel Analysis', 'Cohort Analysis', 'Amplitude', 'Google Analytics', 'User Research'],
  },
  {
    name: 'Tools & Tech',
    skills: ['Asana', 'Notion', 'API Integration', 'CRM Automation (amoCRM)', 'IoT Integration', 'Telegram Bots', 'AI Integration'],
  },
  {
    name: 'Leadership & Management',
    skills: ['Team Leadership', 'Remote Team Management', 'Stakeholder Management', 'Cross-functional Collaboration', 'Product Discovery'],
  },
]

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 mb-12 items-stretch">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
              {homeData.hero.name}
            </h1>
            <p className="text-lg text-gray-500 mb-4">
              {homeData.hero.descriptionPart1}
            </p>
            <p className="text-lg text-gray-500 mb-8">
              {homeData.hero.descriptionPart2}
            </p>

            <div className="flex gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                Смотреть проекты
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-black text-black rounded hover:bg-black hover:text-white transition"
              >
                Связаться со мной
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <a
              href="https://drive.google.com/file/d/1V5T1eL9UcOuFwWGZegu2HZKgeDoPdsxW/view"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all duration-300 hover:shadow-lg relative"
            >
              <Image
                src="/images/resume.png"
                alt="Resume preview"
                width={360}
                height={486}
                className="rounded-lg border-2 border-gray-300 group-hover:border-blue-600 transition-all duration-300 shadow-md group-hover:shadow-xl"
                priority
              />
              {/* Profile Photo in Top-Right Corner */}
              <div className="absolute top-0 right-0 w-[105px] h-[105px] rounded-full border-[5px] border-blue-600 overflow-hidden shadow-lg bg-white transform -translate-y-1/2 translate-x-1/2">
                <Image
                  src="/images/profile.jpg"
                  alt="Profile"
                  width={105}
                  height={105}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-4">{projectsData.pageTitle}</h1>
        <p className="text-xl text-gray-600 mb-12">
          {projectsData.pageDescription}
        </p>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <ProjectCard
            id={0}
            isSelected={selectedCard === 0}
            onClick={() => setSelectedCard(selectedCard === 0 ? null : 0)}
            title="LetoPlace"
            role="Product Manager & Growth PM"
            emoji="🏢"
            description="Digital-сервис для аренды имущества. Создал двустороннюю платформу (B2C + B2B) с 50+ объектами в портфеле."
            metrics={[
              "💰 5M RUB/месяц revenue",
              "📈 LTV ↑23% (через программу лояльности)",
              "🔄 Повторные бронирования ↑8% → 12%",
              "📊 Загрузка объектов: 75% → 91%",
              "⏱️ Время ответа клиенту: 15 мин → 5 мин"
            ]}
          />
          <ProjectCard
            id={1}
            isSelected={selectedCard === 1}
            onClick={() => setSelectedCard(selectedCard === 1 ? null : 1)}
          />
        </div>

        <div className="space-y-12">
          {/* LetoPlace */}
          <div className="border-b border-gray-200 pb-12 last:border-b-0">
            <h2 className="text-3xl font-bold mb-2">LetoPlace</h2>
            <p className="text-gray-500 mb-4">Product Manager & Growth PM | 2020 – Ноябрь 2025</p>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="font-bold mb-2">Описание</h3>
                <p className="text-gray-700">
                  С нуля создал digital-сервис для аренды имущества. С нуля создал двустороннюю платформу (B2C для путешественников и B2B для собственников). В портфеле 50+ объектов в Санкт-Петербурге, 5M RUB revenue в месяц, 31% маржинальность.
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Ключевые метрики</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• <strong>5M RUB</strong> ежемесячный доход</li>
                  <li>• <strong>50+</strong> активных объектов</li>
                  <li>• <strong>31%</strong> маржа</li>
                  <li>• <strong>+23%</strong> рост LTV</li>
                </ul>
              </div>
            </div>

            <h3 className="font-bold mb-2">Главные достижения</h3>
            <ul className="text-gray-700 space-y-1 mb-6">
              <li>✓ Вырастил LTV на 23% через программу лояльности, персонализированные предложения и контроль качества</li>
              <li>✓ Увеличил North Star Metric (повторные бронирования) с 8% до 12%</li>
              <li>✓ Поднял загрузку объектов с 75% до 91% за счет динамичного ценообразования</li>
              <li>✓ Оптимизировал юнит-экономику B2B клиентов: +30% дохода к долгосрочной аренде</li>
              <li>✓ Уменьшил расходы на персонал на 15% через автоматизацию с электронными замками и amoCRM</li>
              <li>✓ Сократил время ответа клиенту с 15 до 5 минут через автоматизацию и Telegram-бота</li>
              <li>✓ Снизил CAC на 15% и увеличил трафик сайта на 30% через редизайн и интеграцию booking-системы</li>
              <li>✓ Достиг 80% retention B2B-клиентов (vs 50% по рынку) через прозрачную аналитику доходности</li>
              <li>✓ Увеличил портфель объектов в 3 раза через выстраивание sales-команды и реферальной программы</li>
            </ul>

            <h3 className="font-bold mb-2">Tech Stack & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {['Product Strategy', 'User Research', 'A/B Testing', 'Amplitude', 'Asana', 'Notion', 'amoCRM', 'API Integration', 'Telegram Bot', 'Financial Modeling'].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-20">
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
                <p className="text-gray-700 text-lg">Москва, Россия</p>
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
                  Возможности партнерства в PropTech, TravelTech или Marketplace платформах
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
      </section>
    </div>
  )
}
