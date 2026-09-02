import pandas as pd
import os

# ---------------------------------------------------------
# CONFIGURACIÓN DE RUTAS AUTOMÁTICAS
# ---------------------------------------------------------
DIRECTORIO_ACTUAL = os.path.dirname(os.path.abspath(__file__))

archivo_entrada = os.path.join(DIRECTORIO_ACTUAL, 'Base de datos clientes.xlsx')
hoja_contactos = 'Directorio_Contactos_Ordenado'
archivo_salida = os.path.join(DIRECTORIO_ACTUAL, 'Directorio_Contactos_Enriquecido.xlsx')

# Dominio de proveedores de correo personal/gratuitos a filtrar
DOMINIOS_PERSONALES = [
    'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 
    'live.com', 'icloud.com', 'yahoo.es', 'hotmail.es'
]

# ---------------------------------------------------------
# REGLAS DE PALABRAS CLAVE PARA ANTEO (SCORING)
# ---------------------------------------------------------
# Alta: Empresas Financieras, Pasarelas, OTC, Activos Digitales, Pagos, Riesgo
KEYWORDS_ALTA = [
    'pay', 'pagos', 'bank', 'banco', 'capital', 'crypto', 'otc', 'fin', 
    'exchange', 'card', 'coin', 'credit', 'credito', 'wallet', 'fx', 
    'remesa', 'bolsa', 'trust', 'lending', 'cash', 'money'
]

# Media: Empresas de Software, SaaS, Tecnología, Logística, Consultoría B2B
KEYWORDS_MEDIA = [
    'tech', 'soft', 'saas', 'log', 'dev', 'corp', 'group', 'solution', 
    'global', 'trade', 'cloud', 'system', 'data', 'digital', 'consulting',
    'express', 'cargo', 'service', 'app'
]

# ---------------------------------------------------------
# FUNCIONES AUXILIARES
# ---------------------------------------------------------
def extraer_dominio(email):
    """Extrae el dominio del correo y detecta si es personal."""
    if pd.isna(email) or '@' not in str(email):
        return 'SIN_CORREO'
    
    dominio = str(email).split('@')[-1].lower().strip()
    if dominio in DOMINIOS_PERSONALES:
        return 'CORREO_PERSONAL'
    return dominio

def estimar_nombre_empresa(dominio):
    """Genera un nombre preliminar de empresa basado en el dominio."""
    if dominio in ['CORREO_PERSONAL', 'SIN_CORREO']:
        return 'N/A (Persona Natural)'
    
    nombre = dominio.split('.')[0]
    return nombre.replace('-', ' ').replace('_', ' ').title()

def clasificar_probabilidad(dominio):
    """Clasifica la probabilidad del cliente según palabras clave del dominio."""
    if dominio in ['CORREO_PERSONAL', 'SIN_CORREO']:
        return 'Baja'
    
    dominio_clean = dominio.lower()
    
    # 1. Evaluar Alta Probabilidad
    if any(kw in dominio_clean for kw in KEYWORDS_ALTA):
        return 'Alta'
        
    # 2. Evaluar Media Probabilidad
    if any(kw in dominio_clean for kw in KEYWORDS_MEDIA):
        return 'Media'
        
    return 'Por Evaluar / Media'

# ---------------------------------------------------------
# PROCESAMIENTO PRINCIPAL
# ---------------------------------------------------------
print("Cargando base de datos...")
try:
    df_contactos = pd.read_excel(archivo_entrada, sheet_name=hoja_contactos)
    print(f"-> {len(df_contactos)} registros cargados correctamente.")
except Exception as e:
    print(f"Error al leer el archivo Excel: {e}")
    exit()

# 1. Normalizar nombres de columnas
df_contactos.columns = [str(col).strip().title() for col in df_contactos.columns]

# Identificar la columna de correo
col_correo = next((col for col in df_contactos.columns if 'Correo' in col or 'Email' in col), None)

if not col_correo:
    print("Error: No se encontró una columna de correo o email en la hoja.")
    exit()

# 2. Extracción de Dominios y Clasificación Automática
df_contactos['Dominio'] = df_contactos[col_correo].apply(extraer_dominio)
df_contactos['Empresa_Estimada'] = df_contactos['Dominio'].apply(estimar_nombre_empresa)
df_contactos['Probabilidad'] = df_contactos['Dominio'].apply(clasificar_probabilidad)
df_contactos['Estado_Lead'] = df_contactos['Dominio'].apply(
    lambda d: 'Descartado / Personal' if d in ['CORREO_PERSONAL', 'SIN_CORREO'] else 'Clasificado Automático'
)

# ---------------------------------------------------------
# GENERACIÓN DE HOJA RESUMEN (EMPRESAS ÚNICAS)
# ---------------------------------------------------------
dominios_corp = df_contactos[~df_contactos['Dominio'].isin(['CORREO_PERSONAL', 'SIN_CORREO'])]['Dominio'].unique()

df_resumen_empresas = pd.DataFrame({
    'Dominio': dominios_corp,
    'Nombre_Empresa': [estimar_nombre_empresa(d) for d in dominios_corp],
    'Sitio_Web': [f"https://www.{d}" for d in dominios_corp],
    'Probabilidad_Sugerida': [clasificar_probabilidad(d) for d in dominios_corp],
    'Sector_Industria': '',      # Campo para ajustar manualmente si aplica
    'Notas_Investigacion': ''
})

# ---------------------------------------------------------
# GUARDAR ARCHIVO RESULTANTE CON PESTAÑAS
# ---------------------------------------------------------
print("Exportando datos a Excel...")
with pd.ExcelWriter(archivo_salida, engine='openpyxl') as writer:
    # Pestaña 1: Resumen de empresas clasificadas
    df_resumen_empresas.to_excel(writer, sheet_name='Empresas_Unicas_Clasificadas', index=False)
    
    # Pestaña 2: Todos los contactos detallados con su probabilidad
    df_contactos.to_excel(writer, sheet_name='Todos_Los_Contactos', index=False)

# Métricas rápidas
conteo_probabilidad = df_resumen_empresas['Probabilidad_Sugerida'].value_counts().to_dict()

print(f"\n¡Proceso de Clasificación Automática Completado!")
print(f"1. Total de contactos procesados: {len(df_contactos)}")
print(f"2. Total de empresas únicas clasificadas: {len(dominios_corp)}")
print(f"   -> Alta Probabilidad: {conteo_probabilidad.get('Alta', 0)}")
print(f"   -> Media Probabilidad: {conteo_probabilidad.get('Media', 0)}")
print(f"   -> Por Evaluar / General: {conteo_probabilidad.get('Por Evaluar / Media', 0)}")
print(f"3. Archivo guardado como: '{archivo_salida}'")