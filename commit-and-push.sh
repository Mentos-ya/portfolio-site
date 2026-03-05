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

COMMIT_MSG="UI: пасхалка, градиенты, навыки вайбкодинга, отступы

Пасхалка «Добавить кейс»:
- Модалка без белой рамки: только затемнённый фон, гифка сундука и текст
- Текст «Ура, это мэтч!» с переносами, без жирного, крупнее; «вашего предложения о работе» на одной строке
- При наведении на блок: тёмный фон (bg-black/60), диагональные полоски с градиентом (розовый→фиолетовый→синий), равномерно по ширине

Hero и главная:
- Фраза «Активно применяю LLM… Claude Code» в градиенте и отдельным абзацем
- Viewport в layout; превью резюме выровнено по верху (items-start), масштаб 97%, небольшой отступ вниз (mt-4)
- Уменьшены вертикальные отступы между секциями (py-14, mb-8 и т.д.)

Карточки и полоски:
- У превью «Понятно» вертикальная градиентная полоска справа (как в макете)
- Rewrites в next.config для apple-touch-icon (убирают 404)

Навыки:
- Добавлены скиллы с градиентом шрифта: Vibe Coding, Cursor, Claude, Prompt Engineering, No-code / Low-code
- Класс .text-gradient-hero в globals.css

Скрипт copy-chest-gif.js и npm run copy:chest для копирования chest_transparent.gif в public/images"

git commit -m "$COMMIT_MSG"
echo "Пуш в origin main..."
git push -u origin main
echo "Готово. Коммит: $(git rev-parse --short HEAD)"
