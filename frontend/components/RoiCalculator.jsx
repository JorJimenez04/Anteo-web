"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { api } from "@/lib/api";

export function RoiCalculator() {
  const [txMes, setTxMes] = useState(50000);
  const [porcentajeRevision, setPorcentajeRevision] = useState(5);
  const [costoAnalista, setCostoAnalista] = useState(25);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      api
        .calcularRoi({
          tx_mes: txMes,
          porcentaje_revision: porcentajeRevision,
          costo_analista: costoAnalista,
        })
        .then((data) => {
          setResultado(data);
          setError(null);
        })
        .catch((err) => setError(err.message));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [txMes, porcentajeRevision, costoAnalista]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Parámetros Operativos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tx_mes">Transacciones Mensuales Procesadas</Label>
            <Input
              id="tx_mes"
              type="number"
              min={1000}
              max={1000000}
              step={5000}
              value={txMes}
              onChange={(e) => setTxMes(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>% Transacciones Revisadas Manualmente Hoy</Label>
              <span className="text-sm font-semibold text-blue-600">{porcentajeRevision.toFixed(1)}%</span>
            </div>
            <Slider
              min={1}
              max={20}
              step={0.5}
              value={[porcentajeRevision]}
              onValueChange={([value]) => setPorcentajeRevision(value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="costo_analista">Costo Promedio Hora Analista Riesgo ($ USD)</Label>
            <Input
              id="costo_analista"
              type="number"
              min={10}
              max={100}
              value={costoAnalista}
              onChange={(e) => setCostoAnalista(Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resultado Estimado de Ahorro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>
          )}

          {resultado && (
            <>
              <div className="rounded-xl border border-slate-200 p-5 text-center">
                <div className="text-3xl font-extrabold text-blue-600">
                  ${resultado.ahorro_estimado_mes.toLocaleString("en-US")} USD
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Ahorro Estimado Mensual
                </div>
                <div className="mt-1 text-xs font-semibold text-emerald-600">
                  -{resultado.reduccion_costo_porcentual}% Costo Operativo
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-5 text-center">
                <div className="text-3xl font-extrabold text-blue-600">
                  {resultado.horas_ahorradas_mes.toLocaleString("en-US")} Horas
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Horas de Análisis Manual Ahorradas / mes
                </div>
              </div>

              <p className="text-xs text-slate-500">
                *Estimación basada en una reducción del 75% en falsos positivos mediante el motor de reglas en
                tiempo real de Anteo.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
