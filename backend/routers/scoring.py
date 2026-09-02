from fastapi import APIRouter

from models.scoring import EvaluarTransaccionRequest, EvaluarTransaccionResponse
from services import scoring_service

router = APIRouter(prefix="/api/v1/scoring", tags=["Scoring Transaccional"])


@router.post("/evaluar-transaccion", response_model=EvaluarTransaccionResponse)
def evaluar_transaccion(payload: EvaluarTransaccionRequest) -> EvaluarTransaccionResponse:
    """Evalúa una transacción financiera y retorna el dictamen de riesgo SARLAFT/AML."""
    return scoring_service.evaluar_transaccion(payload)
