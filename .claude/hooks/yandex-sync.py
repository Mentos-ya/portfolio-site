#!/usr/bin/env python3
# После git push в main обновляет копию сайта в Яндекс Облаке (scripts/deploy-yandex.sh).
# Запускает в фоне, чтобы не держать чат; журнал — в .claude/yandex-sync.log.
import json, os, re, subprocess, sys

data = json.load(sys.stdin)
cmd = (data.get("tool_input") or {}).get("command", "")
if not re.search(r"(^|[;&|\n])\s*git\s+(-C\s+\S+\s+)?push\b", cmd):
    sys.exit(0)
resp = data.get("tool_response") or {}
if isinstance(resp, dict) and (resp.get("interrupted") or "rejected" in str(resp.get("stderr", ""))):
    sys.exit(0)

# Обновление уже идёт — второе параллельно сломает папку out/
if subprocess.run(["pgrep", "-f", "deploy-yandex.sh"], capture_output=True).returncode == 0:
    sys.exit(0)

root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
log = os.path.join(root, ".claude", "yandex-sync.log")
subprocess.Popen(
    ["bash", "-c", f'"{root}/scripts/deploy-yandex.sh" > "{log}" 2>&1; echo "Код выхода: $?" >> "{log}"'],
    cwd=root, start_new_session=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
)
print(json.dumps({"hookSpecificOutput": {"hookEventName": "PostToolUse",
    "additionalContext": "Копия в Яндекс Облаке обновляется в фоне (~2 мин), журнал .claude/yandex-sync.log. "
                         "Перед «готово» проверь её: python3 scripts/check-site.py yandex"}}, ensure_ascii=False))
