#!/bin/bash
# Коммит и пуш в https://github.com/Mentos-ya/portfolio-site (main)
set -e
cd "$(dirname "$0")"

REMOTE_URL="https://github.com/Mentos-ya/portfolio-site.git"

if [ ! -d .git ]; then
  echo "Инициализация git..."
  git init
  git remote add origin "$REMOTE_URL"
fi

echo "Fetch с origin..."
git fetch origin --prune 2>/dev/null || true

# Переключиться на main (локальную или от origin)
if git show-ref --verify refs/remotes/origin/main &>/dev/null; then
  echo "Переключение на origin/main..."
  git checkout -B main origin/main 2>/dev/null || git checkout main
else
  echo "Ветка main на origin не найдена, используем текущую..."
  git checkout -B main 2>/dev/null || true
fi

echo "Добавление всех изменений..."
git add -A

if git diff --staged --quiet 2>/dev/null; then
  echo "Нет изменений для коммита."
  exit 0
fi

COMMIT_MSG="Обновления портфолио: главная, контакты, подвал, навыки

- Hero: жирный Product Manager, превью резюме по высоте и справа, оверлей «Открыть резюме →»
- Навигация: Портфолио ведёт на главную, убраны «Обо мне» и «Редактировать»
- Опыт: карточка LetoPlace без списка достижений, пропорциональная высота; карточка Понятно (Indie Maker, лого)
- Текст: «Проекты, которые я вёл…», «(vs ~25% по рынку)» без переноса, проверка текста
- Блок Навыки после Опыта (Tech Stack & Tools, теги)
- Контакты: только Telegram, LinkedIn, Email; убраны подписи и Локация
- Чем я могу помочь: 2 блока (Product Manager в команду, Нетворкинг), выравнивание по уровню и по низу
- Убраны: время ответа, PM Менторство, подписи под контактами
- Подвал: только копирайт, чёрный фон
- Footer: bg-black"

git commit -m "$COMMIT_MSG"
echo "Пуш в origin main..."
git push -u origin main
echo "Готово. Коммит: $(git rev-parse --short HEAD)"
