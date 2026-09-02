from pydantic import BaseModel, EmailStr, Field


class SolicitudContactoRequest(BaseModel):
    nombre: str = Field(..., min_length=1, description="Nombre completo")
    empresa: str = Field(..., min_length=1)
    correo: EmailStr = Field(..., description="Correo corporativo")
    cargo: str | None = Field(None, description="Ej. Compliance Officer / CTO")
    modulos_interes: list[str] = Field(default_factory=list)
    comentarios: str | None = None


class SolicitudContactoResponse(BaseModel):
    exito: bool
    mensaje: str
