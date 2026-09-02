from fastapi import APIRouter

from models.kyb import ValidarEmpresaRequest, ValidarEmpresaResponse
from services import kyb_service

router = APIRouter(prefix="/api/v1/kyb", tags=["KYB / UBO"])


@router.post("/validar-empresa", response_model=ValidarEmpresaResponse)
def validar_empresa(payload: ValidarEmpresaRequest) -> ValidarEmpresaResponse:
    """Audita la estructura societaria de una empresa y sus beneficiarios finales (UBO)."""
    return kyb_service.validar_empresa(payload)
