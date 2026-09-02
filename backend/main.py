import os
import datetime
import random
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ---------------------------------------------------------
# 1. CONFIGURACIÓN DE LA APLICACIÓN
# ---------------------------------------------------------
app = FastAPI(
    title="Anteo RegTech API",
    description="API de scoring de riesgo SARLAFT/AML, validación KYB/UBO y calculadora de eficiencia operativa para la plataforma Anteo.",
    version="1.0.0"
)

# Configuración dinámica de CORS (desarrollo local + producción)
env_origins = os.getenv("CORS_ORIGINS", "").split(",")
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
] + [origin.strip() for origin in env_origins if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# 2. MODELOS DE DATOS (PYDANTIC)
# ---------------------------------------------------------

# --- Modelos Scoring Transaccional ---
class EvaluacionTxRequest(BaseModel):
    monto: float = Field(..., gt=0, description="Monto de la operación en USD")
    tipo_operacion: Optional[str] = "Giro Internacional"
    pais_destino: str = Field(..., description="País de origen o destino")
    es_pep: bool = Field(False, description="¿Cliente es Persona Expuesta Políticamente?")
    frecuencia_anormal: Optional[bool] = False

class EvaluacionTxResponse(BaseModel):
    score: int
    dictamen: str
    nivel_alerta: str
    reglas_activadas: List[str]
    log_auditoria: dict

# --- Modelos KYB / UBO ---
class ValidarEmpresaRequest(BaseModel):
    nit: str = Field(..., description="NIT o Tax ID Corporativo")
    razon_social: str = Field(..., description="Razón Social de la Empresa")

class UBOItem(BaseModel):
    nombre: str
    porcentaje: float
    estatus: str

class ValidarEmpresaResponse(BaseModel):
    nit: str
    razon_social: str
    estado_documental: dict
    beneficiarios_finales: List[UBOItem]

# --- Modelos Calculadora ROI ---
class CalcularRoiRequest(BaseModel):
    transacciones_mes: int = Field(..., gt=0)
    porcentaje_revision_manual: float = Field(..., ge=0, le=100)
    costo_hora_analista: float = Field(..., gt=0)

class CalcularRoiResponse(BaseModel):
    ahorro_estimado_mensual: float
    horas_ahorradas_mes: float
    costo_actual_mes: float
    costo_anteo_mes: float

# --- Modelos Contacto ---
class ContactoRequest(BaseModel):
    nombre: str
    empresa: str
    correo: str
    cargo: Optional[str] = ""
    modulos_interes: Optional[List[str]] = []
    comentarios: Optional[str] = ""

class ContactoResponse(BaseModel):
    status: str
    message: str

# ---------------------------------------------------------
# 3. ENDPOINTS DE SALUD Y VERIFICACIÓN
# ---------------------------------------------------------

@app.get("/", tags=["Health"])
def root():
    return {"message": "Anteo RegTech API v1.0 running successfully"}

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok", "timestamp": datetime.datetime.now().isoformat()}

# ---------------------------------------------------------
# 4. ENDPOINTS DE LÓGICA DE NEGOCIO (REGTECH)
# ---------------------------------------------------------

# --- 1. Motor de Scoring Transaccional ---
@app.post("/api/v1/scoring/evaluar-transaccion", response_model=EvaluacionTxResponse, tags=["Scoring Transaccional"])
def evaluar_transaccion(data: EvaluacionTxRequest):
    score = 5
    reglas_activadas = []

    if data.monto >= 10000:
        score += 30
        reglas_activadas.append("Umbral ROS/UIAF superado ($10,000 USD)")
    if data.pais_destino in ["Panamá", "Islas Caimán"]:
        score += 35
        reglas_activadas.append(f"Jurisdicción con monitoreo intensificado identificada ({data.pais_destino})")
    if data.es_pep:
        score += 25
        reglas_activadas.append("Perfil catalogado como PEP requiere DDI (Debida Diligencia Intensificada)")
    if data.frecuencia_anormal:
        score += 20
        reglas_activadas.append("Desviación de patrón transaccional del cliente (> 300% habitual)")

    if score >= 65:
        dictamen = "BLOQUEADA"
        nivel_alerta = "ROJA"
    elif score >= 35:
        dictamen = "REQUIERE_CONFIRMACION"
        nivel_alerta = "AMARILLA"
    else:
        dictamen = "APROBADA"
        nivel_alerta = "VERDE"

    log_auditoria = {
        "timestamp": datetime.datetime.now().isoformat(),
        "transaction_id": f"TX-{random.randint(100000, 999999)}",
        "risk_score": score,
        "verdict": dictamen,
        "applied_rules": reglas_activadas
    }

    return EvaluacionTxResponse(
        score=score,
        dictamen=dictamen,
        nivel_alerta=nivel_alerta,
        reglas_activadas=reglas_activadas,
        log_auditoria=log_auditoria
    )

# --- 2. Verificación KYB / UBO ---
@app.post("/api/v1/kyb/validar-empresa", response_model=ValidarEmpresaResponse, tags=["KYB / UBO"])
def validar_empresa(data: ValidarEmpresaRequest):
    return ValidarEmpresaResponse(
        nit=data.nit,
        razon_social=data.razon_social,
        estado_documental={
            "camara_comercio": "Válido (Expedición < 30 días)",
            "rut_estado": "Activo",
            "listas_restrictivas": "0 Coincidencias (OFAC, ONU, Interpol)"
        },
        beneficiarios_finales=[
            UBOItem(nombre="Holding Internacional Corp (Accionista 65%)", porcentaje=65.0, estatus="Limpio"),
            UBOItem(nombre="Juan Carlos Mendoza (UBO 25%)", porcentaje=25.0, estatus="OFAC/PEP Limpio"),
            UBOItem(nombre="Roberto Gómez T. (UBO 10%)", porcentaje=10.0, estatus="OFAC/PEP Limpio")
        ]
    )

# --- 3. Calculadora de Eficiencia u ROI ---
@app.post("/api/v1/roi/calcular", response_model=CalcularRoiResponse, tags=["Calculadora ROI"])
def calcular_roi(data: CalcularRoiRequest):
    tx_manuales_actuales = data.transacciones_mes * (data.porcentaje_revision_manual / 100.0)
    horas_mes_actuales = (tx_manuales_actuales * 10.0) / 60.0  # 10 min por revisión manual
    costo_mes_actual = horas_mes_actuales * data.costo_hora_analista

    # Con Anteo se automatiza el 75%
    costo_mes_anteo = costo_mes_actual * 0.25
    ahorro_mes = costo_mes_actual - costo_mes_anteo
    horas_ahorradas = horas_mes_actuales * 0.75

    return CalcularRoiResponse(
        ahorro_estimado_mensual=round(ahorro_mes, 2),
        horas_ahorradas_mes=round(horas_ahorradas, 1),
        costo_actual_mes=round(costo_mes_actual, 2),
        costo_anteo_mes=round(costo_mes_anteo, 2)
    )

# --- 4. Registro de Contacto y Diagnóstico ---
@app.post("/api/v1/contacto", response_model=ContactoResponse, tags=["Contacto"])
def recibir_contacto(data: ContactoRequest):
    if not data.nombre or not data.correo or not data.empresa:
        raise HTTPException(status_code=400, detail="Nombre, empresa y correo son obligatorios.")

    return ContactoResponse(
        status="success",
        message=f"Solicitud registrada exitosamente para {data.nombre} ({data.empresa})."
    )