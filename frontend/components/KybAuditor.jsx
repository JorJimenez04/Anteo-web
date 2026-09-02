"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

export function KybAuditor() {
  const [form, setForm] = useState({
    nit: "901.345.892-1",
    razon_social: "Inversiones Financieras del Caribe S.A.S.",
  });
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setCargando(true);
    setError(null);
    try {
      const data = await api.validarEmpresa(form);
      setResultado(data);
    } catch (err) {
      setError(err.message);
      setResultado(null);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Consultar Empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="nit">Ingresar NIT / Tax ID Corporativo</Label>
              <Input
                id="nit"
                value={form.nit}
                onChange={(e) => setForm((f) => ({ ...f, nit: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="razon_social">Nombre de la Empresa</Label>
              <Input
                id="razon_social"
                value={form.razon_social}
                onChange={(e) => setForm((f) => ({ ...f, razon_social: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" disabled={cargando}>
              {cargando ? "Consultando registros..." : "🔍 Auditar Estructura Societaria"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estructura Societaria & UBO</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>
          )}

          {!resultado && !error && (
            <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              Ingrese el NIT y la razón social para consultar la estructura societaria y los beneficiarios
              finales.
            </p>
          )}

          {resultado && (
            <div className="space-y-4">
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
                {resultado.estado_verificacion} para {resultado.empresa}
              </p>

              <ul className="space-y-2 text-sm text-slate-700">
                {resultado.estructura_societaria.map((persona) => (
                  <li key={persona.nombre} className="rounded-lg border border-slate-200 p-3">
                    <p className="font-semibold text-slate-900">
                      {persona.rol} ({persona.porcentaje_participacion}%): {persona.nombre}
                    </p>
                    <p className="text-slate-600">➔ {persona.verificacion_ofac_pep}</p>
                  </li>
                ))}
              </ul>

              <div>
                <h4 className="mb-2 font-bold text-slate-900">Estado Documental:</h4>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>
                    ✅ Certificado Cámara de Comercio: {resultado.estado_documental.certificado_camara_comercio}
                  </li>
                  <li>✅ RUT / Estado Tributario: {resultado.estado_documental.rut_estado_tributario}</li>
                  <li>
                    ✅ {resultado.estado_documental.listas_restrictivas}:{" "}
                    {resultado.estado_documental.alertas_registradas} Alertas Registradas
                  </li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
