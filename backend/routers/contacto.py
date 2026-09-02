from fastapi import APIRouter

from models.contacto import SolicitudContactoRequest, SolicitudContactoResponse
from services import contacto_service

router = APIRouter(prefix="/api/v1/contacto", tags=["Contacto"])


@router.post("", response_model=SolicitudContactoResponse)
def enviar_solicitud_contacto(payload: SolicitudContactoRequest) -> SolicitudContactoResponse:
    """Recibe una solicitud del formulario de diagnóstico comercial."""
    return contacto_service.procesar_solicitud_contacto(payload)
