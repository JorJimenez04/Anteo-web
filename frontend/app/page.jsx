"use client";

import { useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://anteo-web-production.up.railway.app";

// Logotipo vectorial exacto al brochure (A estilizada + Flecha verde + ANTEO CORPORATE)
function AnteoBrochureLogo({ className = "w-[#100px] h-auto" }) {
  return (
    <div className="bg-white p-3 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center justify-center w-28 h-28 shrink-0">
      <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-14">
        {/* Letra A oscura */}
        <path d="M50 8L22 65H34L40 50H60L66 65H78L50 8ZM44 40L50 25L56 40H44Z" fill="#2C3A3B" />
        {/* Flecha curva verde */}
        <path d="M20 52C28 30 55 20 72 24" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
        <path d="M68 18L76 24L68 30" fill="#10B981" stroke="#10B981" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <div className="text-center mt-1 leading-none">
        <span className="block font-black text-[#1A2526] text-[11px] tracking-wider">ANTEO</span>
        <span className="block font-medium text-[#718096] text-[7px] tracking-widest uppercase">CORPORATE</span>
      </div>
    </div>
  );
}

const PROBLEMAS_SOLUCIONES = [
  {
    dolor: "Sanciones y Multas",
    icono: "⚠️",
    solucion: "Automatización de matrices de riesgo y debida diligencia alineada a SuperFinanciera/SuperSociedades.",
  },
  {
    dolor: "Fricción en Onboarding",
    icono: "🧩",
    solucion: "Validación KYB/UBO y screening en listas restrictivas en segundos.",
  },
  {
    dolor: "Falsos Positivos",
    icono: "🎯",
    solucion: "Monitoreo transaccional inteligente con latencia menor a 180ms.",
  },
];

const SOLUCIONES = [
  { titulo: "SARLAFT / SAGRILAFT", icono: "🛡️", desc: "Matrices de riesgo LA/FT/FPADM parametrizadas y calibradas frente a entes de control." },
  { titulo: "KYB / UBO", icono: "🔍", desc: "Identificación de beneficiarios finales y screening en listas restrictivas (OFAC, ONU, PEPs)." },
  { titulo: "PTEE", icono: "⚖️", desc: "Programas de ética empresarial y políticas contra el soborno transnacional." },
  { titulo: "APIs / Microservicios", icono: "🔗", desc: "Integración vía API a su stack actual, sin fricción operativa ni cambios de infraestructura." },
];

const TABS = [
  { id: "soluciones", label: "Soluciones" },
  { id: "scoring", label: "Demo: Scoring" },
  { id: "kyb", label: "Demo: KYB / UBO" },
  { id: "roi", label: "Calculadora ROI" },
  { id: "contacto", label: "Contacto" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("soluciones");
  const sectionRef = useRef(null);

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

  const goToTab = (id) => {
    setActiveTab(id);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
    <div className="min-h-screen bg-[#F4F7F6] text-[#0D1F22] flex flex-col justify-between font-sans">
      <main className="p-6 md:p-12 max-w-6xl mx-auto w-full">

        {/* Hero */}
        <header className="bg-gradient-to-r from-[#041E1E] via-[#083336] to-[#041E1E] text-white p-8 md:p-12 rounded-2xl mb-8 shadow-2xl border border-emerald-900/40">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 max-w-3xl">
              <AnteoBrochureLogo />
              <div className="space-y-4">
                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/30">
                  Compliance RegTech
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  De la exigencia regulatoria a la <span className="text-[#10B981]">ventaja estratégica.</span>
                </h1>
                <p className="text-[#A0AEC0] text-sm md:text-base leading-relaxed max-w-xl">
                  ANTEO automatiza la prevención de riesgos LA/FT, la debida diligencia y el reporte regulatorio, sin frenar su operación.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => goToTab("scoring")}
                    className="bg-[#10B981] text-[#041E1E] font-bold px-6 py-3 rounded-xl text-sm shadow-md hover:bg-[#0ea371] transition"
                  >
                    Probar Simulador en Vivo
                  </button>
                  <button
                    onClick={() => goToTab("contacto")}
                    className="border border-[#10B981]/50 text-[#10B981] font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#10B981]/10 transition"
                  >
                    Agendar Diagnóstico
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#031516] p-4 rounded-xl text-xs border border-emerald-900/60 text-[#A0AEC0] space-y-1.5 self-stretch md:self-auto min-w-[210px] shrink-0">
              <p><strong className="text-white">NIT:</strong> 902.098.344-1</p>
              <p><strong className="text-white">Ubicación:</strong> Pereira, Risaralda</p>
              <p><strong className="text-white">CIIU:</strong> M7020 / J6201</p>
              <p className="text-[#10B981] font-semibold text-[11px] pt-1">ANTEO S.A.S.</p>
            </div>
          </div>
        </header>

        {/* Matriz Problema vs Solución */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {PROBLEMAS_SOLUCIONES.map((item) => (
            <div key={item.dolor} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{item.icono}</span>
                <h3 className="font-bold text-[#0D1F22] text-base">{item.dolor}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.solucion}</p>
            </div>
          ))}
        </div>

        {/* Navegación por Pestañas */}
        <nav className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-[#062C2D] text-[#10B981] shadow-md border border-[#10B981]/40"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Secciones Dinámicas */}
        <section ref={sectionRef} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-12 scroll-mt-6">
          {activeTab === "soluciones" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#0D1F22]">Soluciones</h2>
                <p className="text-slate-600 text-sm mt-1">Estructuración técnica y legal alineada a estándares locales e internacionales.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {SOLUCIONES.map((s) => (
                  <div key={s.titulo} className="p-5 border-l-4 border-l-[#10B981] border-y border-r border-slate-200 rounded-r-xl bg-[#F7FAFC]">
                    <h3 className="font-bold text-[#0D1F22] text-lg mb-1.5">{s.icono} {s.titulo}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "scoring" && (
            <div className="grid md:grid-cols-2 gap-8">
              <form onSubmit={handleScoring} className="space-y-4">
                <h3 className="font-bold text-lg text-[#0D1F22]">Evaluación Transaccional en Tiempo Real</h3>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Monto Operación (USD)</label>
                  <input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#10B981]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">País Origen / Destino</label>
                  <select
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white outline-none focus:border-[#10B981]"
                  >
                    <option value="Colombia">Colombia</option>
                    <option value="Panamá">Panamá</option>
                    <option value="Islas Caimán">Islas Caimán</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input type="checkbox" checked={esPep} onChange={(e) => setEsPep(e.target.checked)} className="rounded text-[#10B981]" />
                  <span className="text-xs text-slate-700">¿Contraparte es Persona Expuesta Políticamente (PEP)?</span>
                </label>
                <button
                  type="submit"
                  disabled={loadingScoring}
                  className="w-full bg-[#062C2D] text-[#10B981] font-bold py-3 rounded-xl hover:bg-[#031516] transition text-sm shadow-md border border-[#10B981]/30"
                >
                  {loadingScoring ? "Evaluando con API..." : "Ejecutar Scoring Transaccional"}
                </button>
              </form>

              <div className="bg-[#041E1E] text-white p-6 rounded-2xl border border-emerald-900/60 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#A0AEC0] mb-4">Resultado FastAPI (Railway)</h3>
                  {scoringResult ? (
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-emerald-900/60 pb-2">
                        <span>Score de Riesgo:</span>
                        <span className="font-bold text-[#10B981]">{scoringResult.score} / 100</span>
                      </div>
                      <div className="flex justify-between border-b border-emerald-900/60 pb-2">
                        <span>Dictamen Automático:</span>
                        <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                          scoringResult.dictamen === "BLOQUEADA" ? "bg-red-950 text-red-400 border border-red-800" : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        }`}>
                          {scoringResult.dictamen}
                        </span>
                      </div>
                      <pre className="bg-[#020D0E] text-[#10B981] p-3 rounded-xl text-xs overflow-x-auto border border-emerald-900/60 mt-2">
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

          {activeTab === "kyb" && (
            <div className="grid md:grid-cols-2 gap-8">
              <form onSubmit={handleKyb} className="space-y-4">
                <h3 className="font-bold text-lg text-[#0D1F22]">Auditoría Corporativa & UBO</h3>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">NIT / Identificación Fiscal</label>
                  <input type="text" value={nit} onChange={(e) => setNit(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Razón Social</label>
                  <input type="text" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm" />
                </div>
                <button type="submit" disabled={loadingKyb} className="w-full bg-[#062C2D] text-[#10B981] font-bold py-3 rounded-xl hover:bg-[#031516] transition text-sm shadow-md border border-[#10B981]/30">
                  {loadingKyb ? "Consultando..." : "Auditar Empresa (RUB/KYB)"}
                </button>
              </form>

              <div className="bg-[#F7FAFC] p-6 rounded-2xl border border-slate-200 text-sm">
                <h3 className="font-bold text-[#0D1F22] mb-3">Estructura de Beneficiarios Finales</h3>
                {kybResult ? (
                  <div className="space-y-3">
                    <p><strong>Empresa:</strong> {kybResult.razon_social}</p>
                    <p><strong>Estado RUT:</strong> {kybResult.estado_documental.rut_estado}</p>
                    <div className="border-t border-slate-200 pt-2">
                      <p className="font-semibold mb-2 text-xs text-slate-600">Desglose de Beneficiarios (UBO):</p>
                      <ul className="space-y-1.5 text-xs">
                        {kybResult.beneficiarios_finales.map((item, idx) => (
                          <li key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 flex justify-between shadow-sm">
                            <span className="font-medium text-[#0D1F22]">{item.nombre}</span>
                            <span className="font-bold text-[#10B981]">{item.porcentaje}%</span>
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

          {activeTab === "roi" && (
            <div className="grid md:grid-cols-2 gap-8">
              <form onSubmit={handleRoi} className="space-y-4">
                <h3 className="font-bold text-lg text-[#0D1F22]">Estimación de Eficiencia Operativa</h3>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Transacciones Procesadas / Mes</label>
                  <input type="number" value={txMes} onChange={(e) => setTxMes(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">% Revisión Manual Actual</label>
                  <input type="number" value={pctManual} onChange={(e) => setPctManual(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Costo Hora Analista ($ USD)</label>
                  <input type="number" value={costoHora} onChange={(e) => setCostoHora(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm" />
                </div>
                <button type="submit" className="w-full bg-[#062C2D] text-[#10B981] font-bold py-3 rounded-xl hover:bg-[#031516] transition text-sm shadow-md border border-[#10B981]/30">
                  Calcular Ahorro
                </button>
              </form>

              <div className="bg-[#F7FAFC] p-6 rounded-2xl border border-slate-200 flex flex-col justify-center text-center">
                {roiResult ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Ahorro Mensual Estimado</p>
                      <p className="text-4xl font-black text-emerald-600 mt-1">${roiResult.ahorro_estimado_mensual} USD</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Horas Liberadas al Mes</p>
                      <p className="text-2xl font-bold text-[#10B981]">{roiResult.horas_ahorradas_mes} Horas</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Ingrese los datos operativos para calcular el ahorro.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "contacto" && (
            <div className="max-w-xl mx-auto">
              <form onSubmit={handleContacto} className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="font-bold text-xl text-[#0D1F22]">Agendar Diagnóstico de Cumplimiento</h3>
                  <p className="text-xs text-slate-500 mt-1">Consulte con nuestros especialistas para evaluar el grado de madurez de su empresa.</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Nombre Completo *</label>
                  <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Empresa *</label>
                  <input type="text" required value={empresa} onChange={(e) => setEmpresa(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600">Correo Corporativo *</label>
                  <input type="email" required value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm" />
                </div>
                <button type="submit" className="w-full bg-[#062C2D] text-[#10B981] font-bold py-3 rounded-xl hover:bg-[#031516] transition text-sm shadow-md border border-[#10B981]/30">
                  Solicitar Diagnóstico Privado
                </button>
                {contactoResult && <p className="text-xs text-emerald-600 text-center font-bold mt-2">{contactoResult}</p>}
              </form>
            </div>
          )}
        </section>
      </main>

      {/* Footer Corporativo Mínimo */}
      <footer className="bg-[#041E1E] text-[#A0AEC0] py-8 px-6 border-t border-emerald-900/40 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <AnteoBrochureLogo />
            <div>
              <p className="text-white font-bold text-sm">ANTEO S.A.S. — NIT 902.098.344-1</p>
              <p className="text-slate-400 mt-0.5">CIIU M7020 / J6201 · Pereira, Risaralda - Colombia</p>
            </div>
          </div>
          <div className="space-y-1">
            <p>📧 <a href="mailto:contacto.anteo.corporate@gmail.com" className="hover:text-white">contacto.anteo.corporate@gmail.com</a></p>
            <p>📱 WhatsApp: <a href="tel:+573015098746" className="hover:text-white">+57 301 509 8746</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
