"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api";

const TIPOS_OPERACION = [
  "Giro Internacional",
  "Transferencia ACH Nacional",
  "Recaudo Digital Masivo",
  "Operación OTC / Cripto",
];

const PAISES = ["Colombia", "Panamá", "Estados Unidos", "Islas Caimán", "México", "Suiza"];

const ALERTA_STYLES = {
  "ALERTA ROJA": { badge: "destructive", panel: "border-red-200 bg-red-50 text-red-800" },
  "ALERTA AMARILLA": { badge: "warning", panel: "border-amber-200 bg-amber-50 text-amber-800" },
  "ALERTA VERDE": { badge: "success", panel: "border-emerald-200 bg-emerald-50 text-emerald-800" },
};

export function TransactionSimulator() {
  const [form, setForm] = useState({
    monto: 25000,
    tipo_operacion: TIPOS_OPERACION[0],
    pais: PAISES[0],
    es_pep: false,
    frecuencia_anormal: false,
  });
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarLog, setMostrarLog] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setCargando(true);
    setError(null);
    try {
      const data = await api.evaluarTransaccion(form);
      setResultado(data);
    } catch (err) {
      setError(err.message);
      setResultado(null);
    } finally {
      setCargando(false);
    }
  }

  const estilos = resultado ? ALERTA_STYLES[resultado.nivel_alerta] : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <Card>
        <CardHeader>
          <CardTitle>1. Parámetros de la Transacción</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="monto">Monto de la Operación ($ USD)</Label>
              <Input
                id="monto"
                type="number"
                min={500}
                max={1000000}
                step={2500}
                value={form.monto}
                onChange={(e) => setForm((f) => ({ ...f, monto: Number(e.target.value) }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo de Operación</Label>
              <Select
                value={form.tipo_operacion}
                onValueChange={(value) => setForm((f) => ({ ...f, tipo_operacion: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIPOS_OPERACION.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>País Origen / Destino</Label>
              <Select value={form.pais} onValueChange={(value) => setForm((f) => ({ ...f, pais: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAISES.map((pais) => (
                    <SelectItem key={pais} value={pais}>
                      {pais}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="es_pep"
                checked={form.es_pep}
                onCheckedChange={(checked) => setForm((f) => ({ ...f, es_pep: Boolean(checked) }))}
              />
              <Label htmlFor="es_pep" className="font-normal">
                ¿Cliente es Persona Expuesta Políticamente (PEP)?
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="frecuencia_anormal"
                checked={form.frecuencia_anormal}
                onCheckedChange={(checked) =>
                  setForm((f) => ({ ...f, frecuencia_anormal: Boolean(checked) }))
                }
              />
              <Label htmlFor="frecuencia_anormal" className="font-normal">
                ¿Supera la frecuencia transaccional habitual?
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={cargando}>
              {cargando ? "Procesando matriz de reglas..." : "🚀 Ejecutar Scoring Transaccional"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Resultado de la Evaluación en Tiempo Real</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>
          )}

          {!resultado && !error && (
            <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              Ajuste los parámetros en el panel izquierdo y presione &quot;Ejecutar Scoring&quot; para ver el
              motor en acción.
            </p>
          )}

          {resultado && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Scoring Global de Riesgo
                </span>
                <span className="text-2xl font-extrabold text-blue-600">{resultado.score_riesgo} / 100</span>
              </div>

              <div className={`rounded-lg border p-4 ${estilos.panel}`}>
                <Badge variant={estilos.badge}>{resultado.nivel_alerta}</Badge>
                <p className="mt-2 font-semibold">ESTADO: {resultado.dictamen}</p>
                <p className="mt-1 text-sm">
                  <b>Acción Sugerida:</b> {resultado.accion_sugerida}
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-bold text-slate-900">Reglas Auditables Activadas:</h4>
                {resultado.reglas_activadas.length === 0 ? (
                  <p className="text-sm text-slate-500">Ninguna regla de riesgo fue activada.</p>
                ) : (
                  <ul className="space-y-1 text-sm text-slate-700">
                    {resultado.reglas_activadas.map((regla) => (
                      <li key={regla}>🔸 {regla}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <button
                  type="button"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                  onClick={() => setMostrarLog((v) => !v)}
                >
                  {mostrarLog ? "▼" : "▶"} Ver Log Inmutable de Auditoría (JSON)
                </button>
                {mostrarLog && (
                  <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
                    {JSON.stringify(resultado.log_auditoria, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
