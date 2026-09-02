"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://anteo-web-production.up.railway.app";

export default function Home() {
  const [activeTab, setActiveTab] = useState("propuesta");

  // Scoring State
  const [monto, setMonto] = useState(25000);
  const [pais, setPais] = useState("Panamá");
  const [esPep, setEsPep] = useState(true);
  const [scoringResult, setScoringResult] = useState(null);
  const [loadingScoring, setLoadingScoring] = useState(false);

  // KYB State
  const [nit, setNit] = useState("901.345.892-1");
  const [razonSocial, setRazonSocial] = useState("Inversiones Financieras S.A.S.");
  const [kybResult, setKybResult] = useState(null);
  const [loadingKyb, setLoadingKyb] = useState(false);

  // ROI State
  const [txMes, setTxMes] = useState(50000);
  const [pctManual, setPctManual] = useState(5);
  const [costoHora, setCostoHora] = useState(25);
  const [roiResult, setRoiResult] = useState(null);

  // Contact State
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [correo, setCorreo] = useState("");
  const [contactoResult, setContactoResult] = useState("");

  const handleScoring = async (e) => {
    e.preventDefault();
    setLoadingScoring(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/scoring/evaluar-transaccion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ monto: parseFloat(monto), pais_destino: pais, es_pep: esPep }),
      });
      const data = await res.json();
      setScoringResult(data);
    } catch (err) {
      alert("Error conectando con la API de scoring");
    } finally {
      setLoadingScoring(false);
    }
  };

  const handleKyb = async (e) => {
    e.preventDefault();
    setLoadingKyb(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/kyb/validar-empresa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nit, razon_social: razonSocial }),
      });
      const data = await res.json();
      setKybResult(data);
    } catch (err) {
      alert("Error conectando con la API KYB");
    } finally {
      setLoadingKyb(false);
    }
  };

  const handleRoi = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/v1/roi/calcular`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transacciones_mes: parseInt(txMes),
          porcentaje_revision_manual: parseFloat(pctManual),
          costo_hora_analista: parseFloat(costoHora),
        }),
      });
      const data = await res.json();
      setRoiResult(data);
    } catch (err) {
      alert("Error al calcular el ROI");
    }
  };

  const handleContacto = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/v1/contacto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, empresa, correo }),
      });
      const data = await res.json();
      setContactoResult(data.message);
    } catch (err) {
      alert("Error enviando solicitud");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col justify-between">
      <main className="p-6 md:p-12 max-w-6xl mx-auto w-full">
        {/* Header Corporativo */}
        <header className="bg-slate-900 text-white p-8 rounded-2xl mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                Corporate Governance & Compliance Solutions
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight mt-1">ANTEO S.A.S.</h1>
              <p className="text-slate-300 text-sm mt-1 max-w-xl">
                De la exigencia regulatoria a la ventaja estratégica. Consultoría de alto impacto y tecnología para SARLAFT, SAGRILAFT, PTEE y KYx.
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl text-xs border border-slate-700 text-slate-300 space-y-1">
              <p><strong className="text-white">NIT:</strong> 902.098.344-1</p>
              <p><strong className="text-white">Ubicación:</strong> Pereira, Risaralda - Colombia</p>
              <p><strong className="text-white">CIIU:</strong> M7020 / J6201</p>
            </div>
          </div>
        </header>

        {/* Banner de Métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
            <p className="text-2xl font-black text-blue-600">&lt; 180ms</p>
            <p className="text-xs font-bold text-slate-500 uppercase mt-1">Latencia Respuesta API</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
            <p className="text-2xl font-black text-blue-600">-75%</p>
            <p className="text-xs font-bold text-slate-500 uppercase mt-1">Falsos Positivos</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
            <p className="text-2xl font-black text-blue-600">100%</p>
            <p className="text-xs font-bold text-slate-500 uppercase mt-1">Trazabilidad Auditable</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
            <p className="text-2xl font-black text-blue-600">0%</p>
            <p className="text-xs font-bold text-slate-500 uppercase mt-1">Fricción Onboarding</p>
          </div>
        </div>

        {/* Navegación por pestañas */}
        <nav className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-8">
          {[
            { id: "propuesta", label: "🌐 Portafolio de Soluciones" },
            { id: "metodologia", label: "⚙️ Ruta Estratégica" },
            { id: "scoring", label: "⚡ Demo: Scoring" },
            { id: "kyb", label: "🔍 Demo: KYB / UBO" },
            { id: "roi", label: "📊 Calculadora ROI" },
            { id: "contacto", label: "📅 Contacto Directo" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Sección Contenido Dinámico */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-12">
          {/* TAB 1: PORTAFOLIO */}
          {activeTab === "propuesta" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Portafolio Integral de Soluciones</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Estructuración técnica y legal alineada a estándares locales (SuperSociedades, SuperFinanciera, DIAN) e internacionales (GAFI, ISO 31000, ISO 37001).
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 border rounded-xl bg-slate-50 border-slate-200">
                  <h3 className="font-bold text-blue-900 text-lg mb-2">🛡️ SARLAFT & SAGRILAFT</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Diseño, parametrización y segmentación de matrices de riesgo LA/FT/FPADM. Calibración periódica frente a directrices de entes de control.
                  </p>
                </div>
                <div className="p-5 border rounded-xl bg-slate-50 border-slate-200">
                  <h3 className="font-bold text-blue-900 text-lg mb-2">🔍 Debida Diligencia (KYx)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Validación de Clientes, Proveedores y Empleados. Identificación de Beneficiarios Finales (RUB) y screening en listas restrictivas (OFAC, ONU, PEPs).
                  </p>
                </div>
                <div className="p-5 border rounded-xl bg-slate-50 border-slate-200">
                  <h3 className="font-bold text-blue-900 text-lg mb-2">⚖️ PTEE & Anticorrupción</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Programas de Ética Empresarial, políticas contra el soborno transnacional, matriz de riesgo C/ST y canales éticos de denuncia.
                  </p>
                </div>
                <div className="p-5 border rounded-xl bg-slate-50 border-slate-200">
                  <h3 className="font-bold text-blue-900 text-lg mb-2">🏛️ Gobierno Corporativo</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Códigos de conducta, gestión de conflictos de interés y asesoría especializada para Juntas Directivas y Oficiales de Cumplimiento.
                  </p>
                </div>
                <div className="p-5 border rounded-xl bg-slate-50 border-slate-200">
                  <h3 className="font-bold text-blue-900 text-lg mb-2">📋 Auditoría & Defensa</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Revisiones independientes, acompañamiento especializado ante visitas de inspección de entes de control y planes de mejoramiento.
                  </p>
                </div>
                <div className="p-5 border rounded-xl bg-slate-50 border-slate-200">
                  <h3 className="font-bold text-blue-900 text-lg mb-2">🔒 Habeas Data & Ley 1581</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Manuales de tratamiento de datos, Registro Nacional de Bases de Datos (RNBD) ante la SIC y protocolos de seguridad de la información.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: METODOLOGÍA */}
          {activeTab === "metodologia" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Ruta Estratégica de Implementación</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-xl bg-slate-50 text-center">
                  <span className="text-2xl font-black text-blue-600">01</span>
                  <h3 className="font-bold text-sm mt-2">Diagnóstico & Gap Analysis</h3>
                  <p className="text-xs text-slate-500 mt-1">Evaluación de madurez y exposición real a riesgos normativos.</p>
                </div>
                <div className="p-4 border rounded-xl bg-slate-50 text-center">
                  <span className="text-2xl font-black text-blue-600">02</span>
                  <h3 className="font-bold text-sm mt-2">Diseño a la Medida</h3>
                  <p className="text-xs text-slate-500 mt-1">Manuales, matrices de riesgo y políticas sin formatos genéricos.</p>
                </div>
                <div className="p-4 border rounded-xl bg-slate-50 text-center">
                  <span className="text-2xl font-black text-blue-600">03</span>
                  <h3 className="font-bold text-sm mt-2">Despliegue & Formación</h3>
                  <p className="text-xs text-slate-500 mt-1">Capacitación in-company y formalización de canales éticos.</p>
                </div>
                <div className="p-4 border rounded-xl bg-slate-50 text-center">
                  <span className="text-2xl font-black text-blue-600">04</span>
                  <h3 className="font-bold text-sm mt-2">Auditoría & Monitoreo</h3>
                  <p className="text-xs text-slate-500 mt-1">Seguimiento continuo y soporte experto ante entes de control.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEMO SCORING */}
          {activeTab === "scoring" && (
            <div className="grid md:grid-cols-2 gap-8">
              <form onSubmit={handleScoring} className="space-y-4">
                <h3 className="font-bold text-lg text-slate-900">Evaluación Transaccional en Tiempo Real</h3>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Monto Operación (USD)</label>
                  <input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">País Origen / Destino</label>
                  <select
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="Colombia">Colombia</option>
                    <option value="Panamá">Panamá</option>
                    <option value="Islas Caimán">Islas Caimán</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input type="checkbox" checked={esPep} onChange={(e) => setEsPep(e.target.checked)} />
                  <span className="text-xs text-slate-700">¿Contraparte es Persona Expuesta Políticamente (PEP)?</span>
                </label>
                <button
                  type="submit"
                  disabled={loadingScoring}
                  className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  {loadingScoring ? "Evaluando con API..." : "🚀 Ejecutar Scoring Transaccional"}
                </button>
              </form>

              <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-300 mb-4">Resultado FastAPI (Railway)</h3>
                  {scoringResult ? (
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Score de Riesgo:</span>
                        <span className="font-bold text-blue-400">{scoringResult.score} / 100</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span>Dictamen Automático:</span>
                        <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                          scoringResult.dictamen === "BLOQUEADA" ? "bg-red-900 text-red-200" : "bg-green-900 text-green-200"
                        }`}>
                          {scoringResult.dictamen}
                        </span>
                      </div>
                      <pre className="bg-slate-950 text-green-400 p-3 rounded text-xs overflow-x-auto border border-slate-800 mt-2">
                        {JSON.stringify(scoringResult.log_auditoria, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">Presione 'Ejecutar Scoring' para enviar la solicitud al servidor backend.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DEMO KYB */}
          {activeTab === "kyb" && (
            <div className="grid md:grid-cols-2 gap-8">
              <form onSubmit={handleKyb} className="space-y-4">
                <h3 className="font-bold text-lg text-slate-900">Auditoría Corporativa & UBO</h3>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">NIT / Identificación Fiscal</label>
                  <input type="text" value={nit} onChange={(e) => setNit(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Razón Social</label>
                  <input type="text" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <button type="submit" disabled={loadingKyb} className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition text-sm">
                  {loadingKyb ? "Consultando..." : "🔍 Auditar Empresa (RUB/KYB)"}
                </button>
              </form>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm">
                <h3 className="font-bold text-slate-900 mb-3">Estructura de Beneficiarios Finales</h3>
                {kybResult ? (
                  <div className="space-y-3">
                    <p><strong>Empresa:</strong> {kybResult.razon_social}</p>
                    <p><strong>Estado RUT:</strong> {kybResult.estado_documental.rut_estado}</p>
                    <div className="border-t pt-2">
                      <p className="font-semibold mb-2">Desglose de Beneficiarios (UBO):</p>
                      <ul className="space-y-1 text-xs">
                        {kybResult.beneficiarios_finales.map((item, idx) => (
                          <li key={idx} className="bg-white p-2 rounded border flex justify-between">
                            <span>{item.nombre}</span>
                            <span className="font-bold text-blue-600">{item.porcentaje}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Ejecute la consulta para visualizar el mapa societario.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: CALCULADORA ROI */}
          {activeTab === "roi" && (
            <div className="grid md:grid-cols-2 gap-8">
              <form onSubmit={handleRoi} className="space-y-4">
                <h3 className="font-bold text-lg text-slate-900">Estimación de Eficiencia Operativa</h3>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Transacciones Procesadas / Mes</label>
                  <input type="number" value={txMes} onChange={(e) => setTxMes(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">% Revisión Manual Actual</label>
                  <input type="number" value={pctManual} onChange={(e) => setPctManual(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Costo Hora Analista ($ USD)</label>
                  <input type="number" value={costoHora} onChange={(e) => setCostoHora(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition text-sm">
                  📊 Calcular Ahorro
                </button>
              </form>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-center text-center">
                {roiResult ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Ahorro Mensual Estimado</p>
                      <p className="text-3xl font-black text-green-600">${roiResult.ahorro_estimado_mensual} USD</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Horas Liberadas al Mes</p>
                      <p className="text-2xl font-bold text-blue-600">{roiResult.horas_ahorradas_mes} Horas</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Ingrese los datos operativos para calcular el ahorro.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: CONTACTO DIRECTO */}
          {activeTab === "contacto" && (
            <div className="max-w-xl mx-auto">
              <form onSubmit={handleContacto} className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="font-bold text-xl text-slate-900">Agendar Diagnóstico de Cumplimiento</h3>
                  <p className="text-xs text-slate-500 mt-1">Consulte con nuestros especialistas para evaluar el grado de madurez de su empresa.</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Nombre Completo *</label>
                  <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Empresa *</label>
                  <input type="text" required value={empresa} onChange={(e) => setEmpresa(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Correo Corporativo *</label>
                  <input type="email" required value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition text-sm">
                  📩 Solicitar Diagnóstico Privado
                </button>
                {contactoResult && <p className="text-xs text-green-600 text-center font-bold mt-2">{contactoResult}</p>}
              </form>
            </div>
          )}
        </section>
      </main>

      {/* Footer Ley y Contacto Directo */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6 border-t border-slate-800 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <p className="text-white font-bold text-sm">ANTEO S.A.S. — NIT 902.098.344-1</p>
            <p className="text-slate-500 mt-0.5">Consultoría Especializada en Cumplimiento Normativo y Gestión de Riesgos (CIIU M7020 / J6201)</p>
          </div>
          <div className="space-y-1">
            <p>📧 <a href="mailto:contacto.anteo.corporate@gmail.com" className="hover:text-white">contacto.anteo.corporate@gmail.com</a></p>
            <p>📱 WhatsApp: <a href="tel:+573015098746" className="hover:text-white">+57 301 509 8746</a></p>
            <p>📍 Pereira, Risaralda - Colombia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}