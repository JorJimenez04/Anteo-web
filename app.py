import streamlit as st
import pandas as pd
import random
import time

# Configuración de la aplicación Streamlit
st.set_page_config(
    page_title="Anteo | Compliance & Tech Solutions",
    page_icon="🛡️",
    layout="wide"
)

# Estilo visual personalizado
st.markdown("""
    <style>
    .main-title { font-size: 38px; font-weight: bold; color: #1E3A8A; }
    .sub-title { font-size: 20px; color: #4B5563; }
    .card { background-color: #F3F4F6; padding: 20px; border-radius: 10px; border-left: 5px solid #1E3A8A; }
    </style>
""", unsafe_allow_html=True)

# Header Principal
st.markdown('<div class="main-title">🛡️ Anteo | Soluciones Tecnológicas & Compliance</div>', unsafe_allow_html=True)
st.markdown('<div class="sub-title">Motor de automatización operativa, monitoreo transaccional y arquitectura de riesgo para entidades financieras y Fintechs.</div>', unsafe_allow_html=True)
st.write("")

# Menú por Pestañas Interactivas
tab1, tab2, tab3, tab4 = st.tabs([
    "🌐 Propuesta de Valor", 
    "⚡ Demo 1: Monitoreo Transaccional", 
    "👤 Demo 2: Validaciones KYC/KYB", 
    "📅 Agendar Diagnóstico Privado"
])

# ---------------------------------------------------------
# TAB 1: PROPUESTA DE VALOR
# ---------------------------------------------------------
with tab1:
    st.header("Transformamos la carga normativa en eficiencia operativa")
    st.write("En **Anteo** apoyamos a instituciones financieras, Fintechs y pasarelas de pago a blindar su infraestructura y automatizar procesos regulatorios.")
    
    col1, col2, col3 = st.columns(3)
    with col1:
        st.subheader("🔍 Compliance & Riesgo")
        st.markdown("- **SARLAFT / SAGRILAFT / PTEE**\n- Estructuración normativa\n- Generación de expedientes SAR/ROS\n- Matriz de riesgo automatizada")
    with col2:
        st.subheader("⚙️ Monitoreo & APIs")
        st.markdown("- Motor transaccional en tiempo real\n- Detección de patrones inusuales\n- Reducción de falsos positivos\n- Integración ágil vía APIs")
    with col3:
        st.subheader("🚀 Onboarding Digital")
        st.markdown("- Verificación KYC / KYB\n- Mapeo de Beneficiarios Finales (UBO)\n- Matching de identidades\n- Validación contra listas restrictivas")

# ---------------------------------------------------------
# TAB 2: DEMO INTERACTIVA DE MONITOREO TRANSACCIONAL
# ---------------------------------------------------------
with tab2:
    st.header("⚡ Demostración en Vivo: Motor de Monitoreo Transaccional")
    st.write("Prueba el simulador de análisis de patrones y scoring de riesgo SARLAFT/AML en tiempo real.")
    
    col_input, col_sim = st.columns([1, 2])
    
    with col_input:
        st.subheader("Simular Transacción")
        monto = st.number_input("Monto de la Operación (USD)", min_value=100, max_value=500000, value=15000, step=1000)
        tipo_tx = st.selectbox("Tipo de Operación", ["Transferencia Nacional", "Giro Internacional", "Retiro Masivo", "Recaudo Digital"])
        origen = st.selectbox("País Origen / Destino", ["Colombia", "Panamá", "EE. UU.", "Islas Caimán", "México"])
        es_pep = st.checkbox("¿Cliente es Persona Expuesta Políticamente (PEP)?")
        
        btn_analizar = st.button("🚀 Evaluar Transacción", type="primary")

    with col_sim:
        st.subheader("Resultado del Análisis en Tiempo Real")
        if btn_analizar:
            with st.spinner("Procesando regla de scoring transaccional..."):
                time.sleep(1)
            
            # Cálculo simulado de riesgo
            score = 10
            alerta = "VERDE"
            detalles = []

            if monto > 10000:
                score += 35
                detalles.append("Monto supera el umbral de reporte automático ($10,000 USD).")
            if origen in ["Panamá", "Islas Caimán"]:
                score += 35
                detalles.append(f"Jurisdicción de mayor monitoreo identificada ({origen}).")
            if es_pep:
                score += 25
                detalles.append("Perfil clasificado como PEP requiere Debida Diligencia Intensificada.")

            if score >= 70:
                st.error(f"🚨 ALERTA ROJA - Scoring de Riesgo: {score}/100")
                st.write("**Acción Automática:** Transacción congelada. Expediente enviado a cola de revisión SAR/ROS.")
            elif score >= 40:
                st.warning(f"⚠️ ALERTA AMARILLA - Scoring de Riesgo: {score}/100")
                st.write("**Acción Automática:** Requiere confirmación de soporte documental.")
            else:
                st.success(f"✅ TRANSACCIÓN APROBADA - Scoring de Riesgo: {score}/100")
                st.write("**Acción Automática:** Operación autorizada sin fricción.")
                
            with st.expander("Ver log de auditoría inmutable"):
                for d in detalles:
                    st.write(f"- {d}")
        else:
            st.info("Haz clic en 'Evaluar Transacción' para ver la demo en funcionamiento.")

# ---------------------------------------------------------
# TAB 3: DEMO INTERACTIVA KYC/KYB
# ---------------------------------------------------------
with tab3:
    st.header("👤 Demostración en Vivo: Onboarding & Verificación KYB/UBO")
    st.write("Simula la verificación automática de estructura societaria y beneficiarios finales.")
    
    razon_social = st.text_input("Ingrese Nombre de la Empresa / Nit", value="Fintech Ejemplo S.A.S.")
    if st.button("🔍 Validar Estructura Corporativa"):
        with st.spinner("Consultando registros societarios y listas restrictivas..."):
            time.sleep(1)
        
        st.success(f"Estructura validada exitosamente para: **{razon_social}**")
        
        col_a, col_b = st.columns(2)
        with col_a:
            st.markdown("""
            **Verificación documental (KYB):**
            - ✅ Certificado de Existencia y Representación Legal: Validado
            - ✅ Verificación contra Listas Restrictivas (OFAC, ONU): 0 Coincidencias
            - ✅ Estado Tributario: Activo
            """)
        with col_b:
            st.markdown("""
            **Beneficiarios Finales (UBO Identified):**
            - 🧑 Accionista A: 60% (Validado - 0 Alertas)
            - 🧑 Accionista B: 40% (Validado - 0 Alertas)
            """)

# ---------------------------------------------------------
# TAB 4: AGENDAR DIAGNÓSTICO PRIVADO
# ---------------------------------------------------------
with tab4:
    st.header("📅 Solicite una Demostración Personalizada")
    st.write("Agende una sesión técnica de 15 minutos para evaluar la arquitectura de cumplimiento de su empresa.")
    
    with st.form("form_contacto_principal"):
        c1, c2 = st.columns(2)
        with c1:
            nombre = st.text_input("Nombre Completo *")
            empresa = st.text_input("Empresa *")
        with c2:
            correo = st.text_input("Correo Corporativo *")
            cargo = st.text_input("Cargo (Ej. Compliance Officer / CTO)")
        
        interes = st.multiselect("Áreas de Interés", ["Monitoreo Transaccional", "Automatización KYC/KYB", "Estructuración SARLAFT/SAGRILAFT", "Desarrollo de Software a Medida"])
        mensaje = st.text_area("Comentarios o requerimientos específicos")
        
        submitted = st.form_submit_button("Enviar Solicitud", type="primary")
        if submitted:
            if nombre and correo and empresa:
                st.success(f"¡Gracias {nombre}! Hemos recibido tu mensaje. El equipo de Anteo se pondrá en contacto al correo {correo}.")
            else:
                st.error("Por favor completa los campos obligatorios (Nombre, Empresa y Correo).")