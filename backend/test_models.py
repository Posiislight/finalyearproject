import os, requests
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')

# Test multiple model IDs to find which ones work
api_key = "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"
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:8000",
}

models_to_try = [
    "google/gemini-2.0-flash-001",
    "google/gemini-2.5-flash-preview",
    "google/gemini-2.5-flash-preview-05-20",
    "google/gemini-2.0-flash-thinking-exp:free",
    "google/gemini-2.5-pro-preview-05-06",
    "google/gemini-pro-1.5",
    "google/gemini-flash-1.5",
    "meta-llama/llama-3.1-70b-instruct",
    "deepseek/deepseek-chat-v3-0324:free",
]

for model in models_to_try:
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": "Say hi"}],
        "max_tokens": 5,
    }
    try:
        r = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload, timeout=10)
        if r.status_code == 200:
            print(f"  OK  {model}")
        else:
            print(f" {r.status_code}  {model} — {r.text[:80]}")
    except Exception as e:
        print(f" ERR  {model} — {e}")
