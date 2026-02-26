import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

from django.conf import settings
print(f"Model: {settings.OPENROUTER_MODEL}")

from ai_services.openrouter_client import chat_completion_json
messages = [
    {"role": "system", "content": "You are a recruitment AI. Return ONLY valid JSON with \"match_score\" (int 0-100) and \"reason\" (string, 3-4 sentences). No markdown, no code fences, just raw JSON."},
    {"role": "user", "content": "Rate how well a Frontend Developer with skills in SQL and Figma matches a Senior React Developer role requiring 3+ years React, TypeScript, Redux."},
]
try:
    result = chat_completion_json(messages, max_tokens=2048)
    print(f"Score: {result.get('match_score')}")
    print(f"Reason: {result.get('reason')}")
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")
