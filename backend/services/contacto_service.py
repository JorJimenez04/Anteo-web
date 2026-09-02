from models.contacto import SolicitudContactoRequest, SolicitudContactoResponse


def procesar_solicitud_contacto(payload: SolicitudContactoRequest) -> SolicitudContactoResponse:
    mensaje = (
        f"¡Muchas gracias {payload.nombre}! Su solicitud ha sido registrada. "
        f"El equipo técnico de Anteo se pondrá en contacto al correo {payload.correo}."
    )
    return SolicitudContactoResponse(exito=True, mensaje=mensaje)
