from pydantic import BaseModel, Field


class ValidarEmpresaRequest(BaseModel):
    nit: str = Field(..., min_length=3, json_schema_extra={"example": "901.345.892-1"})
    razon_social: str = Field(
        ..., min_length=3, json_schema_extra={"example": "Inversiones Financieras del Caribe S.A.S."}
    )


class BeneficiarioFinal(BaseModel):
    rol: str
    nombre: str
    porcentaje_participacion: float
    verificacion_ofac_pep: str


class EstadoDocumental(BaseModel):
    certificado_camara_comercio: str
    rut_estado_tributario: str
    listas_restrictivas: str
    alertas_registradas: int


class ValidarEmpresaResponse(BaseModel):
    empresa: str
    nit: str
    estado_verificacion: str
    estructura_societaria: list[BeneficiarioFinal]
    estado_documental: EstadoDocumental
