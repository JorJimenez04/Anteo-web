const METRICS = [
  { value: "< 180ms", label: "Latencia de Respuesta API" },
  { value: "-75%", label: "Reducción Falsos Positivos" },
  { value: "100%", label: "Trazabilidad Auditable" },
  { value: "0%", label: "Fricción en Onboarding" },
];

export function MetricsBanner() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {METRICS.map((metric) => (
        <div key={metric.label} className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <div className="text-3xl font-extrabold text-blue-600">{metric.value}</div>
          <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
