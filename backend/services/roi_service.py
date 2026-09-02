from models.roi import CalcularRoiRequest, CalcularRoiResponse

REDUCCION_COSTO_ANTEO = 0.25
MINUTOS_POR_REVISION_MANUAL = 10


def calcular_roi(payload: CalcularRoiRequest) -> CalcularRoiResponse:
    tx_manuales_actuales = payload.tx_mes * (payload.porcentaje_revision / 100)
    horas_mes_actuales = (tx_manuales_actuales * MINUTOS_POR_REVISION_MANUAL) / 60
    costo_mes_actual = horas_mes_actuales * payload.costo_analista

    costo_mes_anteo = costo_mes_actual * REDUCCION_COSTO_ANTEO
    ahorro_mes = costo_mes_actual - costo_mes_anteo
    horas_ahorradas = horas_mes_actuales * (1 - REDUCCION_COSTO_ANTEO)

    return CalcularRoiResponse(
        tx_manuales_actuales=round(tx_manuales_actuales, 2),
        horas_analisis_actuales_mes=round(horas_mes_actuales, 2),
        costo_actual_mes=round(costo_mes_actual, 2),
        costo_anteo_mes=round(costo_mes_anteo, 2),
        ahorro_estimado_mes=round(ahorro_mes, 2),
        horas_ahorradas_mes=round(horas_ahorradas, 2),
        reduccion_costo_porcentual=(1 - REDUCCION_COSTO_ANTEO) * 100,
    )
