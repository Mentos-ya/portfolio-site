#!/usr/bin/env python3
# Проверка сайта на ширине 1280 и 390: страница не шире экрана, нет ошибок в консоли и битых файлов.
# Запуск: python3 scripts/check-site.py [vercel|yandex|<адрес>]   (по умолчанию — http://localhost:3456)
import sys
from playwright.sync_api import sync_playwright

HOSTS = {"vercel": "https://iakupov-portfolio.vercel.app",
         "yandex": "https://iakupov.website.yandexcloud.net"}
arg = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3456"
base = HOSTS.get(arg, arg).rstrip("/")
PAGES = ["/", "/projects/letoplace/", "/projects/ponyatno/"]
# Метрика в тестовом браузере шумит ошибками своих адресов — это не про сайт
NOISE = ("yandex.ru", "yandex.net", "mc.yandex")

problems = []
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader"])
    for w, h in [(1280, 800), (390, 844)]:
        ctx = b.new_context(viewport={"width": w, "height": h}, reduced_motion="reduce")
        pg = ctx.new_page()
        errs, bad = [], []
        pg.on("console", lambda m: m.type == "error" and errs.append(m.text))
        pg.on("response", lambda r: r.status >= 400 and not any(n in r.url for n in NOISE) and bad.append(f"{r.status} {r.url}"))
        pg.on("requestfailed", lambda r: not any(n in r.url for n in NOISE) and "ERR_ABORTED" not in (r.failure or "") and bad.append(f"{r.failure} {r.url}"))
        for path in PAGES:
            errs.clear()
            pg.goto(base + path, wait_until="networkidle")
            pg.wait_for_timeout(1500)
            sw = pg.evaluate("document.documentElement.scrollWidth")
            real = [e for e in errs if not any(n in e for n in NOISE) and "ERR_CERT" not in e]
            ok = sw <= w and not real
            print(f"{'OK ' if ok else 'ПЛОХО'} {w}px {path} ширина {sw}" + (f" ошибки: {real[:3]}" if real else ""))
            if not ok:
                problems.append(f"{w} {path}")
        if bad:
            print(f"битые файлы на {w}px:", bad[:5]); problems.append(f"{w} битые")
        ctx.close()
    b.close()

sys.exit(1 if problems else 0)
