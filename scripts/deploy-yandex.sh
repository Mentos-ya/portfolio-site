#!/bin/bash
# Копия сайта в Яндекс Облаке (бакет iakupov) — открывается из России без VPN.
# Собирает статику в out/ и заливает каждый файл со своим типом:
# у yc фильтры --include/--exclude не работают как в aws, поэтому по одному файлу.
cd "$(dirname "$0")/.." || exit 1
YC=~/yandex-cloud/bin/yc
BUCKET=iakupov

rm -rf out
if ! STATIC_EXPORT=1 npx next build; then echo "Сборка упала"; exit 1; fi
# Иконка для айфона: на Vercel это переадресация, в бакете — просто копия фото
cp public/images/profile.jpg out/apple-touch-icon.png
cp public/images/profile.jpg out/apple-touch-icon-precomposed.png

cd out || exit 1
find . -type f ! -name ".*" | while read -r f; do
  case "${f##*.}" in
    html) ct="text/html; charset=utf-8";; js) ct=application/javascript;; css) ct=text/css;; json) ct=application/json;;
    svg) ct=image/svg+xml;; webp) ct=image/webp;; woff2) ct=font/woff2;; png) ct=image/png;; jpg|jpeg) ct=image/jpeg;;
    gif) ct=image/gif;; mp4) ct=video/mp4;; mov) ct=video/quicktime;; txt) ct="text/plain; charset=utf-8";; *) ct=application/octet-stream;;
  esac
  $YC storage s3 cp "$f" "s3://$BUCKET/${f#./}" --only-show-errors --content-type "$ct" || echo "Не залился: $f"
done
echo "Готово: https://$BUCKET.website.yandexcloud.net"
