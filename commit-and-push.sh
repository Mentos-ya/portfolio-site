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

# Показать отличия от origin/main (если есть)
if git show-ref --verify refs/remotes/origin/main &>/dev/null; then
  echo "--- Изменённые файлы в сравнении с origin/main ---"
  git diff --stat origin/main -- . 2>/dev/null || true
  git diff --stat --cached origin/main -- . 2>/dev/null || true
  echo "---"
fi

# Переключиться на main (синхронно с origin), не затирая локальные файлы
HAS_LOCAL_COMMITS=$(git rev-parse HEAD 2>/dev/null || true)
if [ -n "$HAS_LOCAL_COMMITS" ] && git show-ref --verify refs/remotes/origin/main &>/dev/null; then
  git checkout -B main origin/main
fi
if ! git rev-parse main &>/dev/null; then
  git checkout -b main 2>/dev/null || true
fi

echo "Добавление всех изменений..."
git add -A

if git diff --staged --quiet 2>/dev/null; then
  echo "Нет изменений для коммита."
  exit 0
fi

COMMIT_MSG="UI: мобильная версия, превью на всю ширину, подвал, время работы

Мобильная — Hero и контент:
- Фото в блоке текста слева (float-left), текст обтекает; отступ имени от фото (mr-5); на десктопе фото только на превью резюме
- Секция «Навыки» скрыта на мобильной (hidden md:block)
- Отступ до подвала уменьшен, почти вплотную к тексту (mt-2 md:mt-20)
- Ширина страницы зафиксирована: overflow-x-hidden на body/html только на мобильной — без горизонтального скролла (layout.tsx, globals.css)

Мобильная — превью вложений:
- ImageCarousel: на мобильной на всю ширину и по центру (w-full max-w-full, md:max-w-[265px]/[300px], mx-auto md:mx-0)
- LetoPlace: превью оффера (предложение о сотрудничестве) w-full на мобильной; Tech Stack & Tools скрыт на мобильной
- Понятно: превью видео max-w-full на мобильной

Мобильная — время работы и отступы:
- Понятно/LetoPlace (страницы): период (время работы) на следующую строку на мобильной; убран зазор между строками (gap-y-0, gap-x-4)
- ProjectCard: роль с « | » на мобильной в две строки (должность и период), на десктопе одна строка

Пасхалка «Добавить кейс»:
- На мобильной увеличен отступ текста от сундука (-mt-20 md:-mt-32)"

git commit -m "$COMMIT_MSG"
echo "Пуш в origin main..."
git push -u origin main
echo "Готово. Коммит: $(git rev-parse --short HEAD)"
