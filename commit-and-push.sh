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

COMMIT_MSG="Пасхалка сундук, образование, стек Понятно, навигация с проектов

- Пасхалка: блок «Добавить кейс» под кейсами, модалка с картинкой/гифкой сундука (public/images/chest-open.png или .gif), fallback на эмодзи при ошибке загрузки
- Образование: блок над навыками — GoPractice (ссылка на сертификат, тултип «Открыть сертификат»), ТГУ Высшая школа бизнеса, ТГАСУ Архитектура
- Понятно: дата Февраль 2026, раздел «Стек проекта» на всю ширину, риски под приоритизацией, выравнивание отступов
- Проекты: левая полоса BackToPortfolioStrip (ссылка на /#projects), layout для страниц проектов
- public/images: README-chest.txt с подсказкой по файлу сундука"

git commit -m "$COMMIT_MSG"
echo "Пуш в origin main..."
git push -u origin main
echo "Готово. Коммит: $(git rev-parse --short HEAD)"
