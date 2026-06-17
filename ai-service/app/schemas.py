from __future__ import annotations

from datetime import datetime
from typing import Optional, Literal
from enum import Enum

from pydantic import BaseModel, Field, field_validator, model_validator


# ─────────────────────────────────────────────
# ENUMS  (mirror Mongoose enums exactly)
# ─────────────────────────────────────────────


class CategoryEnum(str, Enum):
    STARTUP      = "Startup"
    HACKATHON    = "Hackathon"
    PROJECT      = "Project"
    SOCIAL_CAUSE = "Social Cause"
    CREATIVE     = "Creative"

class StatusEnum(str, Enum):
    OPEN      = "open"
    FULFILLED = "fulfilled"
    CLOSED    = "closed"

class ToneEnum(str, Enum):
    INSPIRING      = "Inspiring"
    PROFESSIONAL   = "Professional"
    CASUAL         = "Casual and friendly"
    URGENCY_DRIVEN = "Urgency-driven"
    STORYTELLING   = "Storytelling"

class LengthEnum(str, Enum):
    SHORT  = "short"
    MEDIUM = "medium"
    LONG   = "long"

class CampaignInput(BaseModel):
    title: str
    goal: str
    category: CategoryEnum
    tone: ToneEnum = ToneEnum.INSPIRING
    length: LengthEnum = LengthEnum.MEDIUM