import streamlit as st
import pandas as pd
import time
import datetime
import random

# ---------------------------------------------------------
# 1. CONFIGURACIÓN DE PÁGINA
# ---------------------------------------------------------
st.set_page_config(
    page_title="Anteo | Enterprise Compliance & RegTech Solutions",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# ---------------------------------------------------------
# 2. ESTILOS CSS AVANZADOS
# ---------------------------------------------------------
st.markdown("""
    <style>
    .stApp {
        background-color: #FAFAFA;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    .hero-container {
        background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%);
        padding: 40px 30px;
        border-radius: 16px;
        color: white;
        margin-bottom: 25px;
        box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.25);
    }
    .hero-title {
        font-size: 38px;
        font-weight: 800;
        letter-spacing: -0.5px;
        margin-bottom: 8px;
        color: #FFFFFF;
    }
    .hero-subtitle {
        font-size: 18px;
        color: #94A3B8;
        max-width: 800px;
        line-height: 1.5;
    }

    .metric-card {
        background: white;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #E2E8F0;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        text-align: center;
    }
    .metric-value {
        font-size: 32px;
        font-weight: 800;
        color: #2563EB;
    }
    .metric-label {
        font-size: 13px;
        color: #64748B;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .service-card {
        background: white;
        padding: 24px;
        border-radius: 12px;
        border-left: 5px solid #2563EB;
        border-top: 1px solid #E2E8F0;
        border-right: 1px solid #E2E8F0;
        border-bottom: 1px solid #E2E8F0;
        margin-bottom: 15px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
    .service-card h3 {
        color: #0F172A;
        font-size: 20px;
        margin-bottom: 10px;
    }
    .service-card p {
        color: #475569;
        font-size: 14px;
        line-height: 1.6;
    }

    .stTabs [data-baseweb="tab-list"] {
        gap: 8px;
        background-color: #F1F5F9;
        padding: 6px;
        border-radius: 10px;
    }
    .stTabs [data-baseweb="tab"] {
        height: 45px;
        white-space: pre-wrap;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        color: #475569;
    }
    .stTabs [aria-selected="true"] {
        background-color: #FFFFFF !important;
        color: #1E3A8A !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    }
    </style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# 3. HEADER PRINCIPAL
# ---------------------------------------------------------
st.markdown("""
    <div class="hero-container">
        <div class="hero-title">🛡️ ANTEO</div>
        <div class="hero-subtitle">
            Arquitectura tecnológica de alto rendimiento para <b>Monitoreo Transaccional, Onboarding Digital (KYC/KYB)</b> y <b>Prevención de Riesgo Regulación (SARLAFT / SAGRILAFT)</b>.
        </div>
    </div>
""", unsafe_allow_html=True)

# Banner de Métricas
col_m1, col_m2, col_m3, col_m4 = st.columns(4)
with col_m1:
    st.markdown('<div class="metric-card"><div class="metric-value">&lt; 180ms</div><div class="metric-label">Latencia de Respuesta API</div></div>', unsafe_allow_html=True)
with col_m2:
    st.markdown('<div class="metric-card"><div class="metric-value">-75%</div><div class="metric-label">Reducción Falsos Positivos</div></div>', unsafe_allow_html=True)
with col_m3:
    st.markdown('<div class="metric-card"><div class="metric-value">100%</div><div class="metric-label">Trazabilidad Auditable</div></div>', unsafe_allow_html=True)
with col_m4:
    st.markdown('<div class="metric-card"><div class="metric-value">0%</div><div class="metric-label">Fricción en Onboarding</div></div>', unsafe_allow_html=True)

st.write("")
st.write("")

# ---------------------------------------------------------
# 4. PESTAÑAS PRINCIPALES
# ---------------------------------------------------------
tab_propuesta, tab_demo1, tab_demo2, tab_roi, tab_contacto = st.tabs([
    "🌐 Propuesta de Valor", 
    "⚡ Demo: Motor Transaccional", 
    "👤 Demo: Verificación KYB / UBO", 
    "📊 Calculadora de Eficiencia", 
    "📅 Agendar Diagnóstico"
])

# ---------------------------------------------------------
# TAB 1: PROPUESTA DE VALOR
# ---------------------------------------------------------
with tab_propuesta:
    st.markdown("### **Blindaje Operativo y Regtech para Entidades Financieras y Fintechs**")
    st.write("En **Anteo** ayudamos a instituciones financieras, pasarelas de pago y neobancos a escalar sus operaciones reduciendo el riesgo normativo y el fraude.")
    
    st.write("")
    col_s1, col_s2 = st.columns(2)
    
    with col_s1:
        st.markdown("""
        <div class="service-card">
            <h3>⚙️ Motor de Monitoreo Transaccional en Tiempo Real</h3>
            <p>Auditoría inteligente de operaciones masivas. Evaluación automática de scoring de riesgo basada en reglas dinámicas, comportamientos históricos y detección de patrones anómalos de lavado de activos (LA/FT).</p>
        </div>
        <div class="service-card">
            <h3>🔍 Debida Diligencia & Onboarding Corporativo (KYB/UBO)</h3>
            <p>Automatización en el levantamiento de estructuras societarias complejas, identificación de Beneficiarios Finales (UBO), y cruzamiento instantáneo con listas de sanciones globales (OFAC, ONU, PEPs).</p>
        </div>
        """, unsafe_allow_html=True)
        
    with col_s2:
        st.markdown("""
        <div class="service-card">
            <h3>📜 Automatización SARLAFT / SAGRILAFT / PTEE</h3>
            <p>Generación simplificada de expedientes auditables y estructuración inmutable para soporte ante entes supervisores (Superfinanciera, Supersociedades, UIAF).</p>
        </div>
        <div class="service-card">
            <h3>🔌 Microservicios e Integración por APIs</h3>
            <p>Despliegue modular e integración nativa con el core de su plataforma digital sin interrumpir la operación actual ni ralentizar las transferencias.</p>
        </div>
        """, unsafe_allow_html=True)

# ---------------------------------------------------------
# TAB 2: DEMO INTERACTIVA - MOTOR TRANSACCIONAL
# ---------------------------------------------------------
with tab_demo1:
    st.markdown("### ⚡ **Simulador del Motor Transaccional & Scoring SARLAFT**")
    st.write("Prueba cómo el algoritmo de Anteo evalúa operaciones financieras y genera el dictamen de riesgo en tiempo real.")
    st.write("")
    
    col_in, col_res = st.columns([1, 1.2])
    
    with col_in:
        st.subheader("1. Parámetros de la Transacción")
        monto_tx = st.number_input("Monto de la Operación ($ USD)", min_value=500, max_value=1000000, value=25000, step=2500)
        tipo_op = st.selectbox("Tipo de Operación", ["Giro Internacional", "Transferencia ACH Nacional", "Recaudo Digital Masivo", "Operación OTC / Cripto"])
        pais_destino = st.selectbox("País Origen / Destino", ["Colombia", "Panamá", "Estados Unidos", "Islas Caimán", "México", "Suiza"])
        es_pep = st.checkbox("¿Cliente es Persona Expuesta Políticamente (PEP)?")
        frecuencia_anormal = st.checkbox("¿Supera la frecuencia transaccional habitual?")
        
        btn_evaluar = st.button("🚀 Ejecutar Scoring Transaccional", type="primary", use_container_width=True)

    with col_res:
        st.subheader("2. Resultado de la Evaluación en Tiempo Real")
        if btn_evaluar:
            with st.spinner("Procesando matriz de reglas transaccionales..."):
                time.sleep(0.8)
            
            score = 5
            reglas_activadas = []
            
            if monto_tx >= 10000:
                score += 30
                reglas_activadas.append("Umbral ROS/UIAF superado ($10,000 USD)")
            if pais_destino in ["Panamá", "Islas Caimán"]:
                score += 35
                reglas_activadas.append(f"Jurisdicción con monitoreo intensificado identificada ({pais_destino})")
            if es_pep:
                score += 25
                reglas_activadas.append("Perfil catalogado como PEP requiere DDI (Debida Diligencia Intensificada)")
            if frecuencia_anormal:
                score += 20
                reglas_activadas.append("Desviación de patrón transaccional del cliente (> 300% habitual)")

            st.metric("Scoring Global de Riesgo", f"{score} / 100")
            
            if score >= 65:
                st.error("🚨 **ESTADO: BLOQUEADA / ALERTA ROJA**")
                st.write("**Acción Sugerida:** Transacción retenida automáticamente. Enviada a la cola de revisión de Oficial de Cumplimiento.")
            elif score >= 35:
                st.warning("⚠️ **ESTADO: REQUIERE CONFIRMACIÓN / ALERTA AMARILLA**")
                st.write("**Acción Sugerida:** Solicitar soporte documental al cliente (Origen de fondos).")
            else:
                st.success("✅ **ESTADO: APROBADA / ALERTA VERDE**")
                st.write("**Acción Sugerida:** Operación procesada sin fricción de usuario.")
                
            st.markdown("#### **Reglas Auditables Activadas:**")
            for r in reglas_activadas:
                st.markdown(f"- 🔸 {r}")
                
            with st.expander("📄 Ver Log Inmutable de Auditoría (JSON)"):
                st.code(f"""
{{
    "timestamp": "{datetime.datetime.now().isoformat()}",
    "transaction_id": "TX-{random.randint(100000, 999999)}",
    "risk_score": {score},
    "verdict": "{"CONGELADA" if score >= 65 else "APROBADA"}",
    "applied_rules": {reglas_activadas}
}}
                """, language="json")
        else:
            st.info("Ajuste los parámetros en el panel izquierdo y presione 'Ejecutar Scoring' para ver el motor en acción.")

# ---------------------------------------------------------
# TAB 3: DEMO INTERACTIVA - VERIFICACIÓN KYB / UBO
# ---------------------------------------------------------
with tab_demo2:
    st.markdown("### 👤 **Simulador de Verificación KYB & Beneficiarios Finales (UBO)**")
    st.write("Prueba la validación automática de empresas contra listas restrictivas y estructura societaria.")
    st.write("")
    
    col_k1, col_k2 = st.columns(2)
    with col_k1:
        nit_empresa = st.text_input("Ingresar NIT / Tax ID Corporativo", value="901.345.892-1")
        razon_corp = st.text_input("Nombre de la Empresa", value="Inversiones Financieras del Caribe S.A.S.")
        btn_kyb = st.button("🔍 Auditar Estructura Societaria", type="primary")

    with col_k2:
        if btn_kyb:
            with st.spinner("Consultando registros mercantiles y listas restrictivas internacionales..."):
                time.sleep(1)
            
            st.success(f"Verificación KYB Completada para **{razon_corp}**")
            st.markdown("""
            **Mapeo de Estructura Societaria & UBO (Beneficiarios Finales):**
            * 🏢 **Accionista Mayoritario (65%):** Holding Internacional Corp ➔ *Listas Restrictivas: 0 Coincidencias*
            * 🧑 **Beneficiario Final UBO 1 (25%):** Juan Carlos Mendoza ➔ *Verificación OFAC/PEP: Limpio*
            * 🧑 **Beneficiario Final UBO 2 (10%):** Roberto Gómez T. ➔ *Verificación OFAC/PEP: Limpio*
            
            **Estado Documental:**
            - ✅ Certificado Cámara de Comercio: Válido (Expedición < 30 días)
            - ✅ RUT / Estado Tributario: Activo
            - ✅ Lista Clinton / ONU / Interpol: 0 Alertas Registradas
            """)

# ---------------------------------------------------------
# TAB 4: CALCULADORA DE EFICIENCIA Y ROI
# ---------------------------------------------------------
with tab_roi:
    st.markdown("### 📊 **Calculadora de Impacto Operativo y Reducción de Costos**")
    st.write("Estime el impacto directo de implementar Anteo en su equipo de cumplimiento y riesgo.")
    st.write("")
    
    col_r1, col_r2 = st.columns(2)
    with col_r1:
        tx_mes = st.number_input("Transacciones Mensuales Procesadas", min_value=1000, max_value=1000000, value=50000, step=5000)
        porcentaje_revision = st.slider("% Transacciones Revisadas Manualmente Hoy", min_value=1.0, max_value=20.0, value=5.0, step=0.5)
        costo_analista = st.number_input("Costo Promedio Hora Analista Riesgo ($ USD)", min_value=10, max_value=100, value=25)
        
    with col_r2:
        tx_manuales_actuales = tx_mes * (porcentaje_revision / 100)
        horas_mes_actuales = (tx_manuales_actuales * 10) / 60
        costo_mes_actual = horas_mes_actuales * costo_analista
        
        costo_mes_anteo = costo_mes_actual * 0.25
        ahorro_mes = costo_mes_actual - costo_mes_anteo
        
        st.subheader("Resultado Estimado de Ahorro:")
        st.metric("Ahorro Estimado Mensual", f"${ahorro_mes:,.0f} USD", delta="-75% Costo Operativo")
        st.metric("Horas de Análisis Manual Ahorradas", f"{horas_mes_actuales * 0.75:,.0f} Horas / mes")
        
        st.write("")
        st.caption("*Estimación basada en una reducción del 75% en falsos positivos mediante el motor de reglas en tiempo real de Anteo.")

# ---------------------------------------------------------
# TAB 5: AGENDAR DIAGNÓSTICO COMERCIAL
# ---------------------------------------------------------
with tab_contacto:
    st.markdown("### 📅 **Solicite una Sesión Técnica de Diagnóstico**")
    st.write("Agende una demostración privada de 15 minutos con nuestros especialistas en ingeniería de compliance.")
    st.write("")
    
    with st.form("form_contacto_pro"):
        c_a, c_b = st.columns(2)
        with c_a:
            nom = st.text_input("Nombre Completo *")
            emp = st.text_input("Empresa *")
        with c_b:
            mail = st.text_input("Correo Corporativo *")
            cargo = st.text_input("Cargo (Ej. Compliance Officer / CTO)")
        
        intereses = st.multiselect("Módulos de Interés", ["Monitoreo Transaccional en Tiempo Real", "Automatización KYC / KYB", "Generación de Expedientes SAR/ROS", "Integración de APIs a Medida"])
        obs = st.text_area("Comentarios sobre su infraestructura actual")
        
        env = st.form_submit_button("📩 Enviar Solicitud de Diagnóstico", type="primary", use_container_width=True)
        if env:
            if nom and mail and emp:
                st.success(f"¡Muchas gracias {nom}! Su solicitud ha sido registrada. El equipo técnico de Anteo se pondrá en contacto al correo {mail}.")
            else:
                st.error("Por favor complete los campos requeridos (Nombre, Empresa y Correo).")