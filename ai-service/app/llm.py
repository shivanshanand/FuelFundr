from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ─────────────────────────────────────────────
# SIMPLE SAFETY CHECKS
# ─────────────────────────────────────────────

SCAM_PHRASES = [
    "no questions asked",
    "send money fast",
    "trust me",
    "no details"
]

SENSITIVE_PHRASES = [
    "die",
    "urgent surgery",
    "life or death",
    "critical condition"
]

SCAM_PHRASES = [ "no questions asked", "urgent money now", "send money fast", "trust me", "no details", "100% guaranteed", "wire transfer", "western union", "bitcoin", "crypto wallet", "foreign funds", "bank fee", "advance fee", "lottery", "prize money", "inheritance", "god will repay", "miracle fund", ] 
MANIPULATION_PHRASES = [ "please i beg", "i have no one", "begging you", "please help before", "you are my last hope", "nobody cares", "dying student", ] 
VAGUE_PHRASES = [ "for expenses", "miscellaneous", "general purpose", "various costs", "whatever is needed", "anything helps", "help me out", ] 
SENSITIVE_PHRASES = [ "die", "dying", "urgent surgery", "life or death", "starving", "critical condition", "emergency operation", "last chance to live", "terminal illness", "fatal accident", "cancer treatment", ] 
PRESSURE_PHRASES = [ "act now", "limited time", "donate immediately", "don't delay", "last day", "final hours", "time running out", "only today", "expires soon", "closing soon", ]


def is_blocked(text: str):
    text = text.lower()
    return any(p in text for p in SCAM_PHRASES)


def is_sensitive(text: str):
    text = text.lower()
    return any(p in text for p in SENSITIVE_PHRASES)


# ─────────────────────────────────────────────
# PROMPT BUILDER
# ─────────────────────────────────────────────

def build_prompt(data):

    length_map = {
        "short": "under 120 words",
        "medium": "under 200 words",
        "long": "under 350 words"
    }

    tone_map = {
        "Inspiring": "Use uplifting and hopeful language",
        "Professional": "Use clear and formal language",
        "Casual and friendly": "Use simple conversational tone",
        "Urgency-driven": "Highlight urgency but avoid exaggeration",
        "Storytelling": "Focus on narrative and personal journey"
    }

    text = f"{data.title} {data.goal}"

    safety_block = ""
    if is_sensitive(text):
        safety_block = """
IMPORTANT:
- Do NOT exaggerate life-or-death urgency
- Keep tone calm, factual, and respectful
"""

    return f"""
You are an expert crowdfunding copywriter.

Write a HIGH-CONVERTING campaign description.

INPUT:
Title: {data.title}
Goal: {data.goal}
Category: {data.category}

STYLE:
- {tone_map.get(data.tone, "")}
- Length: {length_map.get(data.length, "under 200 words")}

REQUIREMENTS:
- Start with a strong hook
- Add a short personal story
- Clearly explain fund usage
- End with a strong call-to-action
- Avoid generic phrases

FORMAT:
- No headings
- Short paragraphs
- Mobile-friendly readability

SAFETY:
- No fake claims
- No manipulation
- No misleading urgency

{safety_block}
"""


# ─────────────────────────────────────────────
# MAIN FUNCTION
# ─────────────────────────────────────────────

def generate_campaign_text(data):

    text = f"{data.title} {data.goal}"

    # 🚫 Block obvious scam inputs
    if is_blocked(text):
        return {
            "status": "blocked",
            "content": "Please provide a clear and honest campaign description.",
        }

    prompt = build_prompt(data)

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional crowdfunding copywriter."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return {
            "status": "success",
            "content": response.choices[0].message.content.strip()
        }

    except Exception as e:
        return {
            "status": "error",
            "content": f"AI service failed: {str(e)}"
        }