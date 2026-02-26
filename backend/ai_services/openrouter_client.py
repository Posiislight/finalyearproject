"""
OpenRouter API client for AI features.

Wraps the OpenRouter chat completions API (OpenAI-compatible) into a
single reusable function that all views can call.
"""

import json
import logging
import re

import requests
from django.conf import settings

logger = logging.getLogger(__name__)

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def chat_completion(messages, model=None, max_tokens=1024, temperature=0.7):
    """
    Send a chat completion request to OpenRouter.

    Args:
        messages: List of message dicts, e.g. [{"role": "user", "content": "..."}]
        model: OpenRouter model string. Falls back to settings.OPENROUTER_MODEL.
        max_tokens: Maximum tokens in the response.
        temperature: Sampling temperature (0 = deterministic, 1 = creative).

    Returns:
        The assistant's response text as a string.

    Raises:
        Exception on network/API errors (callers should catch and handle).
    """
    api_key = getattr(settings, "OPENROUTER_API_KEY", None)
    if not api_key:
        raise ValueError(
            "OPENROUTER_API_KEY is not set in Django settings. "
            "Add it to your .env file."
        )

    model = model or getattr(settings, "OPENROUTER_MODEL", "google/gemini-2.0-flash-001")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:8000",
        "X-Title": "JobPlatform AI",
    }

    payload = {
        "model": model,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature,
    }

    logger.info("OpenRouter request → model=%s, messages=%d", model, len(messages))

    response = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=60)
    response.raise_for_status()

    data = response.json()

    # Extract the assistant message content
    try:
        content = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError) as exc:
        logger.error("Unexpected OpenRouter response structure: %s", data)
        raise ValueError("Unexpected response from OpenRouter") from exc

    return content


def chat_completion_json(messages, model=None, max_tokens=1024, temperature=0.3):
    """
    Like chat_completion, but parses the response as JSON.
    The system prompt should instruct the model to return valid JSON.

    Returns:
        Parsed Python dict/list from the JSON response.
    """
    raw = chat_completion(messages, model=model, max_tokens=max_tokens, temperature=temperature)

    # Strip markdown code fences if the model wraps its response
    cleaned = raw.strip()

    # Remove ```json ... ``` or ``` ... ```
    fence_pattern = re.compile(r'^```(?:json)?\s*\n?(.*?)```\s*$', re.DOTALL)
    match = fence_pattern.match(cleaned)
    if match:
        cleaned = match.group(1).strip()
    elif cleaned.startswith("```"):
        # Fence opened but never closed (truncated response) — strip opening
        first_newline = cleaned.find("\n")
        if first_newline != -1:
            cleaned = cleaned[first_newline + 1:]
        cleaned = cleaned.rstrip("`").strip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as exc:
        logger.error("Failed to parse OpenRouter JSON response: %s", raw[:500])
        raise ValueError("AI returned invalid JSON") from exc

