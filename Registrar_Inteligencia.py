import pandas as pd
import os

# ---------------------------------------------------------
# CONFIGURACIÓN DE RUTAS
# ---------------------------------------------------------
DIRECTORIO_ACTUAL = os.path.dirname(os.path.abspath(__file__))
archivo_excel = os.path.join(DIRECTORIO_ACTUAL, 'Directorio_Contactos_Enriquecido.xlsx')

# ---------------------------------------------------------
# DATOS DE INTEL & PITCH (CREDICORP CAPITAL)
# ---------------------------------------------------------
datos_fichas = [
    {
        'Empresa': 'Credicorp Capital',
        'Dominio': 'credicorpcapital.com',
        'Naturaleza': 'Banca de Inversión / Asset Management',
        'Ente_Regulador': 'SFC (Superfinanciera) / AMV',
        'Normativa_Clave': 'SARLAFT, SAGRILAFT, PTEE, KYC/KYB/UBO',
        'Dolores_Principales': 'Fricción en Onboarding KYB/UBO, Falsos positivos en monitoreo, Trazabilidad',
        'Solucion_Anteo': 'Automatización KYB/UBO, Monitoreo Transaccional Inteligente, Expedientes SAR/ROS',
        'Cargos_Objetivo': 'Oficial de Cumplimiento, Gerente Riesgo Operativo / SARLAFT, CTO',
        'Estado_Abordaje': 'Listo para Contactar'
    }
]

pitch_credicorp = """
Asunto: Eficiencia en el monitoreo transaccional y KYC institucional en Credicorp Capital

Hola [Nombre del Contacto],

Te escribo porque en Anteo conocemos los retos operativos que implica balancear un estricto cumplimiento SARLAFT / KYC con la agilidad en la gestión de activos y banca de inversión.

Apoyamos a entidades financieras y mesas de inversión a optimizar sus capas de cumplimiento mediante:
* Automatización del flujo KYB / UBO: Verificación y validación de estructuras corporativas reduciendo tiempos de onboarding.
* Monitoreo transaccional eficiente: Reglas en tiempo real calibradas para minimizar falsos positivos.
* Auditoría e inmutabilidad: Consolidación de expedientes digitales listos para requerimientos regulatorios.

Me gustaría agendar una breve llamada de 15 minutos esta semana para compartirte cómo estructuramos estos motores de automatización y evaluar sinergias con Credicorp Capital.

¿Tendrías espacio en tu agenda este [Jueves/Viernes]?

Saludos cordiales,
[Tu Nombre] - Equipo Anteo
"""

datos_pitchs = [
    {
        'Empresa': 'Credicorp Capital',
        'Canal': 'Cold Email / LinkedIn',
        'Asunto': 'Eficiencia en el monitoreo transaccional y KYC institucional en Credicorp Capital',
        'Plantilla_Mensaje': pitch_credicorp.strip()
    }
]

# ---------------------------------------------------------
# ACTUALIZACIÓN DEL EXCEL CON NUEVAS PESTAÑAS
# ---------------------------------------------------------
print("Actualizando archivo Excel con Fichas de Inteligencia...")

try:
    # Cargar pestañas existentes para no sobrescribir tus datos de contactos
    excel_reader = pd.ExcelFile(archivo_excel)
    pestañas_existentes = {sheet: pd.read_excel(archivo_excel, sheet_name=sheet) for sheet in excel_reader.sheet_names}
    
    # Crear nuevos DataFrames
    df_fichas_nuevas = pd.DataFrame(datos_fichas)
    df_pitchs_nuevos = pd.DataFrame(datos_pitchs)
    
    # Actualizar o agregar pestañas
    pestañas_existentes['Fichas_Inteligencia'] = df_fichas_nuevas
    pestañas_existentes['Plantillas_Pitch'] = df_pitchs_nuevos

    # Escribir todas las pestañas de vuelta al archivo
    with pd.ExcelWriter(archivo_excel, engine='openpyxl') as writer:
        for nombre_hoja, df_hoja in pestañas_existentes.items():
            df_hoja.to_excel(writer, sheet_name=nombre_hoja, index=False)
            
    print("¡Información registrada exitosamente!")
    print(f"Pestañas creadas/actualizadas en '{archivo_excel}':")
    print("  1. Fichas_Inteligencia")
    print("  2. Plantillas_Pitch")

except Exception as e:
    print(f"Error al actualizar el Excel: {e}")

# ---------------------------------------------------------
# GUARDAR/ACTUALIZAR EXCEL CON MANEJO DE PERMISOS
# ---------------------------------------------------------
try:
    with pd.ExcelWriter(archivo_excel, engine='openpyxl') as writer:
        for nombre_hoja, df_hoja in pestañas_existentes.items():
            df_hoja.to_excel(writer, sheet_name=nombre_hoja, index=False)
            
    print("¡Información registrada exitosamente!")
    print(f"Pestañas creadas/actualizadas en '{archivo_excel}':")
    print("  1. Fichas_Inteligencia")
    print("  2. Plantillas_Pitch")

except PermissionError:
    print("\n[ERROR DE PERMISO]: El archivo Excel está abierto.")
    print("-> Por favor cierra 'Directorio_Contactos_Enriquecido.xlsx' en Excel y vuelve a correr el script.")
except Exception as e:
    print(f"\nError inesperado al actualizar el Excel: {e}")