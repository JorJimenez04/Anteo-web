from pydantic import BaseModel, Field


class CalcularRoiRequest(BaseModel):
    tx_mes: int = Field(..., ge=1000, le=1_000_000, description="Transacciones mensuales procesadas")
    porcentaje_revision: float = Field(
        ..., ge=1.0, le=20.0, description="% de transacciones revisadas manualmente hoy"
    )
    costo_analista: float = Field(..., ge=10, le=100, description="Costo promedio hora analista de riesgo (USD)")


class CalcularRoiResponse(BaseModel):
    tx_manuales_actuales: float
    horas_analisis_actuales_mes: float
    costo_actual_mes: float
    costo_anteo_mes: float
    ahorro_estimado_mes: float
    horas_ahorradas_mes: float
    reduccion_costo_porcentual: float
