from models.kyb import (
    BeneficiarioFinal,
    EstadoDocumental,
    ValidarEmpresaRequest,
    ValidarEmpresaResponse,
)


def validar_empresa(payload: ValidarEmpresaRequest) -> ValidarEmpresaResponse:
    """Simula la consulta a registros mercantiles y listas restrictivas internacionales."""
    estructura_societaria = [
        BeneficiarioFinal(
            rol="Accionista Mayoritario",
            nombre="Holding Internacional Corp",
            porcentaje_participacion=65.0,
            verificacion_ofac_pep="Listas Restrictivas: 0 Coincidencias",
        ),
        BeneficiarioFinal(
            rol="Beneficiario Final UBO 1",
            nombre="Juan Carlos Mendoza",
            porcentaje_participacion=25.0,
            verificacion_ofac_pep="Verificación OFAC/PEP: Limpio",
        ),
        BeneficiarioFinal(
            rol="Beneficiario Final UBO 2",
            nombre="Roberto Gómez T.",
            porcentaje_participacion=10.0,
            verificacion_ofac_pep="Verificación OFAC/PEP: Limpio",
        ),
    ]

    estado_documental = EstadoDocumental(
        certificado_camara_comercio="Válido (Expedición < 30 días)",
        rut_estado_tributario="Activo",
        listas_restrictivas="Lista Clinton / ONU / Interpol",
        alertas_registradas=0,
    )

    return ValidarEmpresaResponse(
        empresa=payload.razon_social,
        nit=payload.nit,
        estado_verificacion="Verificación KYB Completada",
        estructura_societaria=estructura_societaria,
        estado_documental=estado_documental,
    )
