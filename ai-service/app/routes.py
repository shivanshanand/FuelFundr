from fastapi import APIRouter
from app.schemas import CampaignInput
from app.llm import generate_campaign_text

router = APIRouter()

@router.post("/generate")
def generate_campaign(data: CampaignInput):
    result = generate_campaign_text(data)
    return result