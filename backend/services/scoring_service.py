import datetime
import random

from models.scoring import EvaluarTransaccionRequest, EvaluarTransaccionResponse, LogAuditoria

UMBRAL_ROS_UIAF_USD = 10_000
JURISDICCIONES_INTENSIFICADAS = {"Panamá", "Islas Caimán"}

SCORE_UMBRAL_MONTO = 30
SCORE_JURISDICCION = 35
SCORE_PEP = 25
SCORE_FRECUENCIA_ANORMAL = 20
SCORE_BASE = 5

UMBRAL_BLOQUEO = 65
UMBRAL_CONFIRMACION = 35


def evaluar_transaccion(payload: EvaluarTransaccionRequest) -> EvaluarTransaccionResponse:
    score = SCORE_BASE
    reglas_activadas: list[str] = []

    if payload.monto >= UMBRAL_ROS_UIAF_USD:
        score += SCORE_UMBRAL_MONTO
        reglas_activadas.append("Umbral ROS/UIAF superado ($10,000 USD)")

    if payload.pais.value in JURISDICCIONES_INTENSIFICADAS:
        score += SCORE_JURISDICCION
        reglas_activadas.append(
            f"Jurisdicción con monitoreo intensificado identificada ({payload.pais.value})"
        )

    if payload.es_pep:
        score += SCORE_PEP
        reglas_activadas.append(
            "Perfil catalogado como PEP requiere DDI (Debida Diligencia Intensificada)"
        )

    if payload.frecuencia_anormal:
        score += SCORE_FRECUENCIA_ANORMAL
        reglas_activadas.append("Desviación de patrón transaccional del cliente (> 300% habitual)")

    if score >= UMBRAL_BLOQUEO:
        dictamen = "BLOQUEADA"
        nivel_alerta = "ALERTA ROJA"
        accion_sugerida = (
            "Transacción retenida automáticamente. Enviada a la cola de revisión de Oficial de Cumplimiento."
        )
        verdict_log = "CONGELADA"
    elif score >= UMBRAL_CONFIRMACION:
        dictamen = "REQUIERE CONFIRMACIÓN"
        nivel_alerta = "ALERTA AMARILLA"
        accion_sugerida = "Solicitar soporte documental al cliente (Origen de fondos)."
        verdict_log = "APROBADA"
    else:
        dictamen = "APROBADA"
        nivel_alerta = "ALERTA VERDE"
        accion_sugerida = "Operación procesada sin fricción de usuario."
        verdict_log = "APROBADA"

    log_auditoria = LogAuditoria(
        timestamp=datetime.datetime.now().isoformat(),
        transaction_id=f"TX-{random.randint(100000, 999999)}",
        risk_score=score,
        verdict=verdict_log,
        applied_rules=reglas_activadas,
    )

    return EvaluarTransaccionResponse(
        score_riesgo=score,
        dictamen=dictamen,
        nivel_alerta=nivel_alerta,
        accion_sugerida=accion_sugerida,
        reglas_activadas=reglas_activadas,
        log_auditoria=log_auditoria,
    )
