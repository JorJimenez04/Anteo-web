import streamlit as st

# Configuración de la página
st.set_page_config(
    page_title="Anteo | Cumplimiento & Tecnología",
    page_icon="🛡️",
    layout="wide"
)

# Encabezado principal
st.title("🛡️ Anteo")
st.subheader("Blindaje Operativo, Compliance y Soluciones Tecnológicas")

st.markdown("---")

# Introducción
st.write("""
En **Anteo** protegemos y potenciamos la operación de entidades financieras, fintechs y empresas B2B. 
Transformamos requerimientos de regulación y cumplimiento en arquitectura tecnológica ágil, automatizada y escalable.
""")

# Propuesta de Valor y Servicios
st.header("Nuestros Servicios")

col1, col2 = st.columns(2)

with col1:
    st.subheader("🔍 Compliance & Gestión de Riesgo")
    st.write("""
    * **Estructuras SARLAFT / SAGRILAFT / PTEE:** Diseño y adecuación normativa.
    * **Automatización KYC / KYB / UBO:** Verificación de identidad y debida diligencia de contrapartes.
    * **Trazabilidad & Expedientes SAR/ROS:** Consolidación de información auditable ante entes reguladores.
    """)

with col2:
    st.subheader("⚙️ Soluciones Tecnológicas & Ingenieriles")
    st.write("""
    * **Monitoreo Transaccional:** Motor en tiempo real para detección de patrones anómalos.
    * **Integración de APIs:** Conexión con listas restrictivas y scoring de riesgo.
    * **Automatización a Medida:** Despliegue de scripts en Python para optimizar flujos operativos.
    """)

st.markdown("---")

# Sección de Contacto
st.header("📬 Contáctanos")
st.write("Agenda una sesión diagnóstica para evaluar la arquitectura de cumplimiento y tecnología de tu empresa.")

with st.form("contacto_anteo"):
    nombre = st.text_input("Nombre completo")
    empresa = st.text_input("Empresa")
    correo = st.text_input("Correo electrónico corporativo")
    mensaje = st.text_area("¿En qué podemos ayudarte?")
    
    enviado = st.form_submit_button("Enviar Mensaje")
    if enviado:
        if correo and nombre:
            st.success("¡Gracias por contactar a Anteo! Nos comunicaremos contigo en breve.")
        else:
            st.warning("Por favor completa los campos requeridos (Nombre y Correo).")