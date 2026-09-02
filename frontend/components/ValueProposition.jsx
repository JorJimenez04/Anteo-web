const SERVICES = [
  {
    icon: "⚙️",
    title: "Motor de Monitoreo Transaccional en Tiempo Real",
    description:
      "Auditoría inteligente de operaciones masivas. Evaluación automática de scoring de riesgo basada en reglas dinámicas, comportamientos históricos y detección de patrones anómalos de lavado de activos (LA/FT).",
  },
  {
    icon: "🔍",
    title: "Debida Diligencia & Onboarding Corporativo (KYB/UBO)",
    description:
      "Automatización en el levantamiento de estructuras societarias complejas, identificación de Beneficiarios Finales (UBO), y cruzamiento instantáneo con listas de sanciones globales (OFAC, ONU, PEPs).",
  },
  {
    icon: "📜",
    title: "Automatización SARLAFT / SAGRILAFT / PTEE",
    description:
      "Generación simplificada de expedientes auditables y estructuración inmutable para soporte ante entes supervisores (Superfinanciera, Supersociedades, UIAF).",
  },
  {
    icon: "🔌",
    title: "Microservicios e Integración por APIs",
    description:
      "Despliegue modular e integración nativa con el core de su plataforma digital sin interrumpir la operación actual ni ralentizar las transferencias.",
  },
];

export function ValueProposition() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900">
          Blindaje Operativo y Regtech para Entidades Financieras y Fintechs
        </h3>
        <p className="mt-2 text-slate-600">
          En <b>Anteo</b> ayudamos a instituciones financieras, pasarelas de pago y neobancos a escalar sus
          operaciones reduciendo el riesgo normativo y el fraude.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="rounded-xl border border-l-4 border-slate-200 border-l-blue-600 bg-white p-6 shadow-sm"
          >
            <h4 className="text-lg font-semibold text-slate-900">
              {service.icon} {service.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
