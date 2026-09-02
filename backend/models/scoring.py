from enum import Enum

from pydantic import BaseModel, Field


class TipoOperacion(str, Enum):
    GIRO_INTERNACIONAL = "Giro Internacional"
    ACH_NACIONAL = "Transferencia ACH Nacional"
    RECAUDO_MASIVO = "Recaudo Digital Masivo"
    OTC_CRIPTO = "Operación OTC / Cripto"


class PaisOperacion(str, Enum):
    COLOMBIA = "Colombia"
    PANAMA = "Panamá"
    ESTADOS_UNIDOS = "Estados Unidos"
    ISLAS_CAIMAN = "Islas Caimán"
    MEXICO = "México"
    SUIZA = "Suiza"


class EvaluarTransaccionRequest(BaseModel):
    monto: float = Field(..., ge=500, le=1_000_000, description="Monto de la operación en USD")
    tipo_operacion: TipoOperacion
    pais: PaisOperacion
    es_pep: bool = Field(False, description="¿Cliente es Persona Expuesta Políticamente?")
    frecuencia_anormal: bool = Field(False, description="¿Supera la frecuencia transaccional habitual?")

    model_config = {
        "json_schema_extra": {
            "example": {
                "monto": 25000,
                "tipo_operacion": "Giro Internacional",
                "pais": "Panamá",
                "es_pep": False,
                "frecuencia_anormal": False,
            }
        }
    }


class LogAuditoria(BaseModel):
    timestamp: str
    transaction_id: str
    risk_score: int
    verdict: str
    applied_rules: list[str]


class EvaluarTransaccionResponse(BaseModel):
    score_riesgo: int
    dictamen: str
    nivel_alerta: str
    accion_sugerida: str
    reglas_activadas: list[str]
    log_auditoria: LogAuditoria
