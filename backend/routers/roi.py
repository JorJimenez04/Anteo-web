from fastapi import APIRouter

from models.roi import CalcularRoiRequest, CalcularRoiResponse
from services import roi_service

router = APIRouter(prefix="/api/v1/roi", tags=["Calculadora ROI"])


@router.post("/calcular", response_model=CalcularRoiResponse)
def calcular_roi(payload: CalcularRoiRequest) -> CalcularRoiResponse:
    """Estima el ahorro mensual y las horas de análisis manual ahorradas al implementar Anteo."""
    return roi_service.calcular_roi(payload)
